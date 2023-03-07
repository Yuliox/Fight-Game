const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const settings = document.getElementById('settings')

canvas.width = 1333
canvas.height = 560

c.fillRect(0, 0 , canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: 'FightZoneSprite.png',
    framesMax: 3
})

const player = new Character(medievalRed)
const enemy = new Character(medievalBlue)
player.position.x = 0
enemy.position.x = 1333

console.log(medievalBlue)

console.log(player)
const keys = {
    a:{ pressed: false},
    d:{ pressed: false},
    f:{ pressed: false},
    ArrowLeft:{ pressed: false},
    ArrowRight:{ pressed: false},
    zero: { pressed: false}
}

function animate() {
    window.requestAnimationFrame(animate)
    document.querySelector('#playerHealth').style.backgroundColor = player.color
    document.querySelector('#enemyHealth').style.backgroundColor = enemy.color
    //background.update()
    c.clearRect(0 ,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    //Player Movement & attack
    player.velocity.x = 0;
    player.switchSprite('idle')
    enemy.switchSprite('idle')
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.attackBox.offset.x = -50
        player.attackDirecton = 'Left'
        if(player.position.y + player.height + player.velocity.y >= canvas.height - 10){
            player.switchSprite('runLeft')
        }else{player.switchSprite('jumpingLeft')}
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.attackBox.offset.x = 0
        player.attackDirecton = 'Right'
        if(player.position.y + player.height + player.velocity.y >= canvas.height - 10){
            player.switchSprite('runRight')
        }else{player.switchSprite('jumpingRight')}
    }
    if(keys.f.pressed && player.attackDirecton === 'Left'){
        player.switchSprite('attackingLeft')
    }
    else if(keys.f.pressed && player.attackDirecton === 'Right'){
        player.switchSprite('attackingRight')
    }
    if(keys.f.pressed){ swordAttack.play() }
    //Enemy Movement & attack
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.attackBox.offset.x = -50
        enemy.attackDirecton = 'Left'
        if(enemy.position.y + enemy.height + enemy.velocity.y >= canvas.height - 10){
            enemy.switchSprite('runLeft')
        }else{enemy.switchSprite('jumpingLeft')}
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.attackBox.offset.x = 0
        enemy.attackDirecton = 'Right'
        if(enemy.position.y + enemy.height + enemy.velocity.y >= canvas.height - 10){
            enemy.switchSprite('runRight')
        }else{enemy.switchSprite('jumpingRight')}
    }
    if(keys.zero.pressed && enemy.attackDirecton === 'Left'){
        enemy.switchSprite('attackingLeft')
    }
    else if(keys.zero.pressed && enemy.attackDirecton === 'Right'){
        enemy.switchSprite('attackingRight')
    }
    if(keys.zero.pressed){ swordAttack.play() }
    //collision
    if(collision({ rectangle1: player, rectangle2: enemy}) && player.isAttacking){
        if(player.lastKey === 'a'){
            enemy.velocity.x = -knockback

        }
        else if(player.lastKey === 'd'){
            enemy.velocity.x = knockback
        }
        if(enemy.position.y + enemy.height <= canvas.height/2){
            enemy.velocity.y = knockback
        }else{ enemy.velocity.y = -knockback }
        enemy.switchSprite('takeHit')
        enemy.health -= player.damage
        enemyHit.play()
        document.querySelector('#enemyHealth').style.width = enemy.health + "%"
        console.log('player attacks!')
        swordClash.play()
    }
    if(collision({ rectangle1: enemy, rectangle2: player}) && enemy.isAttacking){
        if(enemy.lastKey === 'ArrowLeft'){
            player.velocity.x = -knockback
        }
        else if(enemy.lastKey === 'ArrowRight'){
            player.velocity.x = knockback
        }
        if(player.position.y + player.height <= canvas.height/2){
            player.velocity.y = knockback
        }else{ player.velocity.y = -knockback }
        player.switchSprite('takeHit')
        player.health -= enemy.damage
        playerHit.play()
        document.querySelector('#playerHealth').style.width = player.health + "%"
        console.log('enemy attacks!')
        swordClash.play()
    }
    //Death Player or Enemy
    if(enemy.health <= 0 || player.health <=0){
        document.querySelector('#timer').innerHTML = "K.O.";
        winner({player, enemy, timerID});
        if(enemy.health <= 0){
            enemy.framesHold = 10
            enemy.switchSprite('death')
        }
        else if(player.health <= 0){
            player.framesHold = 10
            player.switchSprite('death')
        }
    }
    //IA
    if(enemyIA && !enemy.death && !gameOver){
        enemy.damage = player.damage*2
        function movesLeft(){
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        }
        function movesRight(){
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        }
        if(player.position.x + player.width <= enemy.position.x){
            movesLeft()
        }
        else if(player.position.x >= enemy.position.x + enemy.width){
            movesRight()
        }
        if(enemy.position.x + enemy.width <= player.position.x ||
        enemy.position.x >= player.position.x + player.width){
            if(player.jumps > 0 || player.isAttacking){
                if (enemy.canjump) {
                    enemy.velocity.y = -15;
                    enemy.jumps += 1;
                    if(enemy.jumps >= 2){enemy.canjump = false}
                    }
            }
                if(collision({ rectangle1: enemy, rectangle2: player})){
                    keys.zero.pressed = true
                    enemy.attack()
                    if(enemy.isAttacking){
                        enemy.attack()
                        keys.ArrowLeft.pressed = false
                        keys.ArrowRight.pressed = false
                        setTimeout(()=>{
                            if(enemy.lastKey == 'ArrowLeft'){ keys.ArrowLeft.pressed = true}
                            else if(enemy.lastKey == 'ArrowRight'){ keys.ArrowRight.pressed = true}}, 100)
                    }
                }
            }else if((!collision({ rectangle1: enemy, rectangle2: player}))){
                if(enemy.lastKey == 'ArrowLeft'){ keys.ArrowLeft.pressed = true}
                else if(enemy.lastKey == 'ArrowRight'){ keys.ArrowRight.pressed = true}
            }
            else{ 
                keys.zero.pressed = false 
            }
        if(enemy.position.x <= 0){
            movesRight()
        }
        if(enemy.position.x >= canvas.width){
            movesLeft()
        }
        if(collision({ rectangle1: player, rectangle2: enemy}) && player.isAttacking){
            if(player.lastKey == 'a'){ movesRight()}
            else if(player.lastKey == 'd'){ movesLeft()}
            if (enemy.canjump) {
                enemy.velocity.y = -15;
                enemy.jumps += 1;
                if(enemy.jumps >= 2){enemy.canjump = false}
                }
        }
    }else if(enemyIA && (!gameOver || !enemy.death)){
        keys.ArrowLeft.pressed = false
        keys.ArrowRight.pressed = false
    }
}

animate()
//Player 1
window.addEventListener('keydown', (event) =>{
    if(!player.death && !gameOver){
        switch(event.key){
            case 'd':{
                keys.d.pressed = true;
                player.lastKey = 'd'
            break
            }
            case 'a':{
                keys.a.pressed = true;
                player.lastKey = 'a'
            break
            }
            case 'w':{
                if (player.canjump) {
                player.velocity.y = -15;
                player.jumps += 1;
                if(player.jumps >= 2){player.canjump = false}
                }
            break
            }
            case 'f':{
                player.attack();
                keys.f.pressed = true;
            break
            }
        }
    }
})
//Enemy // Player 2
window.addEventListener('keydown', (event) =>{
    if(!enemy.death && !gameOver && !enemyIA){
        switch(event.key){
            case 'ArrowRight':{
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight'
            break
            }
            case 'ArrowLeft':{
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft'
            break
            }
            case 'ArrowUp':{
                if (enemy.canjump) {
                enemy.velocity.y = -15;
                enemy.jumps += 1;
                if(enemy.jumps >= 2){enemy.canjump = false}
                }
            break
            }
            case '0':{
                enemy.attack();
                keys.zero.pressed = true;
            }
        }
    }
})

window.addEventListener('keyup', (event) =>{
    switch(event.key){
        //Player 1
        case 'd':{
            keys.d.pressed = false;
        break
        }
        case 'a':{
            keys.a.pressed = false;
        break
        }
        case 'f':{
            keys.f.pressed = false;
        }
        //Enemy // Player 2
        case 'ArrowRight':{
            keys.ArrowRight.pressed = false;
        break
        }
        case 'ArrowLeft':{
            keys.ArrowLeft.pressed = false;
        break
        }
        case '0':{
            keys.zero.pressed = false;
        }
    }
})
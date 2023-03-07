let startButton = document.querySelector("#startButton")
let timerId
let timeBegin = 4
let gameOver = true
let timer = 60
let enemyIA = false
let knockback = 10
let swordAttack = new Audio('./Sounds/swordAttack.mp3')
let swordClash = new Audio('./Sounds/swordClash.mp3')
let playerDeath = new Audio('./Sounds/swordDeath1.mp3')
let enemyDeath = new Audio('./Sounds/swordDeath2.mp3')
let playerHit = new Audio('./Sounds/hitsound1.mp3')
let enemyHit = new Audio('./Sounds/hitsound2.mp3')
var checkIA = document.querySelector('#checkIA')

startButton.addEventListener('click', ()=>{
    startGame()
    document.querySelector('#settings').style.scale = 0
})

function startGame(){
    document.querySelector('#lifeInterface').style.scale = 1
    decreaseTimer()
    let playerName = document.querySelector("#pOne")
    let enemyName = document.querySelector("#pTwo")
    if(playerName.value == ''){
        player.nameCode = 'Player 1'
    }else{
        player.nameCode = playerName.value
    }
    if(enemyName.value == ''){
        enemy.nameCode = 'Player 2'
    }else{
        enemy.nameCode = enemyName.value
    }
}

function collision({ rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

function winner({player, enemy, timerID}){
    clearTimeout(timerID)
    gameOver = true
    if(player.health === enemy.health){
        document.querySelector('#results').innerHTML = "Tie";
    }
    else if(player.health > enemy.health){
        document.querySelector('#results').innerHTML = player.nameCode + " Wins!";
    }
    else if(player.health < enemy.health){
        document.querySelector('#results').innerHTML = enemy.nameCode + " Wins!";
    }
}

function decreaseTimer(){
    if(timeBegin + timer >= 0){
        timerID = setTimeout(decreaseTimer, 1000);
        document.querySelector('#results').innerHTML = timeBegin - 1
        timeBegin--
    }
    if(timeBegin == 0){
        document.querySelector('#timer').innerHTML = 'GO!'
        document.querySelector('#results').innerHTML = 'GO!'
        gameOver = false
    }
    if(timeBegin < 0){
        document.querySelector('#results').innerHTML = ' '
        if(timer >= 0){
            document.querySelector('#timer').innerHTML = timer;
            timer--
        }
        if(timer<0){
            winner({player, enemy, timerID});
        }
    }
}


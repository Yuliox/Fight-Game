const medievalRed = {
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 150,
        y: 110
    },
    attackBox: {
        offset: {
          x: 0,
          y: 0,
        },
        width: 160,
        height: 50
    },
    imageSrc: './sprites/Player/Idle.png',
    framesMax: 8,
    scale: 2.5,
    sprites: {
        idle:{
            imageSrc: './sprites/Player/Idle.png',
            framesMax: 8,
            image: new Image()
        },
        runLeft:{
            imageSrc: './sprites/Player/RunLeft.png',
            framesMax: 8,
            image: new Image()
        },
        runRight:{
            imageSrc: './sprites/Player/Run.png',
            framesMax: 8,
            image: new Image()
        },
        jumpingRight:{
            imageSrc: './sprites/Player/Jump.png',
            framesMax: 2,
            image: new Image()
        },
        jumpingLeft:{
            imageSrc: './sprites/Player/JumpLeft.png',
            framesMax: 2,
            image: new Image()
        },
        attackingRight:{
            imageSrc: './sprites/Player/Attack1.png',
            framesMax: 4,
            image: new Image()
        },attackingLeft:{
            imageSrc: './sprites/Player/Attack1Left.png',
            framesMax: 4,
            image: new Image()
        },
        takeHit:{
            imageSrc: './sprites/Player/Take Hit.png',
            framesMax: 4,
            image: new Image()
        },
        death:{
            imageSrc: './sprites/Player/Death.png',
            framesMax: 6,
            image: new Image()
        }
    },
    color: 'red'
}

const medievalBlue = {
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 150,
        y: 110
    },
    attackBox: {
        offset: {
          x: 0,
          y: 0
        },
        width: 160,
        height: 50
    },
    imageSrc: './sprites/Enemy/Idle.png',
    framesMax: 10,
    scale: 2.8,
    sprites: {
        idle:{
            imageSrc: './sprites/Enemy/Idle.png',
            framesMax: 10,
            image: new Image()
        },
        runLeft:{
            imageSrc: './sprites/Enemy/RunLeft.png',
            framesMax: 6,
            image: new Image()
        },
        runRight:{
            imageSrc: './sprites/Enemy/Run.png',
            framesMax: 6,
            image: new Image()
        },
        jumpingRight:{
            imageSrc: './sprites/Enemy/Jump.png',
            framesMax: 2,
            image: new Image()
        },
        jumpingLeft:{
            imageSrc: './sprites/Enemy/JumpLeft.png',
            framesMax: 2,
            image: new Image()
        },
        attackingRight:{
            imageSrc: './sprites/Enemy/Attack1.png',
            framesMax: 4,
            image: new Image()
        },attackingLeft:{
            imageSrc: './sprites/Enemy/Attack1Left.png',
            framesMax: 4,
            image: new Image()
        },
        takeHit:{
            imageSrc: './sprites/Enemy/Get Hit.png',
            framesMax: 3,
            image: new Image()
        },
        death:{
            imageSrc: './sprites/Enemy/Death.png',
            framesMax: 9,
            image: new Image()
        }
    },
    color: 'blue'
}

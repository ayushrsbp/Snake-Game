// Constants & variables : 
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
];
food = {x:5, y:6};
// Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake) {
    // Bump with itsef
    for(let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // Bump with wall
    if(snake[0].x < 0 || snake[0].x > 18 || snake[0].y < 0 || snake[0].y > 18) {
        return true;
    }
    return false;
}
function gameEngine() {
    
    musicSound.play();

    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        snakeArr[0].x -= inputDir.x;
        snakeArr[0].y -= inputDir.y;
        alert("Game Over. Press any key to play again!");
        inputDir = {x: 0, y: 0};
        snakeArr = [
            {x: 13, y : 15}
        ]
        musicSound.play();
        score = 0;
    }
    // If snake has eaten food, increment the score and regenerate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score++;
        scoreBoard.innerHTML = "Score : "+score;
        // let len = snakeArr.length;
        // snakeArr.push({x:snakeArr[len-1].x-inputDir.x, y:snakeArr[len-1].y-inputDir.y});
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2, b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }
    // Moving the snake
    for(let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    })
    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
// Main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            if(inputDir.y != 1){
                inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            inputDir.x = 0;
            if(inputDir.y != -1){
                inputDir.y = 1;
            }
            break;
    
        case "ArrowLeft":
            if(inputDir.x != 1) {
                inputDir.x = -1;
            }
            inputDir.y = 0;
            break;

        case "ArrowRight":
            if(inputDir.x != -1) {
                inputDir.x = 1;
            }
            inputDir.y = 0;
            break;
        default:
            break;
    }
})
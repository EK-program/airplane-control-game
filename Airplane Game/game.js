window.onload = function() {
    airplane1.style.transform = `translate(${positionX1}px, ${positionY1}px)`;
    airplane2.style.transform = `translate(${positionX2}px, ${positionY2}px)`;

    startButton.addEventListener('click', () => {
        resetGame();
        document.addEventListener('keydown', handleKeyDown);
    });
};


const gameContainer = document.getElementById('game-container');
const airplane1 = document.getElementById('airplane1');
const airplane2 = document.getElementById('airplane2');
const bulletContainer = document.getElementById('bullet-container');
const player1ScoreBoard = document.getElementById('player1-score');
const player2ScoreBoard = document.getElementById('player2-score');
const startButton = document.getElementById('start-button');


const GAME_WIDTH = 1200;
const GAME_HEIGHT = 900;
const SPEED = 10;
const INITIAL_SCORE = 100;
const PLAYER1_INITIAL_X = 100;
const PLAYER1_INITIAL_Y = 300;
const PLAYER2_INITIAL_X = 1100;
const PLAYER2_INITIAL_Y = 300;


const BULLET_COLOR_PLAYER1 = 'red';
const BULLET_COLOR_PLAYER2 = 'blue';


const KEYS = {
    PLAYER1: {
        LEFT: 65,  // A key
        UP: 87,    // W key
        RIGHT: 68, // D key
        DOWN: 83,  // S key
        SHOOT: 49  // 1 key
    },
    PLAYER2: {
        LEFT: 37,  // Left arrow
        UP: 38,    // Up arrow
        RIGHT: 39, // Right arrow
        DOWN: 40,  // Down arrow
        SHOOT: 32  // Space bar
    }
};


let positionX1 = PLAYER1_INITIAL_X, positionY1 = PLAYER1_INITIAL_Y;
let positionX2 = PLAYER2_INITIAL_X, positionY2 = PLAYER2_INITIAL_Y;
let player1Bullets = [], player2Bullets = [];
let player1Score = INITIAL_SCORE, player2Score = INITIAL_SCORE;



function resetGame() {
    positionX1 = PLAYER1_INITIAL_X;
    positionY1 = PLAYER1_INITIAL_Y;
    positionX2 = PLAYER2_INITIAL_X;
    positionY2 = PLAYER2_INITIAL_Y;
    player1Score = INITIAL_SCORE;
    player2Score = INITIAL_SCORE;
    updateScoreBoards();
    airplane1.style.transform = `translate(${positionX1}px, ${positionY1}px)`;
    airplane2.style.transform = `translate(${positionX2}px, ${positionY2}px)`;
    player1Bullets = [];
    player2Bullets = [];
    bulletContainer.innerHTML = '';
}


function handleKeyDown(event) {
    const keyCode = event.keyCode;

  
    if (keyCode === KEYS.PLAYER1.LEFT) {
        positionX1 = Math.max(positionX1 - SPEED, 0);
    } else if (keyCode === KEYS.PLAYER1.UP) {
        positionY1 = Math.max(positionY1 - SPEED, 0);
    } else if (keyCode === KEYS.PLAYER1.RIGHT) {
        positionX1 = Math.min(positionX1 + SPEED, GAME_WIDTH - airplane1.offsetWidth);
    } else if (keyCode === KEYS.PLAYER1.DOWN) {
        positionY1 = Math.min(positionY1 + SPEED, GAME_HEIGHT - airplane1.offsetHeight);
    } else if (keyCode === KEYS.PLAYER1.SHOOT) {
        shootBullet(player1Bullets, positionX1 + airplane1.offsetWidth, positionY1, 1, BULLET_COLOR_PLAYER1);
    }

    
    if (keyCode === KEYS.PLAYER2.LEFT) {
        positionX2 = Math.max(positionX2 - SPEED, 0);
    } else if (keyCode === KEYS.PLAYER2.UP) {
        positionY2 = Math.max(positionY2 - SPEED, 0);
    } else if (keyCode === KEYS.PLAYER2.RIGHT) {
        positionX2 = Math.min(positionX2 + SPEED, GAME_WIDTH - airplane2.offsetWidth);
    } else if (keyCode === KEYS.PLAYER2.DOWN) {
        positionY2 = Math.min(positionY2 + SPEED, GAME_HEIGHT - airplane2.offsetHeight);
    } else if (keyCode === KEYS.PLAYER2.SHOOT) {
        shootBullet(player2Bullets, positionX2, positionY2, 2, BULLET_COLOR_PLAYER2);
    }

    airplane1.style.transform = `translate(${positionX1}px, ${positionY1}px)`;
    airplane2.style.transform = `translate(${positionX2}px, ${positionY2}px)`;
}


function shootBullet(bulletArray, x, y, player, color) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.backgroundColor = color;
    bullet.style.transform = `translate(${x}px, ${y}px)`;
    bulletContainer.appendChild(bullet);
    bulletArray.push({ element: bullet, x: x, y: y, active: true, player: player });
}


function moveBullets() {
    [...player1Bullets, ...player2Bullets].forEach((bullet, index) => {
        if (bullet.active) {
            bullet.x += bullet.player === 1 ? SPEED : -SPEED;
            bullet.element.style.transform = `translate(${bullet.x}px, ${bullet.y}px)`;

       
            if (bullet.x < 0 || bullet.x > GAME_WIDTH) {
                bullet.active = false;
                bulletContainer.removeChild(bullet.element);
            }

           
            if (bullet.player === 2 && isCollision(bullet, airplane1)) {
                bullet.active = false;
                bulletContainer.removeChild(bullet.element);
                player1Score -= 10;
                updateScoreBoards();
                if (player1Score <= 0) gameOver();
            }

            
            if (bullet.player === 1 && isCollision(bullet, airplane2)) {
                bullet.active = false;
                bulletContainer.removeChild(bullet.element);
                player2Score -= 10;
                updateScoreBoards();
                if (player2Score <= 0) gameOver();
            }
        }
    });
}


function isCollision(bullet, airplane) {
    const bulletRect = bullet.element.getBoundingClientRect();
    const airplaneRect = airplane.getBoundingClientRect();
    return bulletRect.x < airplaneRect.x + airplaneRect.width &&
           bulletRect.x + bulletRect.width > airplaneRect.x &&
           bulletRect.y < airplaneRect.y + airplaneRect.height &&
           bulletRect.y + bulletRect.height > airplaneRect.y;
}

function updateScoreBoards() {
    player1ScoreBoard.textContent = `Player 1 Score: ${player1Score}`;
    player2ScoreBoard.textContent = `Player 2 Score: ${player2Score}`;
}


function gameOver() {
    alert('Game Over');
    resetGame();
    document.removeEventListener;
}




const updateInterval = 1000 / 60;
setInterval(moveBullets, updateInterval);


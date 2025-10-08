// Konami Code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

// Create and inject CSS
const style = document.createElement('style');
style.textContent = `
      .snake-pixel {
        position: fixed;
        width: 10px;
        height: 10px;
        background: #00ff00;
        z-index: 10000;
        mix-blend-mode: difference;
      }
      .snake-food {
        position: fixed;
        width: 10px;
        height: 10px;
        background: #ff0000;
        z-index: 10000;
        mix-blend-mode: difference;
      }
      .game-over {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 20px;
        font-family: 'Courier New', monospace;
        z-index: 10001;
        text-align: center;
      }
    `;
document.head.appendChild(style);

class SnakeGame {
    constructor() {
        this.gridSize = 10;
        this.snake = [{x: 0, y: 0}];
        this.direction = 'right';
        this.food = null;
        this.score = 0;
        this.gameLoop = null;
        this.elements = [];

        this.gridWidth = Math.floor(window.innerWidth / this.gridSize);
        this.gridHeight = Math.floor(window.innerHeight / this.gridSize);

        this.spawnFood();
        this.setupEventListeners();
    }

    spawnFood() {
        const x = Math.floor(Math.random() * this.gridWidth);
        const y = Math.floor(Math.random() * this.gridHeight);
        this.food = {x, y};
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') this.direction = 'up';
                    break;
                case 'ArrowDown':
                    if (this.direction !== 'up') this.direction = 'down';
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') this.direction = 'left';
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') this.direction = 'right';
                    break;
            }
        });
    }

    update() {
        const head = {...this.snake[0]};

        switch(this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        if (head.x < 0 || head.x >= this.gridWidth ||
            head.y < 0 || head.y >= this.gridHeight) {
            this.gameOver();
            return;
        }

        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.spawnFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    draw() {
        this.elements.forEach(el => el.remove());
        this.elements = [];

        this.snake.forEach(segment => {
            const pixel = document.createElement('div');
            pixel.className = 'snake-pixel';
            pixel.style.left = segment.x * this.gridSize + 'px';
            pixel.style.top = segment.y * this.gridSize + 'px';
            document.body.appendChild(pixel);
            this.elements.push(pixel);
        });

        const foodPixel = document.createElement('div');
        foodPixel.className = 'snake-food';
        foodPixel.style.left = this.food.x * this.gridSize + 'px';
        foodPixel.style.top = this.food.y * this.gridSize + 'px';
        document.body.appendChild(foodPixel);
        this.elements.push(foodPixel);
    }

    gameOver() {
        clearInterval(this.gameLoop);
        const gameOverScreen = document.createElement('div');
        gameOverScreen.className = 'game-over';
        gameOverScreen.innerHTML = `
          GAME OVER<br>
          Score: ${this.score}<br>
          Press SPACE to restart
        `;
        document.body.appendChild(gameOverScreen);
        this.elements.push(gameOverScreen);

        const handleRestart = (e) => {
            if (e.key === ' ') {
                document.removeEventListener('keydown', handleRestart);
                this.elements.forEach(el => el.remove());
                this.elements = [];
                this.snake = [{x: 0, y: 0}];
                this.direction = 'right';
                this.score = 0;
                this.spawnFood();
                this.start();
            }
        };
        document.addEventListener('keydown', handleRestart);
    }

    start() {
        this.gameLoop = setInterval(() => this.update(), 100);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
            konamiIndex = 0;
            new SnakeGame().start();
        }
    } else {
        konamiIndex = 0;
    }
});

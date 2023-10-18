class buttonNumber {
    constructor(number) {
        this.number = number;
        this.element = document.createElement('button');
        this.element.className = 'number';
        this.element.textContent = number;
        this.element.addEventListener('click', () => this.click());
    }

    click() {
        // Lógica para manejar el clic en una ficha del rompecabezas
    }
}

class PuzzleGrid {
    constructor() {
        this.grid = document.getElementById('grid');
        this.button = [];
        for (let i = 1; i <= 15; i++) {
            const button = new buttonNumber(i);
            this.button.push(button);

            this.grid.appendChild(button.element);
        }

        const emptyButton = new buttonNumber('');
        emptyButton.element.classList.add('empty');
        this.button.push(emptyButton);
        this.grid.appendChild(emptyButton.element);
    }
}

class game {
    constructor() {
        this.grid = new PuzzleGrid();
        this.countElement = document.getElementById('count');
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start-button');
        this.moves = 0;

        this.shuffleNumbers();
    }

    shuffleNumbers() {
        // Lógica para revolver las fichas del rompecabezas
    }

    handleButtonClick(button) {
        // Lógica para manejar el clic en una ficha del rompecabezas
    }

    isPuzzleSolved() {
        // Lógica para verificar si el rompecabezas se ha resuelto
    }

    startGame() {
        // Lógica para iniciar el juego
    }
}

const game = new game();
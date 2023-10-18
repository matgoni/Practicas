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
        const tileIndices = this.grid.tiles
        .map((tile, index) => tile.number === '' ? -1 : index)
        .filter(index => index !== -1);

        for (let i = tileIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tileIndices[i], tileIndices[j]] = [tileIndices[j], tileIndices[i]];
        }

        tileIndices.forEach((newIndex, oldIndex) => {
            [this.grid.tiles[oldIndex], this.grid.tiles[newIndex]] = [this.grid.tiles[newIndex], this.grid.tiles[oldIndex]];
        });

        this.grid.tiles.forEach((tile, index) => {
        if (tile.number !== '') {
            this.grid.grid.replaceChild(tile.element, this.grid.grid.children[index]);
        }
    });

    this.moves = 0;
    this.countElement.textContent = this.moves;
    this.timerElement.textContent = "00:00";
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
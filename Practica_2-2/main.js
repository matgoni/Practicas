class Juego {
    constructor() {
        this.cuadricula = document.getElementById("cuadricula");
        this.botonInicio = document.getElementById("boton-inicio");
        this.contadorSpan = document.getElementById("contador");
        this.temporizadorSpan = document.getElementById("temporizador");

        this.rompecabezas = [];
        this.botonVacio = null;
        this.enJuego = false;
        this.movimientos = 0;
        this.intervaloTemporizador = null;

        this.botonInicio.addEventListener("click", this.iniciarJuego.bind(this));
        this.cuadricula.addEventListener("click", (e) => this.manipularBoton(e));

        this.inicializar();
    }

    inicializar() {
        this.construirRompecabezas();
        this.mezclarRompecabezas();
    }

    construirRompecabezas() {
        const numRows = 4;
        const numCols = 4;
        this.rompecabezas = new Array(numRows);

        for (let i = 0; i< numRows; i++)
        {
            this.rompecabezas[i] = new Array (numCols);
            for(let j = 0; j < numCols; j++)
            {
                const button = document.createElement("button");
                button.className = "numero";
                button.textContent = i * numCols + j + 1;
                this.cuadricula.appendChild(button);
                this.rompecabezas[i][j] = button;
                button.addEventListener("click", (event) => this.manipularBoton(event));
            }
        }
        this.rompecabezas[numRows -1][numCols -1].textContent = "";
        this.botonVacio = this.rompecabezas[numRows -1][numCols -1];
    }

    mezclarRompecabezas() {
        // Implementa la lógica para mezclar el rompecabezas
        // ...
    }

    iniciarJuego() {
        if (!this.enJuego) {
            this.inicializar();
            this.botonInicio.disabled = true;
            this.enJuego = true;
            let segundos = 0;
            this.intervaloTemporizador = setInterval(() => {
                segundos++;
                const minutos = Math.floor(segundos / 60);
                const segundosFormateados = String(segundos % 60).padStart(2, "0");
                this.temporizadorSpan.textContent = `${minutos}:${segundosFormateados}`;
            }, 1000);
        }
    }

    manipularBoton(evento) {
        if (this.enJuego) {
            const boton = evento.target;
            if (boton.className === "numero") {
                const [fila, columna] = this.obtenerPosicion(boton);

                if (this.esAdyacente(this.botonVacio, fila, columna)) {
                    // Implementar la lógica para intercambiar botones
                    // ...
                    this.movimientos++;
                    this.contadorSpan.textContent = this.movimientos;

                    if (this.estaResuelto()) {
                        clearInterval(this.intervaloTemporizador);
                        alert("¡Ganaste! ¡Rompecabezas resuelto!");
                    }
                }
            }
        }
    }

    obtenerPosicion(boton) {
        // Obtiene la posición de un botón en la matriz del rompecabezas
        // Devuelve un arreglo [fila, columna]
    }

    esAdyacente(boton1, fila, columna) {
        // Implementa la lógica para verificar si dos botones son adyacentes
    }

    estaResuelto() {
        // Implementa la lógica para verificar si el rompecabezas se ha resuelto
        // Devuelve true si el rompecabezas está resuelto
    }
}

// Inicializa el juego
const juego = new Juego()

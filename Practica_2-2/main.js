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

        this.inicializar();
    }

    inicializar() {
        this.cuadricula.innerHTML = "";
        this.construirRompecabezas();
        this.mezclarRompecabezas();
    }

    construirRompecabezas() {
        const numRows = 4;
        const numCols = 4;
        this.rompecabezas = new Array(numRows);

        for (let i = 0; i < numRows; i++) {
            this.rompecabezas[i] = new Array(numCols);
            for (let j = 0; j < numCols; j++) {
                const button = document.createElement("button");
                button.className = "numero";
                button.textContent = i * numCols + j + 1;
                button.style.gridRow = i + 1;
                button.style.gridColumn = j + 1;
                this.cuadricula.appendChild(button);
                this.rompecabezas[i][j] = button;
                button.addEventListener("click", (event) => this.manipularBoton(event));
            }
        }
        this.rompecabezas[numRows - 1][numCols - 1].textContent = "";
        this.botonVacio = this.rompecabezas[numRows - 1][numCols - 1];
    }

    mezclarRompecabezas() {
        const cantidadMovimientosAleatorios = 100;
        let ultimoBoton = this.botonVacio;
        const numRows = this.rompecabezas.length;
        const numCols = this.rompecabezas[0].length;

        for (let i = 0; i < cantidadMovimientosAleatorios; i++) {
            const filaVacia = this.obtenerPosicion(this.botonVacio)[0];
            const columnaVacia = this.obtenerPosicion(this.botonVacio)[1];

            let opciones = [];

            if (filaVacia > 0) {
                opciones.push(this.rompecabezas[filaVacia - 1][columnaVacia]);
            }
            if (filaVacia < numRows - 1) {
                opciones.push(this.rompecabezas[filaVacia + 1][columnaVacia]);
            }
            if (columnaVacia > 0) {
                opciones.push(this.rompecabezas[filaVacia][columnaVacia - 1]);
            }
            if (columnaVacia < numCols - 1) {
                opciones.push(this.rompecabezas[filaVacia][columnaVacia + 1]);
            }

            const botonAleatorio = opciones[Math.floor(Math.random() * opciones.length)];
            this.intercambiarBotones(ultimoBoton, botonAleatorio);
            ultimoBoton = botonAleatorio;
        }
    }

    intercambiarBotones(boton1, boton2) {
        const tempGridRow = boton1.style.gridRow;
        const tempGridColumn = boton1.style.gridColumn;

        boton1.style.gridRow = boton2.style.gridRow;
        boton1.style.gridColumn = boton2.style.gridColumn;

        boton2.style.gridRow = tempGridRow;
        boton2.style.gridColumn = tempGridColumn;
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
                    this.intercambiarBotones(this.botonVacio, boton);
                    this.movimientos++;
                    this.contadorSpan.textContent = this.movimientos;
                    this.botonVacio = boton;

                    if (this.estaResuelto()) {
                        clearInterval(this.intervaloTemporizador);
                        alert("¡Ganaste! ¡Rompecabezas resuelto!");
                    }
                }
            }
        }
    }

    obtenerPosicion(boton) {
        for (let i = 0; i < this.rompecabezas.length; i++) {
            for (let j = 0; j < this.rompecabezas[i].length; j++) {
                if (this.rompecabezas[i][j] === boton) {
                    return [i, j];
                }
            }
        }
    }

    esAdyacente(boton1, fila, columna) {
        if (boton1) {
            const [botonFila, botonColumna] = this.obtenerPosicion(boton1);

            const esMismaFila = botonFila === fila;
            const esMismaColumna = botonColumna === columna;

            if (esMismaFila && Math.abs(botonColumna - columna) === 1) {
                return true;
            }

            if (esMismaColumna && Math.abs(botonFila - fila) === 1) {
                return true;
            }
        }

        return false;
    }

    estaResuelto() {
        const numRows = this.rompecabezas.length;
        const numCols = this.rompecabezas[0].length;
        let valorEsperado = 1;

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (this.rompecabezas[i][j].textContent !== "") {
                    const valorActual = parseInt(this.rompecabezas[i][j].textContent);
                    if (valorActual !== valorEsperado) {
                        return false;
                    }
                    valorEsperado++;
                }
            }
        }
        return true;
    }
}

const juego = new Juego();

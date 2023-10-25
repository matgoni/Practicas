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
        const cantidadMovimientosAleatorios = 100;
        let ultimoBoton = null;
    
        for (let i = 0; i < cantidadMovimientosAleatorios; i++) {
            const botonesAdyacentes = [];
    
            if (ultimoBoton) {
                const [fila, columna] = this.obtenerPosicion(ultimoBoton);
    
                if (this.esAdyacente(this.botonVacio, fila, columna - 1)) {
                    botonesAdyacentes.push(this.botonVacio);
                }
                if (this.esAdyacente(this.botonVacio, fila, columna + 1)) {
                    botonesAdyacentes.push(this.botonVacio);
                }
                if (this.esAdyacente(this.botonVacio, fila - 1, columna)) {
                    botonesAdyacentes.push(this.botonVacio);
                }
                if (this.esAdyacente(this.botonVacio, fila + 1, columna)) {
                    botonesAdyacentes.push(this.botonVacio);
                }
            }
    
            const botonAleatorio = botonesAdyacentes[Math.floor(Math.random() * botonesAdyacentes.length)];
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
        // Implementa la lógica para verificar si el rompecabezas se ha resuelto
        // Devuelve true si el rompecabezas está resuelto
    }
}

// Inicializa el juego
const juego = new Juego()

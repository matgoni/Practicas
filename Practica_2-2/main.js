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
        // Crear una matriz bidimensional para representar el rompecabezas
        // Llenar la cuadrícula con botones y números
        // Registrar los botones en la matriz del rompecabezas
        // Establecer el botón vacío
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

    intercambiarBotones(boton1, boton2) {
        const tempGridRow = boton1.style.gridRow;
        const tempGridColumn = boton1.style.gridColumn;
    
        boton1.style.gridRow = boton2.style.gridRow;
        boton1.style.gridColumn = boton2.style.gridColumn;
    
        boton2.style.gridRow = tempGridRow;
        boton2.style.gridColumn = tempGridColumn;
    }    
}

// Inicializa el juego
const juego = new Juego()

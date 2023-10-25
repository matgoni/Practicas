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
      this.construirRompecabezas();
    }
  
    construirRompecabezas() {
      this.cuadricula.innerHTML = ""; // Limpia la cuadrícula anterior
  
      const numRows = 4;
      const numCols = 4;
      this.rompecabezas = new Array(numRows);
  
      for (let i = 0; i < numRows; i++) {
        this.rompecabezas[i] = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
          const button = document.createElement("button");
          button.className = "numero";
          this.cuadricula.appendChild(button);
          this.rompecabezas[i][j] = button;
        }
      }
      this.botonVacio = this.rompecabezas[numRows - 1][numCols - 1];
      this.rompecabezas[numRows - 1][numCols - 1].textContent = "";
  
      if (this.enJuego) {
        this.mezclarRompecabezas();
      }
    }
  
    mezclarRompecabezas() {
      const numRows = this.rompecabezas.length;
      const numCols = this.rompecabezas[0].length;
      const totalCeldas = numRows * numCols;
      const numerosDesordenados = [...Array(totalCeldas - 1).keys()];
  
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          if (this.rompecabezas[i][j] !== this.botonVacio) {
            const indiceAleatorio = Math.floor(Math.random() * numerosDesordenados.length);
            const numeroAleatorio = numerosDesordenados.splice(indiceAleatorio, 1)[0];
            this.rompecabezas[i][j].textContent = numeroAleatorio + 1;
            this.rompecabezas[i][j].addEventListener("click", (event) => this.manipularBoton(event));
          }
        }
      }
    }
  
    intercambiarBotones(boton1, boton2) {
      const tempText = boton1.textContent;
      boton1.textContent = boton2.textContent;
      boton2.textContent = tempText;
    }
  
    iniciarJuego() {
      if (!this.enJuego) {
        this.enJuego = true;
        this.botonInicio.disabled = true;
        this.inicializar();
        this.mezclarRompecabezas();
        this.movimientos = 0;
        this.contadorSpan.textContent = this.movimientos;
        this.temporizadorSpan.textContent = "0:00";
        this.intervaloTemporizador = setInterval(() => {
          this.actualizarTemporizador();
        }, 1000);
      }
    }
  
    actualizarTemporizador() {
      const segundos = parseInt(this.temporizadorSpan.textContent.split(":")[1]);
      const minutos = parseInt(this.temporizadorSpan.textContent.split(":")[0]);
  
      if (segundos < 59) {
        this.temporizadorSpan.textContent = minutos + ":" + String(segundos + 1).padStart(2, "0");
      } else {
        this.temporizadorSpan.textContent = minutos + 1 + ":00";
      }
    }
  
    manipularBoton(evento) {
      if (this.enJuego) {
        const boton = evento.target;
        if (boton.className === "numero") {
          const botonFila = this.obtenerFila(boton);
          const botonColumna = this.obtenerColumna(boton);
          const vacioFila = this.obtenerFila(this.botonVacio);
          const vacioColumna = this.obtenerColumna(this.botonVacio);
  
          if (
            (Math.abs(botonFila - vacioFila) === 1 && botonColumna === vacioColumna) ||
            (Math.abs(botonColumna - vacioColumna) === 1 && botonFila === vacioFila)
          ) {
            this.intercambiarBotones(boton, this.botonVacio);
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
  
    obtenerFila(boton) {
      return this.rompecabezas.findIndex((fila) => fila.includes(boton));
    }
  
    obtenerColumna(boton) {
      const fila = this.rompecabezas.find((fila) => fila.includes(boton));
      return fila ? fila.indexOf(boton) : -1;
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
  
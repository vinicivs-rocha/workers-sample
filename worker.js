let canvasB = null;
let ctxWorker = null;

// Espera de mensagens da main thread
self.onmessage = (event) => {
  if (event.data === "slowDown") {
    fibonacci(42);
  } else {
    canvasB = event.data.canvas;
    ctxWorker = canvasB.getContext("2d");
    startCounting();
  }
};

function fibonacci(num) {
  if (num <= 1) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

// Inicia o intervalo de contagem da worker thread
let counter = 0;
function startCounting() {
  setInterval(() => {
    redrawCanvasB();
    counter++;
  }, 100);
}

// Redesenha o canvas B
function redrawCanvasB() {
  ctxWorker.clearRect(0, 0, canvasB.width, canvasB.height);
  ctxWorker.font = "24px Verdana";
  ctxWorker.textAlign = "center";
  ctxWorker.fillText(counter, canvasB.width / 2, canvasB.height / 2);
}

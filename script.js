const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const Canvas = document.getElementById("mycanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const fontPicker = document.getElementById("fontPicker");
const ctx = Canvas.getContext("2d");

colorPicker.addEventListener("change", (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
});

canvasColor.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

Canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

Canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();


    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});

Canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
Canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

fontPicker.addEventListener('change', (event) => {
  ctx.lineWidth = event.target.value;
});

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
})

saveButton.addEventListener('click', () => {
  localStorage.setItem('CanvasContents', Canvas.toDataURL());

  let link = document.createElement('a');

  link.download = 'my-canvas.png';

  link.href = Canvas.toDataURL();
  link.click();
});

retrieveButton.addEventListener('click', () => {
  let savedCanvas = localStorage.getItem('CanvasContents');

  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});



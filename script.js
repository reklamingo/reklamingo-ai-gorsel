// CanvasEditor V4 - script.js

const canvas = document.getElementById("canvas");

function setSize(w, h) {
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

function uploadBackground(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = event => {
    canvas.style.backgroundImage = `url(${event.target.result})`;
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "center";
  };
  reader.readAsDataURL(file);
}

function addText() {
  const text = document.getElementById("textInput").value;
  if (!text.trim()) return;
  const el = document.createElement("div");
  el.innerText = text;
  el.className = "canvas-item";
  el.contentEditable = true;
  el.style.top = "50px";
  el.style.left = "50px";
  el.style.position = "absolute";
  el.style.fontSize = "24px";
  el.style.fontWeight = "bold";
  el.style.background = "transparent";
  el.style.minWidth = "50px";
  el.style.minHeight = "30px";
  makeDraggable(el);
  canvas.appendChild(el);
}

function uploadLogo(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = event => {
    const img = document.createElement("img");
    img.src = event.target.result;
    img.className = "canvas-item";
    img.style.top = "60px";
    img.style.left = "60px";
    img.style.width = "120px";
    img.style.height = "auto";
    img.style.position = "absolute";
    img.draggable = false;
    makeDraggable(img);
    canvas.appendChild(img);
  };
  reader.readAsDataURL(file);
}

function addFrame() {
  const color = document.getElementById("frameColor").value;
  const frame = document.createElement("div");
  frame.style.position = "absolute";
  frame.style.top = "0";
  frame.style.left = "0";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.border = `5px solid ${color}`;
  frame.style.pointerEvents = "none";
  frame.className = "frame-border";
  canvas.appendChild(frame);
}

function makeDraggable(el) {
  let offsetX = 0;
  let offsetY = 0;

  el.addEventListener("mousedown", function (e) {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;

    function mouseMoveHandler(e) {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    }

    function mouseUpHandler() {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  });
}

function downloadImage() {
  html2canvas(canvas).then(canvasExport => {
    const link = document.createElement("a");
    link.download = "tasarim.png";
    link.href = canvasExport.toDataURL();
    link.click();
  });
}

function clearCanvas() {
  canvas.innerHTML = "";
  canvas.style.backgroundImage = "none";
  canvas.style.backgroundColor = document.getElementById("bgColor").value || "#ffffff";
}

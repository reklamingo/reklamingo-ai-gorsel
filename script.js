// CanvasEditor V3 - script.js

const canvas = document.getElementById("canvas");

function setSize(width, height) {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
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

function addText(tag) {
  const value = document.getElementById("textInput").value;
  if (!value.trim()) return;
  const el = document.createElement(tag);
  el.innerText = value;
  el.className = "canvas-item";
  el.style.top = "50px";
  el.style.left = "50px";
  el.style.position = "absolute";
  el.contentEditable = true;
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
    img.style.width = "120px";
    img.style.height = "auto";
    img.className = "canvas-item";
    img.style.top = "50px";
    img.style.left = "50px";
    img.style.position = "absolute";
    makeDraggable(img);
    canvas.appendChild(img);
  };
  reader.readAsDataURL(file);
}

function makeDraggable(el) {
  el.style.cursor = "move";
  el.draggable = false;
  let offsetX, offsetY;

  el.addEventListener("mousedown", (e) => {
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
  canvas.style.backgroundColor = document.getElementById("bgColor").value || "white";
}

window.onload = () => {
  const colorPalette = document.getElementById("colorPalette");
  const gradientPalette = document.getElementById("gradientPalette");
  const colors = ["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffcc00", "#ff00ff", "#00ffff"];
  const gradients = [
    "linear-gradient(45deg, #ff7e5f, #feb47b)",
    "linear-gradient(45deg, #6a11cb, #2575fc)",
    "linear-gradient(45deg, #fc466b, #3f5efb)",
    "linear-gradient(45deg, #00c6ff, #0072ff)"
  ];

  colors.forEach(c => {
    const btn = document.createElement("button");
    btn.style.background = c;
    btn.onclick = () => {
      canvas.style.backgroundColor = c;
      canvas.style.backgroundImage = "none";
    };
    colorPalette.appendChild(btn);
  });

  gradients.forEach(g => {
    const btn = document.createElement("button");
    btn.style.background = g;
    btn.onclick = () => {
      canvas.style.backgroundImage = g;
      canvas.style.backgroundSize = "cover";
      canvas.style.backgroundPosition = "center";
    };
    gradientPalette.appendChild(btn);
  });
};

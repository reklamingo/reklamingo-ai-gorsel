// CanvasEditor V4.1 - script.js

const canvas = document.getElementById("canvas");
let selectedElement = null;
let boldActive = false;
let italicActive = false;

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
    canvas.style.filter = getBgFilter();
  };
  reader.readAsDataURL(file);
}

function getBgFilter() {
  const blur = document.getElementById("bgBlur").value;
  return `blur(${blur}px)`;
}

function updateBgFilter() {
  canvas.style.filter = getBgFilter();
  canvas.style.opacity = document.getElementById("bgOpacity").value / 100;
}

document.getElementById("bgOpacity").oninput = updateBgFilter;
document.getElementById("bgBlur").oninput = updateBgFilter;

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
  el.style.fontSize = document.getElementById("fontSize").value || "24px";
  el.style.fontFamily = document.getElementById("fontFamily").value || "Quicksand";
  el.style.color = document.getElementById("fontColor").value;
  el.style.fontWeight = boldActive ? "bold" : "normal";
  el.style.fontStyle = italicActive ? "italic" : "normal";
  makeDraggable(el);
  el.onclick = () => selectElement(el);
  canvas.appendChild(el);
  selectElement(el);
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
    img.onclick = () => selectElement(img);
    canvas.appendChild(img);
    selectElement(img);
  };
  reader.readAsDataURL(file);
}

function addFrame() {
  const color = document.getElementById("frameColor").value;
  const padding = document.getElementById("framePadding").value;
  const frame = document.createElement("div");
  frame.style.position = "absolute";
  frame.style.top = `${padding}px`;
  frame.style.left = `${padding}px`;
  frame.style.right = `${padding}px`;
  frame.style.bottom = `${padding}px`;
  frame.style.border = `4px solid ${color}`;
  frame.style.pointerEvents = "none";
  frame.className = "frame-border";
  canvas.appendChild(frame);
}

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0;
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

function selectElement(el) {
  selectedElement = el;
  document.getElementById("editPanel").classList.remove("hidden");
  if (el.tagName === "DIV") {
    document.getElementById("editContent").value = el.innerText;
    document.getElementById("editColor").value = rgbToHex(el.style.color);
    document.getElementById("editSize").value = parseInt(el.style.fontSize);
  }
}

function deleteSelected() {
  if (selectedElement) {
    canvas.removeChild(selectedElement);
    selectedElement = null;
    document.getElementById("editPanel").classList.add("hidden");
  }
}

function alignItem(direction) {
  if (!selectedElement) return;
  if (direction === "left") selectedElement.style.textAlign = "left";
  if (direction === "center") selectedElement.style.textAlign = "center";
  if (direction === "right") selectedElement.style.textAlign = "right";
}

function toggleBold() {
  boldActive = !boldActive;
  document.querySelector(".style-buttons button:nth-child(1)").classList.toggle("active");
}

function toggleItalic() {
  italicActive = !italicActive;
  document.querySelector(".style-buttons button:nth-child(2)").classList.toggle("active");
}

document.getElementById("editContent").oninput = function () {
  if (selectedElement && selectedElement.tagName === "DIV") {
    selectedElement.innerText = this.value;
  }
};

document.getElementById("editColor").oninput = function () {
  if (selectedElement) {
    selectedElement.style.color = this.value;
  }
};

document.getElementById("editSize").oninput = function () {
  if (selectedElement) {
    selectedElement.style.fontSize = this.value + "px";
  }
};

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
  document.getElementById("editPanel").classList.add("hidden");
}

function rgbToHex(rgb) {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
  return result ?
    "#" + result.slice(1).map(x => (+x).toString(16).padStart(2, "0")).join("") : rgb;
}

window.onload = () => {
  const fontSelect = document.getElementById("fontFamily");
  ["Quicksand", "Arial", "Montserrat", "Roboto", "Georgia"].forEach(f => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.innerText = f;
    fontSelect.appendChild(opt);
  });

  const sizeSelect = document.getElementById("fontSize");
  [16, 20, 24, 32, 40, 48, 60].forEach(s => {
    const opt = document.createElement("option");
    opt.value = `${s}px`;
    opt.innerText = s + " px";
    sizeSelect.appendChild(opt);
  });

  const gradientPalette = document.getElementById("gradientPalette");
  const gradients = [
    "linear-gradient(45deg, #ff7e5f, #feb47b)",
    "linear-gradient(45deg, #6a11cb, #2575fc)",
    "linear-gradient(45deg, #fc466b, #3f5efb)",
    "linear-gradient(45deg, #00c6ff, #0072ff)",
    "linear-gradient(45deg, #f7971e, #ffd200)",
    "linear-gradient(45deg, #eecda3, #ef629f)",
    "linear-gradient(45deg, #43cea2, #185a9d)",
    "linear-gradient(45deg, #f953c6, #b91d73)"
  ];
  gradients.forEach(g => {
    const btn = document.createElement("button");
    btn.style.background = g;
    btn.onclick = () => {
      canvas.style.backgroundImage = g;
      canvas.style.backgroundSize = "cover";
      canvas.style.backgroundPosition = "center";
      canvas.style.filter = getBgFilter();
    };
    gradientPalette.appendChild(btn);
  });
};

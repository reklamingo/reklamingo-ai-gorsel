// CanvasEditor V2.3 - script.js

const canvas = document.getElementById("canvas");
let selectedElement = null;
let boldActive = false;
let italicActive = false;

const colors = ["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffcc00", "#ff00ff", "#00ffff", "#3ecf00", "#003e92"];
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

function initPalettes() {
  const colorPalette = document.getElementById("colorPalette");
  const gradientPalette = document.getElementById("gradientPalette");

  colors.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "color-box";
    btn.style.background = c;
    btn.onclick = () => {
      canvas.style.background = c;
      canvas.style.backgroundImage = "none";
      canvas.style.filter = getBgFilter();
    };
    colorPalette.appendChild(btn);
  });

  gradients.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "gradient-box";
    btn.style.background = g;
    btn.onclick = () => {
      canvas.style.background = g;
      canvas.style.backgroundImage = "none";
      canvas.style.filter = getBgFilter();
    };
    gradientPalette.appendChild(btn);
  });

  document.getElementById("bgOpacity").oninput = updateBgFilter;
  document.getElementById("bgBlur").oninput = updateBgFilter;
}

function getBgFilter() {
  const blur = document.getElementById("bgBlur").value;
  return `blur(${blur}px)`;
}

function updateBgFilter() {
  canvas.style.filter = getBgFilter();
  canvas.style.opacity = document.getElementById("bgOpacity").value / 100;
}

function addElement(content, isText = true) {
  const el = document.createElement("div");
  el.className = "canvas-item";
  el.contentEditable = isText;
  el.style.top = "60px";
  el.style.left = "60px";
  el.style.position = "absolute";
  el.style.resize = "both";
  el.style.overflow = "auto";
  el.style.minWidth = "40px";
  el.style.minHeight = "40px";
  el.style.padding = "4px";
  el.style.zIndex = "10";

  if (isText) {
    el.innerText = content;
    el.style.fontWeight = boldActive ? "bold" : "normal";
    el.style.fontStyle = italicActive ? "italic" : "normal";
    el.style.color = document.getElementById("fontColor").value;
    el.style.fontSize = document.getElementById("fontSize").value;
    el.style.fontFamily = document.getElementById("fontFamily").value;
  } else {
    el.appendChild(content);
  }

  el.onclick = () => selectElement(el);
  el.ondblclick = e => e.stopPropagation();
  canvas.appendChild(el);
  selectElement(el);
}

function addText() {
  const text = document.getElementById("textInput").value;
  if (text.trim()) addElement(text);
}

function uploadLogo(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = event => {
    const img = document.createElement("img");
    img.src = event.target.result;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.display = "block";
    img.draggable = false;

    const wrapper = document.createElement("div");
    wrapper.style.width = "120px";
    wrapper.style.height = "auto";
    wrapper.appendChild(img);
    addElement(wrapper, false);
  };
  reader.readAsDataURL(file);
}

function addNameAsLogo() {
  const text = document.getElementById("nameAsLogo").value;
  if (text) addElement(text);
}

function selectElement(el) {
  selectedElement = el;
}

function deleteSelected() {
  if (selectedElement) {
    canvas.removeChild(selectedElement);
    selectedElement = null;
  }
}

function addFrame() {
  const color = document.getElementById("frameColor").value;
  const frame = document.createElement("div");
  frame.className = "frame-border";
  frame.style.borderColor = color;
  canvas.appendChild(frame);
}

function downloadImage() {
  html2canvas(canvas).then(canvasExport => {
    const link = document.createElement("a");
    link.download = "tasarim.png";
    link.href = canvasExport.toDataURL();
    link.click();
  });
}

window.onload = () => {
  initPalettes();

  const fontSelect = document.getElementById("fontFamily");
  const fonts = ["Quicksand", "Arial", "Montserrat", "Roboto", "Georgia"];
  fonts.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.innerText = f;
    fontSelect.appendChild(opt);
  });

  const sizeSelect = document.getElementById("fontSize");
  [24, 32, 40, 48, 60, 72].forEach(s => {
    const opt = document.createElement("option");
    opt.value = `${s}px`;
    opt.innerText = s;
    sizeSelect.appendChild(opt);
  });
};

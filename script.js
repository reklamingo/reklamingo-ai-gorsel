// CanvasEditorV2.1 - script.js (Geliştirilmiş)

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
    const div = document.createElement("div");
    div.className = "color-box";
    div.style.background = c;
    div.title = c;
    div.onclick = () => {
      canvas.style.background = c;
      canvas.style.filter = getBgFilter();
    };
    colorPalette.appendChild(div);
  });

  gradients.forEach(g => {
    const div = document.createElement("div");
    div.className = "gradient-box";
    div.style.background = g;
    div.title = "Gradyan";
    div.onclick = () => {
      canvas.style.background = g;
      canvas.style.filter = getBgFilter();
    };
    gradientPalette.appendChild(div);
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

function applyCustomSize() {
  const w = document.getElementById("customWidth").value;
  const h = document.getElementById("customHeight").value;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

document.getElementById("sizeSelect").onchange = function () {
  const value = this.value;
  document.getElementById("customSize").classList.toggle("hidden", value !== "custom");
  if (value !== "custom") {
    const [w, h] = value.split("x");
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }
};

function uploadBackground(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = event => {
    canvas.style.backgroundImage = `url(${event.target.result})`;
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "center";
  };
  reader.readAsDataURL(file);
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
  el.style.border = "1px dashed transparent";
  el.style.zIndex = "10";
  if (isText) el.innerText = content;
  else el.appendChild(content);

  el.onclick = () => selectElement(el);
  el.ondblclick = e => e.stopPropagation();
  canvas.appendChild(el);
  selectElement(el);
}

function addText() {
  const text = document.getElementById("textInput").value;
  addElement(text);
}

function uploadLogo(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = event => {
    const img = document.createElement("img");
    img.src = event.target.result;
    img.style.width = "100px";
    img.style.display = "block";
    img.style.pointerEvents = "none";
    addElement(img, false);
  };
  reader.readAsDataURL(file);
}

function addNameAsLogo() {
  const text = document.getElementById("nameAsLogo").value;
  if (text) addElement(text);
}

function selectElement(el) {
  selectedElement = el;
  const panel = document.getElementById("editPanel");
  panel.classList.remove("hidden");
  document.getElementById("editContent").value = el.innerText || "";
  document.getElementById("editColor").value = rgb2hex(el.style.color || "#000000");
  document.getElementById("editSize").value = parseInt(el.style.fontSize) || 24;
}

function rgb2hex(rgb) {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
  return result ?
    "#" + result.slice(1).map(x => ("0" + parseInt(x).toString(16)).slice(-2)).join("") : rgb;
}

document.getElementById("editContent").oninput = e => {
  if (selectedElement) selectedElement.innerText = e.target.value;
};
document.getElementById("editColor").oninput = e => {
  if (selectedElement) selectedElement.style.color = e.target.value;
};
document.getElementById("editSize").oninput = e => {
  if (selectedElement) selectedElement.style.fontSize = `${e.target.value}px`;
};

function alignItem(direction) {
  if (!selectedElement) return;
  const parentWidth = canvas.offsetWidth;
  const parentHeight = canvas.offsetHeight;
  const elWidth = selectedElement.offsetWidth;
  const elHeight = selectedElement.offsetHeight;

  if (direction === "center") {
    selectedElement.style.left = `${(parentWidth - elWidth) / 2}px`;
  } else if (direction === "left") {
    selectedElement.style.left = "0px";
  } else if (direction === "right") {
    selectedElement.style.left = `${parentWidth - elWidth}px`;
  }
}

function deleteSelected() {
  if (selectedElement) {
    canvas.removeChild(selectedElement);
    selectedElement = null;
    document.getElementById("editPanel").classList.add("hidden");
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
  const editFont = document.getElementById("editFont");
  const fonts = ["Quicksand", "Arial", "Montserrat", "Roboto", "Georgia"];
  fonts.forEach(f => {
    const opt1 = document.createElement("option");
    opt1.value = f;
    opt1.innerText = f;
    fontSelect.appendChild(opt1);
    const opt2 = opt1.cloneNode(true);
    editFont.appendChild(opt2);
  });

  const sizeSelect = document.getElementById("fontSize");
  [24, 32, 40, 48, 60, 72].forEach(s => {
    const opt = document.createElement("option");
    opt.value = `${s}px`;
    opt.innerText = s;
    sizeSelect.appendChild(opt);
  });
};

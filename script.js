const canvas = document.getElementById('canvas');
let dragItem = null;
let boldActive = false;
let italicActive = false;

const colorOptions = [
  '#ffffff', '#000000', '#ff0000', '#00ff00',
  '#0000ff', '#ffcc00', '#ff00ff', '#00ffff',
  '#888888', '#3ecf00', '#003e92'
];

const gradientOptions = [
  'linear-gradient(45deg, #ff7e5f, #feb47b)',
  'linear-gradient(45deg, #6a11cb, #2575fc)',
  'linear-gradient(45deg, #fc466b, #3f5efb)',
  'linear-gradient(45deg, #00c6ff, #0072ff)',
  'linear-gradient(45deg, #f7971e, #ffd200)',
  'linear-gradient(45deg, #eecda3, #ef629f)',
  'linear-gradient(45deg, #43cea2, #185a9d)',
  'linear-gradient(45deg, #f953c6, #b91d73)'
];

// ---------- BOYUT SEÇİMİ ----------
document.getElementById('sizeSelect').addEventListener('change', function () {
  const value = this.value;
  if (value === 'custom') {
    document.getElementById('customSize').classList.remove('hidden');
  } else {
    document.getElementById('customSize').classList.add('hidden');
    const [w, h] = value.split('x');
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }
});

function applyCustomSize() {
  const w = document.getElementById('customWidth').value;
  const h = document.getElementById('customHeight').value;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

// ---------- ARKA PLAN ----------
function setBackgroundColor(color) {
  canvas.style.background = color;
  canvas.style.backgroundImage = '';
}

function uploadBackground(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    canvas.style.backgroundImage = `url(${event.target.result})`;
    canvas.style.backgroundSize = 'cover';
    canvas.style.backgroundPosition = 'center';
  };
  reader.readAsDataURL(file);
}

// ---------- LOGO / İSİM ----------
function uploadLogo(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = document.createElement('img');
    img.src = event.target.result;
    img.style.width = '120px';

    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-item';
    wrapper.style.top = '40px';
    wrapper.style.left = '40px';
    wrapper.appendChild(img);

    makeInteractive(wrapper);
    canvas.appendChild(wrapper);
  };
  reader.readAsDataURL(file);
}

function addNameAsLogo() {
  const name = document.getElementById('nameText').value.trim();
  if (!name) return;
  const div = document.createElement('div');
  div.className = 'canvas-item';
  div.style.top = '50px';
  div.style.left = '50px';
  div.style.fontSize = '32px';
  div.style.fontWeight = 'bold';
  div.style.color = '#003e92';
  div.textContent = name;
  makeInteractive(div);
  canvas.appendChild(div);
}

// ---------- METİN EKLEME ----------
function toggleBold() {
  boldActive = !boldActive;
  document.getElementById('boldBtn').classList.toggle('active', boldActive);
}

function toggleItalic() {
  italicActive = !italicActive;
  document.getElementById('italicBtn').classList.toggle('active', italicActive);
}

function addText() {
  const value = document.getElementById('textInput').value;
  const font = document.getElementById('fontSelect').value;
  const size = document.getElementById('fontSize').value;
  const color = document.getElementById('fontColor').value;

  const div = document.createElement('div');
  div.className = 'canvas-item';
  div.textContent = value;
  div.style.top = '60px';
  div.style.left = '60px';
  div.style.fontFamily = font;
  div.style.fontSize = size;
  div.style.color = color;
  div.style.fontWeight = boldActive ? 'bold' : 'normal';
  div.style.fontStyle = italicActive ? 'italic' : 'normal';

  makeInteractive(div);
  canvas.appendChild(div);
}

// ---------- ÇERÇEVE ----------
function addFrame() {
  const color = document.getElementById('frameColor').value;
  const frame = document.createElement('div');
  frame.className = 'frame-border';
  frame.style.borderColor = color;
  canvas.appendChild(frame);
}

// ---------- SÜRÜKLEME / SİLME ----------
function makeInteractive(el) {
  el.setAttribute('draggable', true);
  el.addEventListener('dragstart', dragStart);
  el.addEventListener('dblclick', () => {
    if (confirm("Bu öğeyi silmek istiyor musunuz?")) {
      el.remove();
    }
  });
  el.addEventListener('touchstart', touchStart, { passive: false });
  el.addEventListener('touchmove', touchMove, { passive: false });
}

function dragStart(e) {
  dragItem = e.target;
  e.dataTransfer.setData('text/plain', '');
}

canvas.addEventListener('dragover', (e) => e.preventDefault());

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  if (dragItem) {
    const rect = canvas.getBoundingClientRect();
    dragItem.style.left = `${e.clientX - rect.left - dragItem.offsetWidth / 2}px`;
    dragItem.style.top = `${e.clientY - rect.top - dragItem.offsetHeight / 2}px`;
  }
});

function touchStart(e) {
  dragItem = e.target;
}

function touchMove(e) {
  if (dragItem) {
    const rect = canvas.getBoundingClientRect();
    dragItem.style.left = `${e.touches[0].clientX - rect.left - dragItem.offsetWidth / 2}px`;
    dragItem.style.top = `${e.touches[0].clientY - rect.top - dragItem.offsetHeight / 2}px`;
  }
}

// ---------- PNG OLARAK KAYDET ----------
function downloadImage() {
  html2canvas(canvas).then((canvasExport) => {
    const link = document.createElement('a');
    link.download = 'tasarim.png';
    link.href = canvasExport.toDataURL();
    link.click();
  });
}

// ---------- RENK PALETİ OLUŞTUR ----------
function createColorPalette() {
  const palette = document.getElementById('colorPalette');
  colorOptions.forEach(color => {
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.background = color;
    box.onclick = () => setBackgroundColor(color);
    palette.appendChild(box);
  });
}

function createGradientPalette() {
  const palette = document.getElementById('gradientPalette');
  gradientOptions.forEach(gradient => {
    const box = document.createElement('div');
    box.className = 'gradient-box';
    box.style.background = gradient;
    box.onclick = () => {
      canvas.style.background = gradient;
    };
    palette.appendChild(box);
  });
}

// ---------- BAŞLAT ----------
createColorPalette();
createGradientPalette();

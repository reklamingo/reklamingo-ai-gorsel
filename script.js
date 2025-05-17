let canvas = document.getElementById('canvas');

function setBackgroundColor(color) {
  canvas.style.background = color;
}

function uploadBackground(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    canvas.style.backgroundImage = `url(${event.target.result})`;
    canvas.style.backgroundSize = 'cover';
  };
  reader.readAsDataURL(file);
}

function uploadLogo(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = document.createElement('img');
    img.src = event.target.result;
    img.style.width = '100px';

    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-item';
    wrapper.style.top = '30px';
    wrapper.style.left = '30px';
    wrapper.appendChild(img);
    makeInteractive(wrapper);
    canvas.appendChild(wrapper);
  };
  reader.readAsDataURL(file);
}

function addText() {
  const value = document.getElementById('textInput').value;
  const size = document.getElementById('fontSize').value;
  const color = document.getElementById('fontColor').value;

  const div = document.createElement('div');
  div.className = 'canvas-item';
  div.textContent = value;
  div.style.fontSize = size;
  div.style.color = color;
  div.style.fontWeight = 'bold';
  div.style.top = '40px';
  div.style.left = '40px';
  makeInteractive(div);
  canvas.appendChild(div);
}

function addFrame() {
  const color = document.getElementById('frameColor').value;
  const frame = document.createElement('div');
  frame.className = 'frame-border';
  frame.style.borderColor = color;
  canvas.appendChild(frame);
}

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

let dragItem = null;

function dragStart(e) {
  dragItem = e.target;
  e.dataTransfer.setData('text/plain', '');
}

canvas.addEventListener('dragover', (e) => e.preventDefault());

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  if (dragItem) {
    const rect = canvas.getBoundingClientRect();
    dragItem.style.left = (e.clientX - rect.left - 50) + 'px';
    dragItem.style.top = (e.clientY - rect.top - 20) + 'px';
  }
});

function touchStart(e) {
  dragItem = e.target;
}

function touchMove(e) {
  if (dragItem) {
    const rect = canvas.getBoundingClientRect();
    dragItem.style.left = (e.touches[0].clientX - rect.left - 50) + 'px';
    dragItem.style.top = (e.touches[0].clientY - rect.top - 20) + 'px';
  }
}

function applyCustomSize() {
  const width = document.getElementById('customWidth').value;
  const height = document.getElementById('customHeight').value;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
}

document.getElementById('sizeSelect').addEventListener('change', function () {
  const value = this.value;
  if (value === 'custom') {
    document.getElementById('customSize').style.display = 'block';
  } else {
    document.getElementById('customSize').style.display = 'none';
    const [w, h] = value.split('x');
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  }
});

function downloadImage() {
  html2canvas(canvas).then((canvasExport) => {
    const link = document.createElement('a');
    link.download = 'tasarim.png';
    link.href = canvasExport.toDataURL();
    link.click();
  });
}

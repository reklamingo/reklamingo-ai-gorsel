// frontend-behaviors.js — Tamamlanmış JS fonksiyonları (sürükleme, çizim, state)

function updateCanvas() {
  const canvas = document.getElementById("canvas");
  canvas.innerHTML = "";

  state.elements.forEach(el => {
    const div = document.createElement("div");
    div.classList.add("canvas-element");
    div.style.left = `${el.x}px`;
    div.style.top = `${el.y}px`;
    div.style.width = `${el.width}px`;
    div.style.height = `${el.height}px`;

    if (el.type === "text" || el.type === "logoText") {
      div.classList.add("text-element");
      div.textContent = el.content;
      div.style.fontFamily = el.fontFamily;
      div.style.fontSize = `${el.fontSize}px`;
      div.style.color = el.color;
      div.style.fontWeight = el.bold ? "bold" : "normal";
      div.style.fontStyle = el.italic ? "italic" : "normal";
      div.style.textAlign = el.textAlign;
    } else if (el.type === "logo") {
      div.classList.add("logo-element");
      const img = document.createElement("img");
      img.src = el.content;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      div.appendChild(img);
    }

    // Sürüklenebilirlik
    div.onmousedown = function (e) {
      e.preventDefault();
      state.selectedElement = el;
      updateTextControls();
      updateLogoControls();

      let shiftX = e.clientX - div.getBoundingClientRect().left;
      let shiftY = e.clientY - div.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        el.x = pageX - canvas.getBoundingClientRect().left - shiftX;
        el.y = pageY - canvas.getBoundingClientRect().top - shiftY;
        updateCanvas();
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
        saveState();
      };
    };

    div.ondragstart = () => false;
    canvas.appendChild(div);
  });

  // Arka plan güncelle
  if (state.background.type === "color") {
    canvas.style.background = state.background.value;
  } else if (state.background.type === "image") {
    canvas.style.background = `url('${state.background.value}')`;
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "center";
  } else if (state.background.type === "gradient") {
    canvas.style.background = state.background.value;
  }
}

function saveState() {
  const snapshot = JSON.parse(JSON.stringify(state));
  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push(snapshot);
  state.historyIndex++;
}

function loadState(snapshot) {
  Object.assign(state, JSON.parse(JSON.stringify(snapshot)));
}

// Otomatik başlat
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

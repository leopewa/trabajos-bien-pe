// === script.js ===

// Variables principales
const pages = document.querySelectorAll(".pagina");
let current = 0;

const audio = document.getElementById("audioMama");
audio.volume = 0.3; // <-- Aquí bajas el volumen de la música (0.0 a 1.0)

const playBtn = document.getElementById("playBtn");
const header = document.querySelector(".titulo"); // cabecera con el título
const heartsContainer = document.getElementById("hearts");

// Mostrar la página actual y ocultar el título en las demás
function mostrarPaginaIndex(index) {
  pages.forEach((p, i) => p.classList.toggle("active", i === index));
  current = index;

  // Mostrar header solo en la primera página
  if (header) {
    header.style.display = index === 0 ? "" : "none";
  }
}

// Inicializa mostrando la primera
mostrarPaginaIndex(0);

// Botones Next
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current < pages.length - 1) {
      mostrarPaginaIndex(current + 1);
    }
  });
});

// Botones Back
document.querySelectorAll(".back").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current > 0) {
      mostrarPaginaIndex(current - 1);
    }
  });
});

// Música (se mantiene reproduciendo entre páginas)
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.disabled = true;
    playBtn.textContent = "🎶 Reproduciendo...";
  }
});

// === CORAZONES DE FONDO ===

// Crear corazones cada cierto tiempo
setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 15 + 10 + "px";
  heart.style.opacity = 0.15 + Math.random() * 0.15; // corazones claritos
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}, 500);

// Agregar estilos de animación para los corazones
const style = document.createElement("style");
style.innerHTML = `
  .heart {
    position: fixed;
    top: -20px;
    z-index: 0;
    animation: fall linear forwards;
  }

  @keyframes fall {
    to {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

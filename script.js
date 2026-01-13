// Cambia esta fecha a tu lanzamiento real (YYYY-MM-DDTHH:mm:ss)
// OJO: si no pones zona horaria, el navegador usa la local del usuario.
const launchDate = new Date("2026-02-01T09:00:00");

const $ = (id) => document.getElementById(id);

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = launchDate.getTime() - now.getTime();

  if (diff < 0) diff = 0;

  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / (3600 * 24));
  const hours = Math.floor((s % (3600 * 24)) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  $("dd").textContent = String(days);
  $("hh").textContent = pad(hours);
  $("mm").textContent = pad(mins);
  $("ss").textContent = pad(secs);
}

tick();
setInterval(tick, 1000);

$("year").textContent = String(new Date().getFullYear());

// Simulación de "registro" (sin backend)
const form = $("notifyForm");
const msg = $("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("email").value.trim();

  // Validación mínima
  if (!email.includes("@") || !email.includes(".")) {
    msg.textContent = "Por favor ingresa un correo válido.";
    return;
  }

  // Aquí podrías integrar un servicio real (Mailchimp, Brevo, etc.)
  msg.textContent = `¡Listo! Te avisaremos a ${email} cuando lancemos.`;
  form.reset();
});

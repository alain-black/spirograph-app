const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const outerRadiusInput = document.getElementById('outerRadius');
const innerRadiusInput = document.getElementById('innerRadius');
const penPositionInput = document.getElementById('penPosition');
const drawButton = document.getElementById('drawButton');

// Set canvas size to fit browser height and make it a square
function resizeCanvas() {
  const size = window.innerHeight;
  canvas.width = size;
  canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawSpirographAnimated(R, r, p) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  let t = 0;

  ctx.lineWidth = 1;

  function drawFrame() {
    if (t >= Math.PI * 2 * r / gcd(R, r)) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circles for visual guidance
    ctx.strokeStyle = "gray";
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2); // Outer circle
    ctx.stroke();
    ctx.beginPath();
    const innerX = cx + (R - r) * Math.cos(t);
    const innerY = cy + (R - r) * Math.sin(t);
    ctx.arc(innerX, innerY, r, 0, Math.PI * 2); // Inner circle
    ctx.stroke();

    // Draw guiding lines
    const penX = innerX + p * r * Math.cos(((R - r) / r) * t);
    const penY = innerY - p * r * Math.sin(((R - r) / r) * t);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(innerX, innerY);
    ctx.lineTo(penX, penY);
    ctx.stroke();

    // Draw the spirograph
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    for (let i = 0; i <= t; i += 0.01) {
      const x = cx + (R - r) * Math.cos(i) + p * r * Math.cos(((R - r) / r) * i);
      const y = cy + (R - r) * Math.sin(i) - p * r * Math.sin(((R - r) / r) * i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    t += 0.02;
    requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

drawButton.addEventListener('click', () => {
  const R = parseFloat(outerRadiusInput.value);
  const r = parseFloat(innerRadiusInput.value);
  const p = parseFloat(penPositionInput.value);
  drawSpirographAnimated(R, r, p);
});

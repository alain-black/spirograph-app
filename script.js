const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const outerRadiusInput = document.getElementById('outerRadius');
const innerRadiusInput = document.getElementById('innerRadius');
const penPositionInput = document.getElementById('penPosition');
const drawButton = document.getElementById('drawButton');

function drawSpirograph(R, r, p) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 1;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let t = 0; t < Math.PI * 2 * r / gcd(R, r); t += 0.01) {
    const x = cx + (R - r) * Math.cos(t) + p * r * Math.cos(((R - r) / r) * t);
    const y = cy + (R - r) * Math.sin(t) - p * r * Math.sin(((R - r) / r) * t);
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

drawButton.addEventListener('click', () => {
  const R = parseFloat(outerRadiusInput.value);
  const r = parseFloat(innerRadiusInput.value);
  const p = parseFloat(penPositionInput.value);
  drawSpirograph(R, r, p);
});

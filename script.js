// 初期設定
const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const outerRadiusInput = document.getElementById('outerRadius');
const innerRadiusInput = document.getElementById('innerRadius');
const penPositionInput = document.getElementById('penPosition');

// キャンバスサイズをブラウザの高さに基づいた正方形に設定
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
  drawSpirograph(); // リサイズ時に再描画
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// スピログラフを描画する関数
function drawSpirograph() {
  const R = parseFloat(outerRadiusInput.value);
  const r = parseFloat(innerRadiusInput.value);
  const p = parseFloat(penPositionInput.value);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // 描画範囲
  ctx.strokeStyle = "gray";

  // 外側の円
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  // 内側の円
  const innerX = cx + (R - r);
  const innerY = cy;
  ctx.beginPath();
  ctx.arc(innerX, innerY, r, 0, Math.PI * 2);
  ctx.stroke();

  // ペンの位置
  const penX = innerX + p * r;
  const penY = innerY;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(innerX, innerY);
  ctx.lineTo(penX, penY);
  ctx.stroke();

  // スピログラフ本体
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  for (let t = 0; t <= Math.PI * 2 * r / gcd(R, r); t += 0.01) {
    const x = cx + (R - r) * Math.cos(t) + p * r * Math.cos(((R - r) / r) * t);
    const y = cy + (R - r) * Math.sin(t) - p * r * Math.sin(((R - r) / r) * t);
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// 最大公約数を求める関数
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 各スライダーの変更時に再描画
outerRadiusInput.addEventListener('input', drawSpirograph);
innerRadiusInput.addEventListener('input', drawSpirograph);
penPositionInput.addEventListener('input', drawSpirograph);

// 初回描画
drawSpirograph();

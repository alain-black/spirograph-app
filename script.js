// 初期設定
const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const outerRadiusInput = document.getElementById('outerRadius');
const innerRadiusInput = document.getElementById('innerRadius');
const penPositionInput = document.getElementById('penPosition');
const drawButton = document.getElementById('drawButton');

let animationFrameId = null; // アニメーション用のID

// キャンバスサイズをブラウザの高さに基づいた正方形に設定
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// スピログラフを描画する関数（アニメーション付き）
function drawSpirographAnimated(R, r, p) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  let t = 0;

  ctx.lineWidth = 1;

  function drawFrame() {
    if (t >= Math.PI * 2 * r / gcd(R, r)) {
      cancelAnimationFrame(animationFrameId);
      return; // 描画終了
    }

    // 全体クリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 外側の円
    ctx.strokeStyle = "gray";
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    // 内側の円
    const innerX = cx + (R - r) * Math.cos(t);
    const innerY = cy + (R - r) * Math.sin(t);
    ctx.beginPath();
    ctx.arc(innerX, innerY, r, 0, Math.PI * 2);
    ctx.stroke();

    // ペンの位置
    const penX = innerX + p * r * Math.cos(((R - r) / r) * t);
    const penY = innerY - p * r * Math.sin(((R - r) / r) * t);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(innerX, innerY);
    ctx.lineTo(penX, penY);
    ctx.stroke();

    // スピログラフの描画
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
    animationFrameId = requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

// 最大公約数を求める関数
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 描画ボタンを押したときの挙動
drawButton.addEventListener('click', () => {
  // アニメーション中断（再描画時にクリア）
  cancelAnimationFrame(animationFrameId);

  const R = parseFloat(outerRadiusInput.value);
  const r = parseFloat(innerRadiusInput.value);
  const p = parseFloat(penPositionInput.value);

  drawSpirographAnimated(R, r, p);
});

// 初期状態では描画なし
ctx.clearRect(0, 0, canvas.width, canvas.height);

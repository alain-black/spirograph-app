// 初期設定
const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const outerRadiusInput = document.getElementById('outerRadius');
const innerRadiusInput = document.getElementById('innerRadius');
const penPositionInput = document.getElementById('penPosition');
const drawButton = document.getElementById('drawButton');
const drawSpeedInput = document.getElementById('drawSpeed');


let drawSpeed = parseFloat(drawSpeedInput.value);
let animationFrameId = null; // アニメーション用のID

// キャンバスサイズをブラウザの高さに基づいた正方形に設定
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// スピログラフを描画する関数（静的表示）
function drawSpirographStatic(R, r, p) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // 外側の円
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  // 内側の円
  const innerX = cx + (R - r) * Math.cos(0);
  const innerY = cy + (R - r) * Math.sin(0);
  ctx.beginPath();
  ctx.arc(innerX, innerY, r, 0, Math.PI * 2);
  ctx.stroke();

  // ペンの位置
  const penX = innerX + p * r * Math.cos(0);
  const penY = innerY - p * r * Math.sin(0);
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(innerX, innerY);
  ctx.lineTo(penX, penY);
  ctx.stroke();
}

// スピログラフを描画する関数（アニメーション付き）
function drawSpirographAnimated(R, r, p) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  let t = 0;

  // スピログラフ全体を保持するための配列
  const points = [];

  // 外円と内円を描画（最初のフレームでのみ）
  function drawStaticElements() {
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
  }

  // 描画フレーム
  function drawFrame() {
    if (t >= Math.PI * 2 * r / gcd(R, r)) {
      cancelAnimationFrame(animationFrameId);
      return; // 描画終了
    }

    // クリア & 静的要素描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStaticElements();

    // ペンの現在位置を計算
    const x = cx + (R - r) * Math.cos(t) + p * r * Math.cos(((R - r) / r) * t);
    const y = cy + (R - r) * Math.sin(t) - p * r * Math.sin(((R - r) / r) * t);

    // 新しい点を追加
    points.push({ x, y });

    // スピログラフの線を描画
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // 時間を進める
    t += drawSpeed;
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

// 初期状態で静的なスピログラフを表示
drawSpirographStatic(
  parseFloat(outerRadiusInput.value),
  parseFloat(innerRadiusInput.value),
  parseFloat(penPositionInput.value)
);


drawSpeedInput.addEventListener('input', () => {
  drawSpeed = parseFloat(drawSpeedInput.value);
});



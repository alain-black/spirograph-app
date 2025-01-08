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

// 歯車を描画する関数
function drawGear(cx, cy, radius, teethCount, angleOffset, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  ctx.beginPath();
  for (let i = 0; i < teethCount; i++) {
    const angle1 = (i / teethCount) * Math.PI * 2 + angleOffset;
    const angle2 = ((i + 0.5) / teethCount) * Math.PI * 2 + angleOffset;

    const x1 = cx + radius * Math.cos(angle1);
    const y1 = cy + radius * Math.sin(angle1);
    const x2 = cx + (radius + 5) * Math.cos(angle2);
    const y2 = cy + (radius + 5) * Math.sin(angle2);

    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.closePath();
  ctx.stroke();
}

// 歯車付きのスピログラフを描画する関数
function drawSpirographWithGears(R, r, p) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const teethCountOuter = Math.ceil(R / 10); // 外歯車の歯の数
  const teethCountInner = Math.ceil(r / 5); // 内歯車の歯の数
  let t = 0;
  const points = [];

  function drawFrame() {
    if (t >= Math.PI * 2 * r / gcd(R, r)) {
      cancelAnimationFrame(animationFrameId);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 外歯車
    drawGear(cx, cy, R, teethCountOuter, 0, "gray");

    // 内歯車の中心位置
    const innerX = cx + (R - r) * Math.cos(t);
    const innerY = cy + (R - r) * Math.sin(t);
    const angleOffset = -((R - r) / r) * t;

    // 内歯車
    drawGear(innerX, innerY, r, teethCountInner, angleOffset, "black");

    // ペンの現在位置を計算
    const penX = innerX + p * r * Math.cos(angleOffset);
    const penY = innerY + p * r * Math.sin(angleOffset);

    // スピログラフの線を描画
    points.push({ x: penX, y: penY });
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


// 描画ボタンのイベントリスナーを更新
drawButton.addEventListener('click', () => {
  cancelAnimationFrame(animationFrameId);

  const R = parseFloat(outerRadiusInput.value);
  const r = parseFloat(innerRadiusInput.value);
  const p = parseFloat(penPositionInput.value);

  drawSpirographWithGears(R, r, p);
});


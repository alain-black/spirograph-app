// HTML, CSS, and script integration is assumed.
const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const innerRadiusInput = document.getElementById('innerRadius');
const outerRadiusInput = document.getElementById('outerRadius');
const innerPenPositionInput = document.getElementById('innerPenPosition');
const outerPenPositionInput = document.getElementById('outerPenPosition');
const drawButton = document.getElementById('drawButton');

// キャンバスサイズを調整
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 最大公約数を計算する関数
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// スピログラフ描画
function drawSpirograph(innerR, outerR, innerP, outerP) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  const cx = canvas.width / 2; // キャンバスの中心X
  const cy = canvas.height / 2; // キャンバスの中心Y
  const lcm = Math.PI * 2 * innerR / gcd(innerR, outerR); // 一周分の角度計算

  for (let t = 0; t <= lcm; t += 0.01) {
    const x = cx + (outerR - innerR) * Math.cos(t) + innerP * innerR * Math.cos((outerR - innerR) / innerR * t);
    const y = cy + (outerR - innerR) * Math.sin(t) - innerP * innerR * Math.sin((outerR - innerR) / innerR * t);
    
    if (t === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// 描画ボタンのイベントリスナー
drawButton.addEventListener('click', () => {
  const innerR = parseFloat(innerRadiusInput.value);
  const outerR = parseFloat(outerRadiusInput.value);
  const innerP = parseFloat(innerPenPositionInput.value);
  const outerP = parseFloat(outerPenPositionInput.value);

  drawSpirograph(innerR, outerR, innerP, outerP);
});

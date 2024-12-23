const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const innerRadiusInput = document.getElementById('innerRadius');
const outerRadiusInput = document.getElementById('outerRadius');
const innerPenPositionInput = document.getElementById('innerPenPosition');
const outerPenPositionInput = document.getElementById('outerPenPosition');
const drawButton = document.getElementById('drawButton');

let animationFrameId = null;

// キャンバスサイズを調整
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// スピログラフ描画
function drawSpirographAnimated(innerR, outerR, innerP, outerP) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  let t = 0;

  function drawFrame() {
    if (t >= Math.PI * 2 * innerR / gcd(outerR, innerR)) {
      cancelAnimationFrame(animationFrameId);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 描画範囲の中心点
    const drawCenterX = cx;
    const drawCenterY = cy;

    // 内側の円
    const innerX = drawCenterX + (outerR - innerR) * Math.cos(t);
    const innerY = drawCenterY + (outerR - innerR) * Math.sin(t);

    ctx.strokeStyle = "red";

    //

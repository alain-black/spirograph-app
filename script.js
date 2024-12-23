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

// スピログラフの描画
function drawSpirograph(innerR, outerR, innerP, outerP) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2; // キャンバスの中心X座標
  const cy = canvas.height / 2; // キャンバスの中心Y座標
  let t = 0; // 描画の進行角度

  function animate() {
    // 終了条件：描画が一周したら停止
    if (t > Math.PI * 2 * innerR / gcd(innerR, outerR)) {
      return;
    }

    // 内側の円の中心位置を計算
    const innerX = cx + (outerR - innerR) * Math.cos(t);
    const innerY = cy + (outerR - innerR) * Math.sin(t);

    // ペンの位置を計算
    const penX =
      innerX +
      innerP * innerR * Math.cos(((outerR - innerR) / innerR) * t);
    const penY =
      innerY -
      innerP * innerR * Math.sin(((outerR - innerR) / innerR) * t);

    // 描画処理
    if (t === 0) {
      ctx.beginPath();
      ctx.moveTo(penX, penY);
    } else {
      ctx.lineTo(penX, penY);
    }
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();

    t += 0.02; // 描画速度調整
    requestAnimationFrame(animate);
  }

  animate();
}

// 描画ボタンのクリックイベント
drawButton.addEventListener('click', () => {
  const innerR = parseFloat(innerRadiusInput.value);
  const outerR = parseFloat(outerRadiusInput.value);
  const innerP = parseFloat(innerPenPositionInput.value);
  const outerP = parseFloat(outerPenPositionInput.value);

  drawSpirograph(innerR, outerR, innerP, outerP);
});

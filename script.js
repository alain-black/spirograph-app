const canvas = document.getElementById('spiroCanvas');
const ctx = canvas.getContext('2d');
const innerRadiusInput = document.getElementById('innerRadius');
const outerRadiusInput = document.getElementById('outerRadius');
const innerPenPositionInput = document.getElementById('innerPenPosition');
const drawButton = document.getElementById('drawButton');

// キャンバスサイズを調整
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// スピログラフの描画
function drawSpirograph(innerR, outerR, penPos) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2; // キャンバスの中心X座標
  const cy = canvas.height / 2; // キャンバスの中心Y座標
  let t = 0; // 描画の進行角度

  // 最大公約数を利用してスピログラフの完全な描画範囲を決定
  const totalSteps = Math.PI * 2 * innerR / gcd(innerR, outerR);

  ctx.beginPath();

  function animate() {
    // 終了条件: 描画が一周したら停止
    if (t > totalSteps) {
      ctx.stroke();
      return;
    }

    // 内側の円の中心位置を計算
    const innerX = cx + (outerR - innerR) * Math.cos(t);
    const innerY = cy + (outerR - innerR) * Math.sin(t);

    // ペンの位置を計算
    const penX =
      innerX +
      penPos * innerR * Math.cos((outerR - innerR) / innerR * t);
    const penY =
      innerY -
      penPos * innerR * Math.sin((outerR - innerR) / innerR * t);

    if (t === 0) {
      ctx.moveTo(penX, penY);
    } else {
      ctx.lineTo(penX, penY);
    }

    t += 0.02; // 描画速度調整
    requestAnimationFrame(animate);
  }

  animate();
}

// 最大公約数を計算する関数
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 描画ボタンのクリックイベント
drawButton.addEventListener('click', () => {
  const innerR = parseFloat(innerRadiusInput.value);
  const outerR = parseFloat(outerRadiusInput.value);
  const penPos = parseFloat(innerPenPositionInput.value);

  drawSpirograph(innerR, outerR, penPos);
});

function drawGearAnimation(innerR, outerR, innerP, outerP) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2; // キャンバスの中心
  const cy = canvas.height / 2;

  let t = 0; // 時間の進行

  function animate() {
    // 内側と外側の円の中心座標
    const innerX = cx + (outerR - innerR) * Math.cos(t);
    const innerY = cy + (outerR - innerR) * Math.sin(t);

    // ペンの位置
    const penX =
      innerX +
      innerP * innerR * Math.cos(((outerR - innerR) / innerR) * t);
    const penY =
      innerY -
      innerP * innerR * Math.sin(((outerR - innerR) / innerR) * t);

    // 描画の更新
    if (t === 0) {
      ctx.beginPath();
      ctx.moveTo(penX, penY);
    } else {
      ctx.lineTo(penX, penY);
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 歯車の描画
    ctx.beginPath();
    ctx.arc(innerX, innerY, innerR, 0, Math.PI * 2);
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // 次のフレーム
    t += 0.02; // 回転速度
    if (t <= Math.PI * 2 * innerR / gcd(innerR, outerR)) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

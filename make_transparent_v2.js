const sharp = require('sharp');
const path = require('path');

async function processImage(inputPath, outputPath) {
  try {
    const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    
    // 왼쪽 위 픽셀 색상 가져오기 (배경색이라고 간주)
    let bgR = data[0];
    let bgG = data[1];
    let bgB = data[2];

    // 만약 이미지가 투명하다면, 배경색을 흰색이나 회색으로 유추
    if(bgR === undefined) { bgR = 255; bgG = 255; bgB = 255; }

    const tolerance = 40; 

    // 모든 픽셀을 순회하면서 배경색과 가까운 색을 투명하게 처리합니다.
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];

      const dist = Math.sqrt(
        Math.pow(r - bgR, 2) + 
        Math.pow(g - bgG, 2) + 
        Math.pow(b - bgB, 2)
      );

      // 배경색과 설정한 오차보다 작으면 픽셀 투명화
      if (dist < tolerance) {
        data[i+3] = 0; // alpha를 0으로
      } else if (dist < tolerance + 30) {
        // 가장자리가 회색으로 남지 않도록 그라데이션 값을 주어 부드럽게 (안티앨리어싱 역할)
        data[i+3] = Math.floor(255 * ((dist - tolerance) / 30));
      }
    }

    await sharp(data, { raw: { width, height, channels } })
      .png()
      .toFile(outputPath);
      
    console.log(`Processed successfully: ${outputPath}`);
  } catch (error) {
    console.error("Error processing " + inputPath, error);
  }
}

async function run() {
  const backupDir = path.join(__dirname, 'public', 'images', 'backup_transparent');
  const publicImagesDir = path.join(__dirname, 'public', 'images');

  await processImage(path.join(backupDir, 'band.png'), path.join(publicImagesDir, 'band.png'));
  await processImage(path.join(backupDir, 'youtube.png'), path.join(publicImagesDir, 'youtube.png'));

}

run();

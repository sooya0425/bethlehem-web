const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function removeWhiteBackground(inputPath, outputPath) {
  try {
    const minDiff = 20;
    
    // threshold 값을 조정하여 흰색(또는 밝은 회색) 배경을 투명하게 처리합니다.
    await sharp(inputPath)
      .ensureAlpha()
      // 흰색 배경(255, 255, 255 근방)에 대한 알파 채널 변환 처리
      // 이 예지에서는 flatten + trim 등 여러 방법 중 단순히 가장 밝은 백그라운드 색을 alpha 채널로 교체하는 형태를 취하거나, 
      // 보다 정확하게는 픽셀 매니퓰레이션을 위해 raw 데이터를 조작합니다.
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { width, height, channels } = info;
        // channels should be 4 (RGBA) since ensureAlpha()
        for (let i = 0; i < data.length; i += channels) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          // 만약 픽셀이 거의 흰색이라면 (예: 240 이상)
          if (r > 240 && g > 240 && b > 240) {
            data[i+3] = 0; // alpha를 0 (투명)으로 설정
          } else if (r > 200 && g > 200 && b > 200) {
             // 테두리 부분 안티앨리어싱 부드럽게 처리
             data[i+3] = Math.max(0, 255 - (r - 200) * 4);
          }
        }
        
        return sharp(data, {
          raw: { width, height, channels }
        })
        .png()
        .toFile(outputPath);
      });
      
      console.log(`Processed: ${outputPath}`);
  } catch(e) {
    console.error(`Error processing ${inputPath}:`, e);
  }
}

async function processImages() {
  const publicImagesDir = path.join(__dirname, 'public', 'images');
  
  // Create backup dir
  const backupDir = path.join(__dirname, 'public', 'images', 'backup_transparent');
  if(!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
  }

  const bandInput = path.join(publicImagesDir, 'band.png');
  const bandOutput = path.join(publicImagesDir, 'band.png');

  const youtubeInput = path.join(publicImagesDir, 'youtube.png');
  const youtubeOutput = path.join(publicImagesDir, 'youtube.png');

  // 백업
  fs.copyFileSync(bandInput, path.join(backupDir, 'band.png'));
  fs.copyFileSync(youtubeInput, path.join(backupDir, 'youtube.png'));

  await removeWhiteBackground(path.join(backupDir, 'band.png'), bandOutput);
  await removeWhiteBackground(path.join(backupDir, 'youtube.png'), youtubeOutput);
}

processImages();

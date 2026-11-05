document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('qr-form');
  const urlInput = document.getElementById('url-input');
  const resultArea = document.getElementById('result-area');
  const qrcodeContainer = document.getElementById('qrcode');
  const qrText = document.getElementById('qr-text');
  const downloadBtn = document.getElementById('download-btn');
  const resetBtn = document.getElementById('reset-btn');

  let qrCodeInstance = null;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = urlInput.value.trim();
    if (!text) return;

    // 기존 생성된 QR 코드 제거
    qrcodeContainer.innerHTML = '';

    // QR 코드 새로 생성
    qrCodeInstance = new QRCode(qrcodeContainer, {
      text: text,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });

    qrText.textContent = text;
    resultArea.classList.remove('hidden');
  });

  // 이미지 다운로드
  downloadBtn.addEventListener('click', () => {
    // qrcode.js는 내부적으로 img 또는 canvas를 생성합니다.
    const img = qrcodeContainer.querySelector('img');
    const canvas = qrcodeContainer.querySelector('canvas');

    let downloadUrl = '';
    if (img && img.src && img.src.startsWith('data:image')) {
      downloadUrl = img.src;
    } else if (canvas) {
      downloadUrl = canvas.toDataURL('image/png');
    }

    if (!downloadUrl) {
      alert('QR 코드를 다운로드할 수 없습니다.');
      return;
    }

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // 리셋
  resetBtn.addEventListener('click', () => {
    urlInput.value = '';
    qrcodeContainer.innerHTML = '';
    qrText.textContent = '';
    resultArea.classList.add('hidden');
    urlInput.focus();
  });
});


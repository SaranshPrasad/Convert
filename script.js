const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('preview-image');
const canvas = document.getElementById('canvas');
const convertButton = document.getElementById('convertButton');
const output = document.getElementById('output');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  previewImage.src = URL.createObjectURL(file);
});

convertButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    output.textContent = 'Please select a file.';
    return;
  }
  if (file.type !== 'image/jpeg') {
    output.textContent = 'Please select a JPG file.';
    return;
  }

  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    const pngFile = dataUrlToFile(dataUrl, file.name);
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pngFile);
    downloadLink.download = pngFile.name;
    downloadLink.click();
    output.textContent = 'Conversion complete. Downloading PNG file.';
  };
  img.src = URL.createObjectURL(file);
});

function dataUrlToFile(dataUrl, fileName) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type: mime});
}

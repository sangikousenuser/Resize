const imageInput = document.getElementById("imageInput");
const resizeButton = document.getElementById("resizeButton");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let originalImage = new Image();
let originalAspectRatio = 0;

// 画像選択時に読み込み
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// 画像がロードされたら描画
originalImage.onload = () => {
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  originalAspectRatio = originalImage.width / originalImage.height;
  ctx.drawImage(originalImage, 0, 0);
};

// リサイズボタンをクリック
resizeButton.addEventListener("click", () => {
  const newWidth = parseInt(widthInput.value);
  const newHeight = parseInt(heightInput.value);

  if (isNaN(newWidth) || newWidth <= 0 || isNaN(newHeight) || newHeight <= 0) {
    alert("幅と高さを正しく入力してください！");
    return;
  }

  const newAspectRatio = newWidth / newHeight;
  
  // アスペクト比の変化を確認
  if (Math.abs(newAspectRatio - originalAspectRatio) > 0.01) {
    if (!confirm("アスペクト比が変わります。このまま続けますか？")) {
      return;
    }
  }

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
});

const imageInput = document.getElementById("imageInput");
const resizeButton = document.getElementById("resizeButton");
const widthInput = document.getElementById("width");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let originalImage = new Image();

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

originalImage.onload = () => {
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.drawImage(originalImage, 0, 0);
};

resizeButton.addEventListener("click", () => {
  const newWidth = parseInt(widthInput.value);
  if (isNaN(newWidth) || newWidth <= 0) {
    alert("幅を正しく入力してください！");
    return;
  }

  const scale = newWidth / originalImage.width;
  const newHeight = originalImage.height * scale;

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
});

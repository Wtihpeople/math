let images = [
    "https://raw.githubusercontent.com/yourusername/repositoryname/main/image1.jpg",
    "https://raw.githubusercontent.com/yourusername/repositoryname/main/image2.jpg",
    "https://raw.githubusercontent.com/yourusername/repositoryname/main/image3.jpg"
]; // GitHub에 업로드한 이미지 URL

let index = 0;

// 📌 페이지가 열리면 첫 번째 이미지 자동 표시
window.onload = function() {
    showImage(0);
};

function showImage(idx) {
    let slider = document.getElementById("slider");
    slider.src = images[idx];
    slider.style.display = "block";
}

// 📌 다음 이미지로 이동
function next() {
    index = (index + 1) % images.length;
    showImage(index);
}

// 📌 이전 이미지로 이동
function prev() {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
}

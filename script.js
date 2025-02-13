let images = [
    "https://raw.githubusercontent.com/yourusername/repositoryname/main/image1.jpg",
    "https://raw.githubusercontent.com/yourusername/repositoryname/main/image2.jpg",
    "https://raw.githubusercontent.com/yourusername/repositoryname/main/image3.jpg"
]; // GitHub에 업로드한 이미지 URL

let index = 0;
let slider = document.getElementById("slider");

// 📌 페이지가 열리면 첫 번째 이미지 표시 & 자동 슬라이드 시작
window.onload = function() {
    showImage(0);
    setInterval(next, 3000); // 3초마다 자동 변경
};

function showImage(idx) {
    slider.style.opacity = "0"; // 페이드 아웃 효과
    setTimeout(() => {
        slider.src = images[idx];
        slider.style.opacity = "1"; // 페이드 인 효과
    }, 500);
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

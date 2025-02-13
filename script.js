let images = [];
let index = 0;

document.getElementById("fileInput").addEventListener("change", function(event) {
    let files = event.target.files;
    if (files.length > 0) {
        images = [];
        index = 0;

        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.onload = function(e) {
                images.push(e.target.result);
                if (images.length === 1) {
                    showImage(0);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    }
});

function showImage(idx) {
    let slider = document.getElementById("slider");
    if (images.length > 0) {
        slider.src = images[idx];
        slider.style.display = "block";
    }
}

function next() {
    if (images.length > 0) {
        index = (index + 1) % images.length;
        showImage(index);
    }
}

function prev() {
    if (images.length > 0) {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
    }
}

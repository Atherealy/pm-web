
const images = [
    'i3 (3).webp', 'i.webp', 'i (1).webp', 'no.jpg'
];

let activeImage = 0;
let flag = true; // Initialize flag
const sliderPlace = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').clientWidth;
sliderPlace.style.width = 3 * widthOffset + 'px';
sliderPlace.style.height = widthOffset + 'px';
sliderPlace.style.left = '-' + widthOffset + 'px';

const initSlider = () => {
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[activeImage];
    sliderPlace.append(img); 
    nextImageGen();
    prevImageGen();
};

const nextImageGen = () => {
    let nextImage = (activeImage + 1) % images.length;
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[nextImage];
    sliderPlace.append(img); 
};

const prevImageGen = (w = false) => {
    let prevImage = (activeImage - 1 + images.length) % images.length;
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[prevImage];
    if (w) img.style.width = '0';
    sliderPlace.prepend(img); 
};

const animation = ({duration, draw, removeElement}) => {
    const start = performance.now();
    
    requestAnimationFrame(function animate(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);

        draw(progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            removeElement.remove();
            flag = true; // Reset the flag once the animation is done
        }
    });
};

const nextSlide = () => {
    if (!flag) return; // Prevent rapid clicks
    flag = false;
    activeImage = (activeImage + 1) % images.length;

    // Animate the current image out and new image in
    const currentImage = sliderPlace.querySelector('img');
    
    animation({
        duration: 1000,
        draw: function(progress) {
            currentImage.style.width = (widthOffset * (1 - progress)) + 'px';
        },
        removeElement: currentImage
    });

    nextImageGen();
};

// Event listeners for next/prev buttons would go here
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide); // Assume prevSlide is implemented similarly
initSlider();
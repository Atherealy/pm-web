const images = [
    'i (3).webp', 'i.webp', 'i (1).webp', 'i (4).webp', 'i (5).webp'
];

let activeImage = 0;
const intervalTime = 3000;
const sliderPlace = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').clientWidth;
sliderPlace.style.width = 3 * widthOffset + 'px';
sliderPlace.style.height = widthOffset + 'px';
sliderPlace.style.left = '-' +widthOffset + 'px';

let flag = true;

const initSlider = () => {
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[activeImage];
    sliderPlace.append(img); 
    nextImageGen();
    prevImageGen();
}

const nextImageGen = () => {
    let nextImage = activeImage + 1;
    if (nextImage >= images.length) nextImage = 0;
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[nextImage];
    sliderPlace.append(img); 
}

const prevImageGen = (w = false) => {
    let prevImage = activeImage - 1;
    if (prevImage < 0) prevImage = images.length - 1;
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[prevImage];
    if (w) img.style.width = 0;
    sliderPlace.prepend(img); 
}

const nextSlide = () => {
    if(!flag) return;
    flag = !flag;
    activeImage++;
    if (activeImage >= images.length) activeImage = 0;
    nextImageGen(true);
    animation ({
        duration : 1000,
        draw : function(progress){
            document.querySelector('.slider-line img').style.width = (widthOffset*(1-progress)) + 'px'
        },
        removeElement : document.querySelector('.slider-line img')
    });
}

const prevSlide = () => {
    if(!flag) return;
    flag = !flag;
    activeImage--;
    if (activeImage < 0) activeImage = images.length - 1;
    prevImageGen(true);
    animation ({
        duration : 1000,
        draw : function(progress){
            document.querySelector('.slider-line img').style.width = (widthOffset*progress) + 'px'
        },
        removeElement : document.querySelector('.slider-line img:last-child')
    })
}

initSlider();

document.querySelector('.next-button').addEventListener('click', nextSlide);
document.querySelector('.prev-button').addEventListener('click', prevSlide);

const animation = ({duration, draw, removeElement}) => {
    let startTime = performance.now();

    requestAnimationFrame(function animate(time){
        let step = (time - startTime)  / duration;
            if (step > 1) step = 1;
            draw(step);
            if (step < 1){
                requestAnimationFrame(animate);
            }
            else{
                removeElement.remove();
                flag = true;
            }
    })
}
let autoSlide = setInterval(nextSlide, intervalTime);
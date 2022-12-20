"use strict";

const slider = document.querySelector('._slider');
const slides = Array.from(document.querySelectorAll('._slider__item'));
const btnRight = document.querySelector('._slider__button--right');
const btnLeft = document.querySelector('._slider__button--left');
const dotsList = document.querySelector('._slider__dot-list');
const dot = document.querySelector('._slider__dot');

let visibleSlide = 0; //задаем начальное значение
const slidesNumber = slides.length;

// выстраиваем слайды в линию, задаем смещение на ширину слайда в зависимости от его индекса
const slidesMove = function(slide) {
	slides.forEach((s, index) =>
	(s.style.transform = `translateX(${((index - slide) * 100)}%)`));
};
slidesMove(0); // задаем первый отображаемый слайд

// создаем пагинацию в зависимости от колич слайдов
const createDots = function() {
	slides.forEach(function(_, index) {
		dotsList.insertAdjacentHTML('beforeend',
		`<button class="slider__dot _slider__dot"
		data-slide="${index}"></button>`)
	});
};
createDots();

// упарвление классом '--active' для пагинации
const activateDots = function(slide) {
	document.querySelectorAll('._slider__dot').
	forEach(dot => dot.classList.remove('slider__dot--active'));

	document.querySelector(`._slider__dot[data-slide="${slide}"]`).
	classList.add('slider__dot--active');
}
activateDots(visibleSlide);

// перемещение на след слайд
const nextSlide = function() {
	if (visibleSlide === slidesNumber - 1) {
		visibleSlide = 0;// перемещение к первому слайду, если они закончились
	} else {
		visibleSlide++;
	};
	slidesMove(visibleSlide);
	activateDots(visibleSlide);
};

// перемещение на предыдущий слайд
const prevSlide = function() {
	if (visibleSlide === 0) {
		visibleSlide = slidesNumber - 1;// перемещение к последнему слайду
	} else {
		visibleSlide--;
	};
	slidesMove(visibleSlide);
	activateDots(visibleSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// перемещение кнопками впарво/влево
slider.addEventListener('keydown', function(e) {
	console.log(e);
	if(e.key === 'ArrowRight') nextSlide();
	if(e.key === 'ArrowLeft') prevSlide();
});

// перемещение по клику на пагинации
dotsList.addEventListener('click', function(e) {
	if(e.target.classList.contains('_slider__dot')) {
		const slide = e.target.dataset.slide;
		slidesMove(slide);
		activateDots(slide);
	};
});
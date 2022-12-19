"use strict";

const slider = document.querySelector('._slider');
const slides = Array.from(document.querySelectorAll('._slider__item'));
const btnRight = document.querySelector('._slider__button--right');
const btnLeft = document.querySelector('._slider__button--left');

let visibleSlide = 0;
const slidesNumber = slides.length;

const slidesMove = function(slide) {
	slides.forEach((s, index) => (s.style.transform = `translateX(${((index - slide) * 100)}%)`));
};

slidesMove(0);

btnRight.addEventListener('click', function() {
	if (visibleSlide === slidesNumber - 1) {
		visibleSlide = 0;
	} else {
		visibleSlide++;
	};
	slidesMove(visibleSlide);

	console.log('click');
	console.log(visibleSlide);
});

btnLeft.addEventListener('click', function() {
	if (visibleSlide === 0) {
		visibleSlide = slidesNumber - 1;
	} else {
		visibleSlide--;
	};
	slidesMove(visibleSlide);

	console.log('click');
	console.log(visibleSlide);
});
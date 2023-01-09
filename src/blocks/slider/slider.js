o2.slider = {

	slider: document.querySelector('._slider'),
	slides: Array.from(document.querySelectorAll('._slider__item')),
	btnRight: document.querySelector('._slider__button--right'),
	btnLeft: document.querySelector('._slider__button--left'),
	dotsList: document.querySelector('._slider__dot-list'),
	dot: document.querySelector('._slider__dot'),
	visibleSlide: 0, //задаем начальное значение


	// выстраиваем слайды в линию, задаем смещение на ширину слайда в зависимости от его индекса
	slidesMove(slide) {
		this.slides.forEach((s, index) =>
			(s.style.transform = `translateX(${((index - slide) * 100)}%)`));
	},

	// создаем пагинацию в зависимости от колич слайдов
	createDots() {
		this.slides.forEach(function (_, index) {
			o2.slider.dotsList.insertAdjacentHTML('beforeend',
				`<button onclick="o2.slider.dotsClick(event)" class="slider__dot _slider__dot"
			data-slide="${index}"></button>`)
		});
	},

	// упарвление классом '--active' для пагинации
	activateDots(slide) {
		document.querySelectorAll('._slider__dot').
			forEach(dot => dot.classList.remove('slider__dot--active'));

		document.querySelector(`._slider__dot[data-slide="${slide}"]`).
			classList.add('slider__dot--active');
	},

	// перемещение на след слайд
	nextSlide() {
		if (this.visibleSlide === this.slides.length - 1) {
			this.visibleSlide = 0;// перемещение к первому слайду
		} else {
			this.visibleSlide++;
		};
		this.slidesMove(o2.slider.visibleSlide);
		this.activateDots(o2.slider.visibleSlide);
	},

	// перемещение на предыдущий слайд
	prevSlide() {
		if (this.visibleSlide === 0) {
			this.visibleSlide = this.slides.length - 1;// перемещение к последнему слайду
		} else {
			this.visibleSlide--;
		};
		this.slidesMove(o2.slider.visibleSlide);
		this.activateDots(o2.slider.visibleSlide);
	},

	// перемещение по клику на dots
	dotsClick() {
		if (event.target.classList.contains('_slider__dot')) {
			const slide = +event.target.dataset.slide; // присваиваем значение "slide[index]" пременной и предаем его аргументом след. функциям
			this.slidesMove(slide);
			this.activateDots(slide);
			this.visibleSlide = slide;
		};
	},

	// swipe
	firstTouch: null,
	progressTouch: null,
	x1: null,
	x2: null,

	// определяем начальную точку касания экрана
	touchStart() {
		this.firstTouch = event.changedTouches[0].clientX;
		x1 = this.firstTouch;
		console.log(event);
	},
	// определяем конечную точку свайпа
	touchEnd() {
		this.progressTouch = event.changedTouches[0].clientX;
		x2 = this.progressTouch;
		if (!x1 || !x2) { // если  точек нет -> false
			false
		} else {
			(x2 > x1) ? this.prevSlide()
				: (x2 < x1) ? this.nextSlide()
					: false
		};
		// обнуляем значения переменных
		x1 = null;
		x2 = null;
	},

};
o2.slider.slidesMove(0); // задаем первый отображаемый слайд
o2.slider.createDots(); // создаем dots'ы
o2.slider.activateDots(0); // задаем '--active' первой 'dot'

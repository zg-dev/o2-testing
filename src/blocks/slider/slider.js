o2.slider = {
    visibleSlide: 0,

    // задаем смещение на ширину слайда в зависимости от видимого
    slidesMove(slides, el)
    {
        slides.forEach((s) =>
            (s.style.transform = `translateX(${((0 - el) * 100)}%)`));
    },

    // создаем пагинацию в зависимости от колич слайдов
    createDots()
    {
        const $this = this;
        document.querySelectorAll('._slider').forEach(function(slider)
        {
            let $slides = slider.querySelectorAll('._slider__item');
            let $dotsList = slider.querySelector('._slider__dot-list');
            $slides.forEach(function (_, index) {
                $dotsList.insertAdjacentHTML('beforeend',
                `<button onclick="o2.slider.dotsClick(this)" class="slider__dot _slider__dot"
                data-slide="${index}"></button>`);
            });

            $this.setActiveDot(slider, 0);
        });
    },

    // упарвление классом '--active' для пагинации
    setActiveDot(slider, slide = null)
    {
        let $dots = [...slider.querySelectorAll('._slider__dot')];
        $dots.forEach((dot) => dot.classList.remove('slider__dot--active'));
        slider.querySelector(`._slider__dot[data-slide="${slide}"]`).classList.add('slider__dot--active');
    },

    // перемещение на след слайд
    nextSlide(instance)
    {
        const $slider = instance.closest('._slider');
        let $slides = [...$slider.querySelectorAll('._slider__item')];
        if (this.visibleSlide === $slides.length - 1) {
            this.visibleSlide = 0;// перемещение к первому слайду
        } else {
            this.visibleSlide++;
        };
        this.slidesMove($slides, this.visibleSlide);
        this.setActiveDot($slider, this.visibleSlide);
    },

    // перемещение на предыдущий слайд
    prevSlide(instance)
    {
        const $slider = instance.closest('._slider')
        let $slides = [...$slider.querySelectorAll('._slider__item')];
        if (this.visibleSlide === 0) {
            this.visibleSlide = $slides.length - 1;// перемещение к последнему слайду
        } else {
            this.visibleSlide--;
        };
        this.slidesMove($slides, this.visibleSlide);
        this.setActiveDot($slider, this.visibleSlide);
    },

    // swipe
    firstTouch: null,
    progressTouch: null,
    x1: null,
    x2: null,

    // определяем начальную точку касания экрана
    touchStart(instance)
    {
        const $slider = instance.closest('._slider')
        $slider.firstTouch = event.changedTouches[0].clientX;
        x1 = $slider.firstTouch;
    },

    // определяем конечную точку свайпа
    touchEnd(instance)
    {
        const $slider = instance.closest('._slider')
        $slider.progressTouch = event.changedTouches[0].clientX;
        x2 = $slider.progressTouch;
        if (!x1 || !x2) { // если  точек нет -> false
            false
        } else {
            (x2 > x1) ? this.prevSlide($slider) :
            (x2 < x1) ? this.nextSlide($slider) :
            false
        };
        // обнуляем значения переменных
        x1 = null;
        x2 = null;
    },
}

var ninjaPresentation = window.ninjaPresentation = {};

ninjaPresentation.initialize = function () {
    this.slides = document.getElementsByTagName('ninja-slide');
    this.addIdentifierAndHideAllSlides();
    this.hideAllFragmentsOnPresentation();
    this.setInitialSlide();
    this.addListeners();
};

ninjaPresentation.addIdentifierAndHideAllSlides = function () {
    var iterator,
        slidesCount = this.slides.length;
    for (iterator = 0; iterator < slidesCount; iterator++) {
        this.slides[iterator].id = iterator + 1;
        this.slides[iterator].style.opacity = 0;
    }
};

ninjaPresentation.hideAllFragmentsOnPresentation = function () {
    var iterator,
        fragments = document.getElementsByClassName('fragment');
    for (iterator = 0; iterator < fragments.length; iterator++) {
        fragments[iterator].style.opacity = 0;
    }
};

ninjaPresentation.setInitialSlide = function () {
    this.focusSlide((this.hasSlideOnLocationHash()) ? this.currentSlide() : 1);
};

ninjaPresentation.hasSlideOnLocationHash = function () {
    return !!window.location.hash.substring(window.location.hash.indexOf('#'));
};

ninjaPresentation.focusSlide = function (slideIdentifier) {
    document.getElementById(slideIdentifier).style.opacity = 1;
    window.location.hash = slideIdentifier
};

ninjaPresentation.hideSlide = function(slideIdentifier) {
    document.getElementById(slideIdentifier).style.opacity = 0;
};

ninjaPresentation.currentSlide = function () {
    return window.location.hash.substring(window.location.hash.indexOf('#')+1);
};

ninjaPresentation.addListeners = function() {
    document.onkeydown = function (event) {
        ninjaPresentation.controllNavigation(event);
    };
};

ninjaPresentation.controllNavigation = function (event) {
    switch (event.keyCode) {
        case 32:
        case 39:
            this.nextState();
            break;
        case 37:
            this.previousSlide();
            break;
    }
};

ninjaPresentation.nextState = function () {
    var currentSlide = Number(this.currentSlide());
    if (this.slides[currentSlide - 1].getElementsByClassName('fragment').length == 0) {
        this.nextSlide();
    } else console.log('Show fragment');
};

ninjaPresentation.nextSlide = function () {
    var currentSlide = Number(this.currentSlide());
    try {
        this.hideSlide(currentSlide);
        this.focusSlide(currentSlide + 1);
    } catch (error) {
        console.log('The End');
    };
};

ninjaPresentation.previousSlide = function () {
    var currentSlide = Number(this.currentSlide());
    try {
        this.hideSlide(currentSlide);
        this.focusSlide(currentSlide - 1);
    } catch (error) {
        console.log('The beginning of our journey');
    };
};

Polymer('ninja-presentation', {
    created: function () {
        ninjaPresentation.initialize();
    },
    background: '#BDC3C7',
    font: 'sans-serif',
    align: 'left',
    color: '#34495E'
});

import './fullPage.css';

class FullPage {
    constructor(options) {
        var defaultOptions = {
            element: null,
            duration: "1s"
        }

        this.currentIndex = 0;
        this.options = Object.assign({}, defaultOptions, options);
        this.init();
    }

    init() {
        this.checkOptions().initHtml().bindEvents();
    }

    checkOptions() {
        if (!this.options.element) {
            throw new Error("需要一个元素");
        }

        return this;
    }

    initHtml() {
        this.options.element.style.overflow = "hidden";
        for (var i = 0; i < this.options.element.children.length; i++) {
            this.options.element.children[i].style.transition = `transform 1s ease`;
        }
        return this;
    }

    bindEvents() {
        var that = this;
        this.options.element.addEventListener("wheel", function(el) {
            var tagIndex = el.deltaY > 0 ? that.currentIndex + 1 : that.currentIndex - 1;
            that.gotoSection(tagIndex).then(function() {
                that.currentIndex = tagIndex;
            }, function() {})
        })
    }

    gotoSection(sectionIndex) {
        var that = this;
        return new Promise(function(resolve, reject) {
            console.log(sectionIndex, that.options.element.children.length)
            if (sectionIndex >= that.options.element.children.length) {
                reject();
            } else if (sectionIndex < 0) {
                reject();
            } else {
                for (var i = 0; i < that.options.element.children.length; i++) {
                    that.options.element.children[i].style.transform = `translateY(-${sectionIndex*100}%)`;
                }
                resolve()
            }

        })

    }
}
window.FullPage = FullPage;
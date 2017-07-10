class Scrollbar {
    constructor(options) {
        var defaultOptions = {
            element: null,
            content: null,
            steps: 10 //每次滚轮移动多少像素
        }
        this.options = Object.assign({}, defaultOptions, options);
        this.options.content = this.options.content || this.options.element.children[0];

        this.checkOptions().init()
    }

    checkOptions() {
        if (!this.options.element) {
            throw new Error("无必需参数");
        }
        return this;
    }

    init() {
        this.renderDom();
        this.bindEvents();
    }

    renderDom() {
        var trackbar = this.options.element.querySelector(".trackbar");
        var tracker = document.createElement("div");
        var containerHeight = this.options.element.clientHeight; //可视区域高度；
        var contentHeight = this.options.content.offsetHeight;
        var trackerHeight = containerHeight * containerHeight / contentHeight + "px";


        tracker.setAttribute("style", "width:100%;background-color:#999;height:" + trackerHeight);
        trackbar.appendChild(tracker)

        this.options.trackbar = trackbar; //右侧整个滚动区域
        this.options.tracker = tracker; //右侧滚动条
        this.options.containerHeight = containerHeight;
        this.options.contentHeight = contentHeight;
        this.options.trackerHeight = trackerHeight;
        this.options.ratio = contentHeight / containerHeight;
    }

    bindEvents() {
        var that = this;
        this.options.element.addEventListener("wheel", function(e) {
            var contentHasScroll = parseInt(window.getComputedStyle(that.options.content, "").top);

            var scrollLength = contentHasScroll - e.deltaY / 120 * that.options.steps;
            if (Math.abs(scrollLength) < that.options.contentHeight - that.options.containerHeight && scrollLength < 0) {
                that.options.content.style.top = contentHasScroll - e.deltaY / 120 * that.options.steps + "px";

                that.options.tracker.style.top = -(contentHasScroll - e.deltaY / 120 * that.options.steps) / that.options.ratio + "px";
            }
        })
    }

}
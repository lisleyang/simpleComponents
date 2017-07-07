class Scrollbar {
    constructor(options) {
        var defaultOptions = {
            element: null,
            content: null,
            steps: 10
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
        var contentHeight = this.options.element.children[0].offsetHeight; //可视区域宽度
        var trackerHeight = containerHeight * containerHeight / contentHeight + "px";


        tracker.setAttribute("style", "width:100%;background-color:#999;height:" + trackerHeight);
        trackbar.appendChild(tracker)

        this.options.trackbar = trackbar;
        this.options.tracker = tracker;
        this.options.trackerHeight = trackerHeight;
    }

    bindEvents() {
        var that = this;
        this.options.element.addEventListener("wheel", function(e) {
            var contentHasScroll = parseInt(window.getComputedStyle(that.options.content, "").top);

            that.options.content.style.top = contentHasScroll - e.deltaY / 120 * that.options.steps + "px";

            var distance = that.options.element.children[0].offsetHeight - that.options.element.clientHeight; //内容区域可滚动的距离
            //var distance_bar = that.options.
            /*var distance_bar = parseInt(window.getComputedStyle(that.options.tracker, "").top) + parseInt(window.getComputedStyle(that.options.tracker, "").top) / parseInt(window.getComputedStyle(that.options.content, "").top) * that.options.steps;
            console.log(parseInt(window.getComputedStyle(that.options.tracker, "").top));
            that.options.tracker.style.top = distance_bar;*/
        })
    }

}
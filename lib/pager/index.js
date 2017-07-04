class Pager {
    constructor(options) {
        let defaultOptions = {
            element: null,
            buttonNum: 6,
            currentPage: 1,
            totalPage: 1,
            pageChange: function(pageIndex) {
                console.log(pageIndex);
            }
        }

        this.options = Object.assign({}, defaultOptions, options);
        this.domRefs = {};
        this.init();
    }

    init() {
        this.checkOptions().renderHTML().bindEvents();
    }

    checkOptions() {
        if (!this.options.element) {
            throw new Error("element is Required");
        }
        return this;
    }

    renderHTML() {
        let pager = document.createElement("ul");
        this.domRefs.pager = pager;
        pager.className = "pageList"

        this.domRefs.first = document.createElement("li");
        this.domRefs.first.innerHTML = "首页";
        this.domRefs.first.className = "pagefirst";

        this.domRefs.last = document.createElement("li");
        this.domRefs.last.innerHTML = "尾页";
        this.domRefs.last.className = "pagelast";

        this.domRefs.prev = document.createElement("li");
        this.domRefs.prev.innerHTML = "上一页";
        this.domRefs.prev.className = "pageprev";

        this.domRefs.next = document.createElement("li");
        this.domRefs.next.innerHTML = "下一页";
        this.domRefs.next.className = "pagenext";

        this.domRefs.nums = this.createNumbers();

        pager.appendChild(this.domRefs.first);
        pager.appendChild(this.domRefs.prev);
        pager.appendChild(this.domRefs.nums);
        pager.appendChild(this.domRefs.next);
        pager.appendChild(this.domRefs.last);

        this.options.element.appendChild(pager);

        return this;
    }

    createNumbers() {
        var oLi = document.createElement("li");
        oLi.setAttribute('class', 'pageNums');
        var oOl = document.createElement("ol");
        let start = Math.max(this.options.currentPage - (this.options.buttonNum / 2), 1);
        let end = Math.min(this.options.currentPage + (this.options.buttonNum / 2), this.options.totalPage);

        for (let i = start; i <= end; i++) {
            let ele = document.createElement("li");
            ele.setAttribute('pageIndex', i);
            ele.innerHTML = i;
            oOl.appendChild(ele);
        }
        oLi.appendChild(oOl);

        return oLi;
    }

    bindEvents() {
        var that = this;
        this.domRefs.first.addEventListener("click", function(e) {
            that.gotoPage(1);
        })
        this.domRefs.last.addEventListener("click", function(e) {
            that.gotoPage(that.options.totalPage);
        })
        this.domRefs.prev.addEventListener("click", function(e) {
            that.gotoPage(that.options.currentPage - 1);
        })
        this.domRefs.next.addEventListener("click", function(e) {
            that.gotoPage(that.options.currentPage + 1);
        })

        this.domRefs.pager.addEventListener('click', function(e) {
            e.target.getAttribute("pageIndex") && that.gotoPage(Number(e.target.getAttribute("pageIndex")));
        })
    }

    gotoPage(pageIndex) {
        this.options.pageChange(pageIndex);

        //重新渲染页数
        this.options.currentPage = pageIndex;
        var oLiNew = this.createNumbers();
        console.log(this.domRefs.nums.parentNode);
        console.log(this.domRefs.nums)
        this.domRefs.nums.parentNode.replaceChild(oLiNew, this.domRefs.nums)
        this.domRefs.nums = oLiNew;
    }
}
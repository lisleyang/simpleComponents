class Tabs {
    constructor(options) {
        let defaultOptions = {

        }

        this.options = Object.assign({}, defaultOptions, options);
        this.init();
    }

    init: function() {
        this.checkOptions()
    }




}
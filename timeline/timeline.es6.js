class Timeline {
    constructor (options = {'itemsPerPage': 5}) {
        //initialize constructorParams
        this.options = options;

        //check screen size and change
        this.screenWidth = Math.max(document.documentElement.clientWidth, screen.width || 0);
        this.itemWidth = this.calculateItemWidth();
        this.options.itemsPerPage = this.calculateItemsPerPage();
        this.itemsShowed = this.options.itemsPerPage;

        this.btnGoLeft = document.getElementById('btn-left');
        this.btnGoRight = document.getElementById('btn-right');
        this.timeline = document.getElementById('timeline');
        this.timelineContainer = document.getElementById('timeline-container');
        this.items = this.timeline.children;
        this.timelineWidth = this.calculateAndSetWidthTimeline();
        this.timelineContainerWidth = this.calculateAndSetWidthTimelineContainer();
        this.setWidthToItems();

        this.isAnimating = false;

        this.btnGoLeft.addEventListener('click', () => {
            this.moveTimeline("left");
        });

        this.btnGoRight.addEventListener('click', () => {
            this.moveTimeline("right");
        });

        this.drawButtons();
    }

    calculateAndSetWidthTimeline() {
        const timelineWidth = this.items.length * this.itemWidth;
        this.timeline.style.width = `${timelineWidth}px`;
        return timelineWidth;
    }

    moveTimeline(dir = "left") {
        if (this.isAnimating) return;

        let currentMargin = this.getNumericValue(this.timeline.style.marginLeft);
        if ((currentMargin === 0 && dir === "left" )|| (Math.abs(currentMargin) >= (this.timelineWidth - this.timelineContainerWidth) && dir === "right")) {
            this.isAnimating = false;
            return;
        }

        this.isAnimating = true;
        const numberOfItemsToShow = this.numberOfItemsToShow(dir);
        const val = dir === "right" ? -(numberOfItemsToShow*this.itemWidth) : (numberOfItemsToShow*this.itemWidth);
        const targetMargin = currentMargin + val;

        if (dir === "right") {
            this.itemsShowed += numberOfItemsToShow;
        } else if (dir === "left") {
            this.itemsShowed -= numberOfItemsToShow;
        }

        this.drawButtons();

        const animation = setInterval(() => {
            if (currentMargin === targetMargin) {
                this.isAnimating = false;
                clearInterval(animation);
                return;
            }
            currentMargin = currentMargin > targetMargin ? currentMargin-=10 : currentMargin+=10;
            this.timeline.style.marginLeft = `${currentMargin}px`;
        },1);
    }

    numberOfItemsToShow(dir) {
        if (dir === 'right') {
            return this.items.length - this.itemsShowed > 1 ?  2 :  1;
        } else if (dir === 'left') {
            return this.itemsShowed - this.options.itemsPerPage > 1 ? 2 : 1;
        }
    }

    getNumericValue(value, units = "px") {
        try {
            if (!value) return 0;
            return parseInt(value.replace(units, ""));
        }catch (e) {
            console.error(e);
        }
        return 0;
    }

    calculateAndSetWidthTimelineContainer() {
        const timeLineContainerWidth = this.options.itemsPerPage * this.itemWidth;
        this.timelineContainer.style.width = `${timeLineContainerWidth}px`;
        return timeLineContainerWidth;
    }

    setWidthToItems() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].style.width = `${this.itemWidth}px`;
        }
    }

    calculateItemWidth() {
        return this.screenWidth >= 500 ? 180 : 160;
    }

    drawButtons () {
        this.itemsShowed === this.options.itemsPerPage ? this.btnGoLeft.style.display = 'none' : this.btnGoLeft.style.display = 'block';
        this.itemsShowed === this.items.length ? this.btnGoRight.style.display = 'none' : this.btnGoRight.style.display = 'block';
    }

    calculateItemsPerPage () {
        if (this.screenWidth > 1240) {
            return this.options.itemsPerPage;
        }else if (this.screenWidth > 1100) {
            return 5;
        }else if (this.screenWidth > 850) {
            return 4;
        } else if (this.screenWidth > 650) {
            return 3;
        } else {
            return 2;
        }
    }
}

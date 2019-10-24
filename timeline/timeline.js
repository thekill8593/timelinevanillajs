"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timeline =
    /*#__PURE__*/
    function () {
        function Timeline() {
            var _this = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
                'itemsPerPage': 5
            };

            _classCallCheck(this, Timeline);

            //initialize constructorParams
            this.options = options; //check screen size and change

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
            this.btnGoLeft.addEventListener('click', function () {
                _this.moveTimeline("left");
            });
            this.btnGoRight.addEventListener('click', function () {
                _this.moveTimeline("right");
            });
            this.drawButtons();
        }

        _createClass(Timeline, [{
            key: "calculateAndSetWidthTimeline",
            value: function calculateAndSetWidthTimeline() {
                var timelineWidth = this.items.length * this.itemWidth;
                this.timeline.style.width = "".concat(timelineWidth, "px");
                return timelineWidth;
            }
        }, {
            key: "moveTimeline",
            value: function moveTimeline() {
                var _this2 = this;

                var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "left";
                if (this.isAnimating) return;
                var currentMargin = this.getNumericValue(this.timeline.style.marginLeft);

                if (currentMargin === 0 && dir === "left" || Math.abs(currentMargin) >= this.timelineWidth - this.timelineContainerWidth && dir === "right") {
                    this.isAnimating = false;
                    return;
                }

                this.isAnimating = true;
                var numberOfItemsToShow = this.numberOfItemsToShow(dir);
                var val = dir === "right" ? -(numberOfItemsToShow * this.itemWidth) : numberOfItemsToShow * this.itemWidth;
                var targetMargin = currentMargin + val;

                if (dir === "right") {
                    this.itemsShowed += numberOfItemsToShow;
                } else if (dir === "left") {
                    this.itemsShowed -= numberOfItemsToShow;
                }

                this.drawButtons();
                var animation = setInterval(function () {
                    if (currentMargin === targetMargin) {
                        _this2.isAnimating = false;
                        clearInterval(animation);
                        return;
                    }

                    currentMargin = currentMargin > targetMargin ? currentMargin -= 10 : currentMargin += 10;
                    _this2.timeline.style.marginLeft = "".concat(currentMargin, "px");
                }, 1);
            }
        }, {
            key: "numberOfItemsToShow",
            value: function numberOfItemsToShow(dir) {
                if (dir === 'right') {
                    return this.items.length - this.itemsShowed > 1 ? 2 : 1;
                } else if (dir === 'left') {
                    return this.itemsShowed - this.options.itemsPerPage > 1 ? 2 : 1;
                }
            }
        }, {
            key: "getNumericValue",
            value: function getNumericValue(value) {
                var units = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "px";

                try {
                    if (!value) return 0;
                    return parseInt(value.replace(units, ""));
                } catch (e) {
                    console.error(e);
                }

                return 0;
            }
        }, {
            key: "calculateAndSetWidthTimelineContainer",
            value: function calculateAndSetWidthTimelineContainer() {
                var timeLineContainerWidth = this.options.itemsPerPage * this.itemWidth;
                this.timelineContainer.style.width = "".concat(timeLineContainerWidth, "px");
                return timeLineContainerWidth;
            }
        }, {
            key: "setWidthToItems",
            value: function setWidthToItems() {
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].style.width = "".concat(this.itemWidth, "px");
                }
            }
        }, {
            key: "calculateItemWidth",
            value: function calculateItemWidth() {
                return this.screenWidth >= 500 ? 180 : 160;
            }
        }, {
            key: "drawButtons",
            value: function drawButtons() {
                this.itemsShowed === this.options.itemsPerPage ? this.btnGoLeft.style.display = 'none' : this.btnGoLeft.style.display = 'block';
                this.itemsShowed === this.items.length ? this.btnGoRight.style.display = 'none' : this.btnGoRight.style.display = 'block';
            }
        }, {
            key: "calculateItemsPerPage",
            value: function calculateItemsPerPage() {
                if (this.screenWidth > 1240) {
                    return this.options.itemsPerPage;
                } else if (this.screenWidth > 1100) {
                    return 5;
                } else if (this.screenWidth > 850) {
                    return 4;
                } else if (this.screenWidth > 650) {
                    return 3;
                } else {
                    return 2;
                }
            }
        }]);

        return Timeline;
    }();
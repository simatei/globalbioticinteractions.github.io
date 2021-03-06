var fs = require('fs');
var insertCss = require('insert-css');
var domify = require('domify');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Panels, EventEmitter);
module.exports = Panels;

function Panels(opts) {
    if (!(this instanceof Panels)) return new Panels(opts);
    this.topLeft = '#globi-panel-top-left';
    this.topLeftContainer = this.topLeft + '-container';
    this.topRight = '#globi-panel-top-right';
    this.topRightContainer = this.topRight + '-container';
    this.bottomLeft = '#globi-panel-bottom-left';
    this.bottomLeftContainer = this.bottomLeft + '-container';
    this.bottomRight = '#globi-panel-bottom-right';
    this.bottomRightContainer = this.bottomRight + '-container';
    this.opts = opts;
}

Panels.prototype.appendTo = function (target) {
    if (typeof target === 'string') target = document.querySelector(target);
    var css = fs.readFileSync(__dirname + '/style.css', 'utf8');
    insertCss(css);
    var html = fs.readFileSync(__dirname + '/panels.html', 'utf8');
    var element = domify(html);
    addButtonClickHandlers(element);
    target.appendChild(element);
    this.emit('append', target);
}


function addButtonClickHandlers(target) {
    var buttons = target.querySelectorAll('.btn-resize');
    for (var i = 0; i < buttons.length; ++i) {
        var button = buttons[i];
        button.addEventListener('click', function () {
            var minMax = ['min', 'max'];
            if (this.parentElement.classList.contains('max')) {
                minMax = minMax.reverse();
            }
            this.parentElement.classList.remove(minMax[0]);
            this.parentElement.classList.add(minMax[1]);
        });
    }
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Scroller, scrollItems;

Scroller = require('./components/Scroller.coffee');

scrollItems = (_.range(5)).map(function(item, index) {
  return {
    name: "Item " + index
  };
});

React.renderComponent(Scroller({
  scrollItems: scrollItems
}), document.getElementById('container'));


},{"./components/Scroller.coffee":3}],2:[function(require,module,exports){
var DOM, ScrollItem;

DOM = require('../utils/DOM.coffee');

ScrollItem = React.createClass({
  render: function() {
    var div, h1;
    div = DOM.div, h1 = DOM.h1;
    return div({
      "class": 'item'
    }, h1(this.props.name));
  }
});

module.exports = ScrollItem;


},{"../utils/DOM.coffee":5}],3:[function(require,module,exports){

/**
 * ScrollView illustrates the ability to intercept scroll events, pipe them through
 * an easing equasion, and then apply them to a container.  Useful in situations where
 * you would like to normalize scrolling across an unknown number of devices / platforms
 * and apply the result to a parallax container or typical webpage
 *
 * @author Christopher Pappas <chris@wintr.us>
 * @date   5.2.14
 */
var DOM, ScrollItem, Scroller, SmoothScrollMixin;

DOM = require('../utils/DOM.coffee');

SmoothScrollMixin = require('../mixins/SmoothScrollMixin');

ScrollItem = require('./ScrollItem.coffee');

Scroller = React.createClass({
  mixins: [SmoothScrollMixin],
  getInitialState: function() {
    return {
      scrollItems: []
    };
  },
  componentWillMount: function() {
    return this.setState({
      scrollItems: this.props.scrollItems
    });
  },
  onClick: function() {
    this.state.scrollItems.push({
      name: "Item " + this.state.scrollItems.length
    });
    return this.forceUpdate();
  },
  render: function() {
    var button, div;
    div = DOM.div, button = DOM.button;
    return div({
      "class": 'ui-container'
    }, button({
      onClick: this.onClick
    }, 'Add additional item'), div({
      "class": 'scroll-container',
      ref: 'scrollContainer'
    }, this.state.scrollItems.map(function(item) {
      return ScrollItem({
        name: item.name
      });
    })));
  }
});

module.exports = Scroller;


},{"../mixins/SmoothScrollMixin":4,"../utils/DOM.coffee":5,"./ScrollItem.coffee":2}],4:[function(require,module,exports){
/**
 * Provides smooth, hardware-accellerated ease-based scrolling for container
 * elements by normalizing scroll behavior across different browsers / platforms.
 * Works great for parallax, or simply browsing a document.
 *
 * @author  Christopher Pappas
 * @date    5.14.14
 */

var SmoothScrollMixin = {

  getInitialState: function() {
    return {
      friction: .2,
      nextPosition: 0,
      currentPosition: 0
    }
  },


  componentDidMount: function() {
    this.setupStyles()
    this.updateHeight()
    this.animationLoop()
    this.forceUpdate()
  },


  componentDidUpdate: function() {
    this.updateHeight()
    window.addEventListener( 'scroll', this.onScroll )
  },


  setupStyles: function() {
    this.refs.scrollContainer.getDOMNode().style.position = 'fixed'
  },


  updateHeight: function() {
    var $container = this.refs.scrollContainer.getDOMNode()
    $container.parentNode.style.height = $container.offsetHeight + 'px'
  },


  animationLoop: function() {
    this.state.currentPosition += ~~(this.state.nextPosition - this.state.currentPosition) * this.state.friction

    TweenLite.set( this.refs.scrollContainer.getDOMNode(), {
      y: -this.state.currentPosition
    })

    requestAnimationFrame( this.animationLoop )
  },


  onScroll: function() {
    this.state.nextPosition = window.scrollY
    this.forceUpdate()
  }
}

module.exports = SmoothScrollMixin
},{}],5:[function(require,module,exports){
var DOM, tag, tagName, _fn,
  __slice = [].slice;

DOM = React.DOM;

_fn = (function(_this) {
  return function(tagName) {
    return module.exports[tagName] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return tag.apply(null, [tagName].concat(__slice.call(args)));
    };
  };
})(this);
for (tagName in DOM) {
  _fn(tagName);
}

tag = function() {
  var args, attributes, name, _ref;
  name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  if (((_ref = args[0]) != null ? _ref.constructor : void 0) === Object) {
    attributes = args.shift();
  } else {
    attributes = {};
  }
  if (attributes.hasOwnProperty('class')) {
    attributes.className = attributes["class"];
    delete attributes["class"];
  }
  return DOM[name].apply(DOM, [attributes].concat(__slice.call(args)));
};


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2hyaXMvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9ub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2NocmlzL1NpdGVzL0NOL3JlYWN0LXNtb290aC1zY3JvbGwtbWl4aW4vc3JjL3NjcmlwdHMvYXBwLmNvZmZlZSIsIi9Vc2Vycy9jaHJpcy9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2Nyb2xsSXRlbS5jb2ZmZWUiLCIvVXNlcnMvY2hyaXMvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1Njcm9sbGVyLmNvZmZlZSIsIi9Vc2Vycy9jaHJpcy9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL21peGlucy9TbW9vdGhTY3JvbGxNaXhpbi5qcyIsIi9Vc2Vycy9jaHJpcy9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL3V0aWxzL0RPTS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLHFCQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsOEJBQVIsQ0FBWCxDQUFBOztBQUFBLFdBRUEsR0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFGLENBQVEsQ0FBUixDQUFELENBQVcsQ0FBQyxHQUFaLENBQWdCLFNBQUMsSUFBRCxFQUFPLEtBQVAsR0FBQTtBQUMzQixTQUFPO0FBQUEsSUFBQSxJQUFBLEVBQU8sT0FBQSxHQUFNLEtBQWI7R0FBUCxDQUQyQjtBQUFBLENBQWhCLENBRmQsQ0FBQTs7QUFBQSxLQUtLLENBQUMsZUFBTixDQUFzQixR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QSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU2Nyb2xsZXIgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvU2Nyb2xsZXIuY29mZmVlJ1xuXG5zY3JvbGxJdGVtcyA9IChfLnJhbmdlIDUpLm1hcCAoaXRlbSwgaW5kZXgpIC0+XG4gICByZXR1cm4gbmFtZTogXCJJdGVtICN7aW5kZXh9XCJcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50IFNjcm9sbGVyKCBzY3JvbGxJdGVtczogc2Nyb2xsSXRlbXMgKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2NvbnRhaW5lciciLCJcbkRPTSA9IHJlcXVpcmUgJy4uL3V0aWxzL0RPTS5jb2ZmZWUnXG5cblxuU2Nyb2xsSXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cbiAgIHJlbmRlcjogLT5cbiAgICAgIHtkaXYsIGgxfSA9IERPTVxuXG4gICAgICBkaXYgY2xhc3M6ICdpdGVtJyxcbiAgICAgICAgIGgxIEBwcm9wcy5uYW1lXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbEl0ZW0iLCIjIyMqXG4gKiBTY3JvbGxWaWV3IGlsbHVzdHJhdGVzIHRoZSBhYmlsaXR5IHRvIGludGVyY2VwdCBzY3JvbGwgZXZlbnRzLCBwaXBlIHRoZW0gdGhyb3VnaFxuICogYW4gZWFzaW5nIGVxdWFzaW9uLCBhbmQgdGhlbiBhcHBseSB0aGVtIHRvIGEgY29udGFpbmVyLiAgVXNlZnVsIGluIHNpdHVhdGlvbnMgd2hlcmVcbiAqIHlvdSB3b3VsZCBsaWtlIHRvIG5vcm1hbGl6ZSBzY3JvbGxpbmcgYWNyb3NzIGFuIHVua25vd24gbnVtYmVyIG9mIGRldmljZXMgLyBwbGF0Zm9ybXNcbiAqIGFuZCBhcHBseSB0aGUgcmVzdWx0IHRvIGEgcGFyYWxsYXggY29udGFpbmVyIG9yIHR5cGljYWwgd2VicGFnZVxuICpcbiAqIEBhdXRob3IgQ2hyaXN0b3BoZXIgUGFwcGFzIDxjaHJpc0B3aW50ci51cz5cbiAqIEBkYXRlICAgNS4yLjE0XG4jIyNcblxuRE9NICAgICAgICAgICAgICAgPSByZXF1aXJlICcuLi91dGlscy9ET00uY29mZmVlJ1xuU21vb3RoU2Nyb2xsTWl4aW4gPSByZXF1aXJlICcuLi9taXhpbnMvU21vb3RoU2Nyb2xsTWl4aW4nXG5TY3JvbGxJdGVtICAgICAgICA9IHJlcXVpcmUgJy4vU2Nyb2xsSXRlbS5jb2ZmZWUnXG5cblxuU2Nyb2xsZXIgPSBSZWFjdC5jcmVhdGVDbGFzc1xuXG5cbiAgIG1peGluczogW1Ntb290aFNjcm9sbE1peGluXVxuXG5cbiAgIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBzY3JvbGxJdGVtczogW11cbiAgICAgIH1cblxuXG4gICBjb21wb25lbnRXaWxsTW91bnQ6IC0+XG4gICAgICBAc2V0U3RhdGVcbiAgICAgICAgIHNjcm9sbEl0ZW1zOiBAcHJvcHMuc2Nyb2xsSXRlbXNcblxuXG5cbiAgIG9uQ2xpY2s6IC0+XG4gICAgICBAc3RhdGUuc2Nyb2xsSXRlbXMucHVzaCB7IG5hbWU6IFwiSXRlbSAje0BzdGF0ZS5zY3JvbGxJdGVtcy5sZW5ndGh9XCIgfVxuICAgICAgQGZvcmNlVXBkYXRlKClcblxuXG5cbiAgIHJlbmRlcjogLT5cbiAgICAgIHtkaXYsIGJ1dHRvbn0gPSBET01cblxuICAgICAgZGl2IGNsYXNzOiAndWktY29udGFpbmVyJyxcbiAgICAgICAgIGJ1dHRvbiBvbkNsaWNrOiBAb25DbGljaywgJ0FkZCBhZGRpdGlvbmFsIGl0ZW0nXG5cbiAgICAgICAgIGRpdiBjbGFzczogJ3Njcm9sbC1jb250YWluZXInLCByZWY6ICdzY3JvbGxDb250YWluZXInLFxuICAgICAgICAgICAgQHN0YXRlLnNjcm9sbEl0ZW1zLm1hcCAoaXRlbSkgLT5cbiAgICAgICAgICAgICAgIFNjcm9sbEl0ZW0gbmFtZTogaXRlbS5uYW1lXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxlciIsIi8qKlxuICogUHJvdmlkZXMgc21vb3RoLCBoYXJkd2FyZS1hY2NlbGxlcmF0ZWQgZWFzZS1iYXNlZCBzY3JvbGxpbmcgZm9yIGNvbnRhaW5lclxuICogZWxlbWVudHMgYnkgbm9ybWFsaXppbmcgc2Nyb2xsIGJlaGF2aW9yIGFjcm9zcyBkaWZmZXJlbnQgYnJvd3NlcnMgLyBwbGF0Zm9ybXMuXG4gKiBXb3JrcyBncmVhdCBmb3IgcGFyYWxsYXgsIG9yIHNpbXBseSBicm93c2luZyBhIGRvY3VtZW50LlxuICpcbiAqIEBhdXRob3IgIENocmlzdG9waGVyIFBhcHBhc1xuICogQGRhdGUgICAgNS4xNC4xNFxuICovXG5cbnZhciBTbW9vdGhTY3JvbGxNaXhpbiA9IHtcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmcmljdGlvbjogLjIsXG4gICAgICBuZXh0UG9zaXRpb246IDAsXG4gICAgICBjdXJyZW50UG9zaXRpb246IDBcbiAgICB9XG4gIH0sXG5cblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXR1cFN0eWxlcygpXG4gICAgdGhpcy51cGRhdGVIZWlnaHQoKVxuICAgIHRoaXMuYW5pbWF0aW9uTG9vcCgpXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gIH0sXG5cblxuICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudXBkYXRlSGVpZ2h0KClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwgKVxuICB9LFxuXG5cbiAgc2V0dXBTdHlsZXM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVmcy5zY3JvbGxDb250YWluZXIuZ2V0RE9NTm9kZSgpLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJ1xuICB9LFxuXG5cbiAgdXBkYXRlSGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGNvbnRhaW5lciA9IHRoaXMucmVmcy5zY3JvbGxDb250YWluZXIuZ2V0RE9NTm9kZSgpXG4gICAgJGNvbnRhaW5lci5wYXJlbnROb2RlLnN0eWxlLmhlaWdodCA9ICRjb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4J1xuICB9LFxuXG5cbiAgYW5pbWF0aW9uTG9vcDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50UG9zaXRpb24gKz0gfn4odGhpcy5zdGF0ZS5uZXh0UG9zaXRpb24gLSB0aGlzLnN0YXRlLmN1cnJlbnRQb3NpdGlvbikgKiB0aGlzLnN0YXRlLmZyaWN0aW9uXG5cbiAgICBUd2VlbkxpdGUuc2V0KCB0aGlzLnJlZnMuc2Nyb2xsQ29udGFpbmVyLmdldERPTU5vZGUoKSwge1xuICAgICAgeTogLXRoaXMuc3RhdGUuY3VycmVudFBvc2l0aW9uXG4gICAgfSlcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy5hbmltYXRpb25Mb29wIClcbiAgfSxcblxuXG4gIG9uU2Nyb2xsOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YXRlLm5leHRQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTbW9vdGhTY3JvbGxNaXhpbiIsIiMgVXRpbGxpdHkgaGVscGVyIGZvciB0cmltbWluZyB1bm5lY2Vzc2FyeSBwcm9wcyBmcm9tXG4jIFJlYWN0LkRPTSBpbXBvcnRzLlxuIyBFeHRyYWN0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYXRvbS9yZWFjdGlvbmFyeS9cblxue0RPTX0gPSBSZWFjdFxuXG5mb3IgdGFnTmFtZSBvZiBET01cbiAgIGRvICh0YWdOYW1lKSA9PiBtb2R1bGUuZXhwb3J0c1t0YWdOYW1lXSA9IChhcmdzLi4uKSAtPiB0YWcodGFnTmFtZSwgYXJncy4uLilcblxudGFnID0gKG5hbWUsIGFyZ3MuLi4pIC0+XG4gICBpZiBhcmdzWzBdPy5jb25zdHJ1Y3RvciBpcyBPYmplY3RcbiAgICAgIGF0dHJpYnV0ZXMgPSBhcmdzLnNoaWZ0KClcbiAgIGVsc2VcbiAgICAgIGF0dHJpYnV0ZXMgPSB7fVxuXG4gICBpZiBhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdjbGFzcycpXG4gICAgICBhdHRyaWJ1dGVzLmNsYXNzTmFtZSA9IGF0dHJpYnV0ZXMuY2xhc3NcbiAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzLmNsYXNzXG5cbiAgIERPTVtuYW1lXShhdHRyaWJ1dGVzLCBhcmdzLi4uKSJdfQ==

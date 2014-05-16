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

SmoothScrollMixin = require('../mixins/SmoothScrollMixin.coffee');

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


},{"../mixins/SmoothScrollMixin.coffee":4,"../utils/DOM.coffee":5,"./ScrollItem.coffee":2}],4:[function(require,module,exports){

/**
 * Provides smooth, hardware-accellerated ease-based scrolling for container
 * elements by normalizing scroll behavior across different browsers / platforms.
 * Works great for parallax, or simply browsing a document.
 *
 * @author Christopher Pappas <chris@wintr.us>
 * @date   5.14.14
 */
var SmoothScrollMixin;

SmoothScrollMixin = {
  getInitialState: function() {
    return {
      friction: .2,
      nextPosition: 0,
      currentPosition: 0,
      scrollPercent: 0
    };
  },
  componentDidMount: function() {
    this.setupStyles();
    this.updateHeight();
    this.animationLoop();
    return this.forceUpdate();
  },
  componentDidUpdate: function() {
    this.updateHeight();
    return window.addEventListener('scroll', this.onScroll);
  },
  setupStyles: function() {
    return this.refs.scrollContainer.getDOMNode().style.position = 'fixed';
  },
  updateHeight: function() {
    var $container;
    $container = this.refs.scrollContainer.getDOMNode();
    return $container.parentNode.style.height = $container.offsetHeight + 'px';
  },
  animationLoop: function() {
    var $container;
    $container = this.refs.scrollContainer.getDOMNode();
    this.state.currentPosition += ~~(this.state.nextPosition - this.state.currentPosition) * this.state.friction;
    this.state.scrollPercent = ~~(this.state.currentPosition / (parseInt($container.parentNode.style.height) - window.innerHeight) * 100);
    TweenLite.set(this.refs.scrollContainer.getDOMNode(), {
      y: -this.state.currentPosition
    });
    return requestAnimationFrame(this.animationLoop);
  },
  onScroll: function() {
    this.state.nextPosition = window.scrollY;
    return this.forceUpdate();
  }
};

module.exports = SmoothScrollMixin;


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL25vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2FwcC5jb2ZmZWUiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2Nyb2xsSXRlbS5jb2ZmZWUiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2Nyb2xsZXIuY29mZmVlIiwiL1VzZXJzL2RhbWFzc2kvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9zcmMvc2NyaXB0cy9taXhpbnMvU21vb3RoU2Nyb2xsTWl4aW4uY29mZmVlIiwiL1VzZXJzL2RhbWFzc2kvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9zcmMvc2NyaXB0cy91dGlscy9ET00uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxxQkFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLDhCQUFSLENBQVgsQ0FBQTs7QUFBQSxXQUVBLEdBQWMsQ0FBQyxDQUFDLENBQUMsS0FBRixDQUFRLENBQVIsQ0FBRCxDQUFXLENBQUMsR0FBWixDQUFnQixTQUFDLElBQUQsRUFBTyxLQUFQLEdBQUE7QUFDM0IsU0FBTztBQUFBLElBQUEsSUFBQSxFQUFPLE9BQUEsR0FBTSxLQUFiO0dBQVAsQ0FEMkI7QUFBQSxDQUFoQixDQUZkLENBQUE7O0FBQUEsS0FLSyxD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dkM7RUFBQSxFQUFBO0FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUROO0FBQUEsS0FBQSxjQUFBLEdBQUE7QUFDRyxNQUFJLFFBQUosQ0FESDtBQUFBLENBRkE7O0FBQUEsR0FLQSxHQUFNLFNBQUEsR0FBQTtBQUNILE1BQUEsNEJBQUE7QUFBQSxFQURJLHFCQUFNLDhEQUNWLENBQUE7QUFBQSxFQUFBLG9DQUFVLENBQUUscUJBQVQsS0FBd0IsTUFBM0I7QUFDRyxJQUFBLFVBQUEsR0FBYSxJQUFJLENBQUMsS0FBTCxDQUFBLENBQWIsQ0FESDtHQUFBLE1BQUE7QUFHRyxJQUFBLFVBQUEsR0FBYSxFQUFiLENBSEg7R0FBQTtBQUtBLEVBQUEsSUFBRyxVQUFVLENBQUMsY0FBWCxDQUEwQixPQUExQixDQUFIO0FBQ0csSUFBQSxVQUFVLENBQUMsU0FBWCxHQUF1QixVQUFVLENBQUMsT0FBRCxDQUFqQyxDQUFBO0FBQUEsSUFDQSxNQUFBLENBQUEsVUFBaUIsQ0FBQyxPQUFELENBRGpCLENBREg7R0FMQTtTQVNBLEdBQUksQ0FBQSxJQUFBLENBQUosWUFBVSxDQUFBLFVBQVksU0FBQSxhQUFBLElBQUEsQ0FBQSxDQUF0QixFQVZHO0FBQUEsQ0FMTixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJTY3JvbGxlciA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9TY3JvbGxlci5jb2ZmZWUnXG5cbnNjcm9sbEl0ZW1zID0gKF8ucmFuZ2UgNSkubWFwIChpdGVtLCBpbmRleCkgLT5cbiAgIHJldHVybiBuYW1lOiBcIkl0ZW0gI3tpbmRleH1cIlxuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQgU2Nyb2xsZXIoIHNjcm9sbEl0ZW1zOiBzY3JvbGxJdGVtcyApLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnY29udGFpbmVyJyIsIlxuRE9NID0gcmVxdWlyZSAnLi4vdXRpbHMvRE9NLmNvZmZlZSdcblxuXG5TY3JvbGxJdGVtID0gUmVhY3QuY3JlYXRlQ2xhc3NcblxuICAgcmVuZGVyOiAtPlxuICAgICAge2RpdiwgaDF9ID0gRE9NXG5cbiAgICAgIGRpdiBjbGFzczogJ2l0ZW0nLFxuICAgICAgICAgaDEgQHByb3BzLm5hbWVcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsSXRlbSIsIiMjIypcbiAqIFNjcm9sbFZpZXcgaWxsdXN0cmF0ZXMgdGhlIGFiaWxpdHkgdG8gaW50ZXJjZXB0IHNjcm9sbCBldmVudHMsIHBpcGUgdGhlbSB0aHJvdWdoXG4gKiBhbiBlYXNpbmcgZXF1YXNpb24sIGFuZCB0aGVuIGFwcGx5IHRoZW0gdG8gYSBjb250YWluZXIuICBVc2VmdWwgaW4gc2l0dWF0aW9ucyB3aGVyZVxuICogeW91IHdvdWxkIGxpa2UgdG8gbm9ybWFsaXplIHNjcm9sbGluZyBhY3Jvc3MgYW4gdW5rbm93biBudW1iZXIgb2YgZGV2aWNlcyAvIHBsYXRmb3Jtc1xuICogYW5kIGFwcGx5IHRoZSByZXN1bHQgdG8gYSBwYXJhbGxheCBjb250YWluZXIgb3IgdHlwaWNhbCB3ZWJwYWdlXG4gKlxuICogQGF1dGhvciBDaHJpc3RvcGhlciBQYXBwYXMgPGNocmlzQHdpbnRyLnVzPlxuICogQGRhdGUgICA1LjIuMTRcbiMjI1xuXG5ET00gICAgICAgICAgICAgICA9IHJlcXVpcmUgJy4uL3V0aWxzL0RPTS5jb2ZmZWUnXG5TbW9vdGhTY3JvbGxNaXhpbiA9IHJlcXVpcmUgJy4uL21peGlucy9TbW9vdGhTY3JvbGxNaXhpbi5jb2ZmZWUnXG5TY3JvbGxJdGVtICAgICAgICA9IHJlcXVpcmUgJy4vU2Nyb2xsSXRlbS5jb2ZmZWUnXG5cblxuU2Nyb2xsZXIgPSBSZWFjdC5jcmVhdGVDbGFzc1xuXG5cbiAgIG1peGluczogW1Ntb290aFNjcm9sbE1peGluXVxuXG5cbiAgIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBzY3JvbGxJdGVtczogW11cbiAgICAgIH1cblxuXG4gICBjb21wb25lbnRXaWxsTW91bnQ6IC0+XG4gICAgICBAc2V0U3RhdGVcbiAgICAgICAgIHNjcm9sbEl0ZW1zOiBAcHJvcHMuc2Nyb2xsSXRlbXNcblxuXG5cbiAgIG9uQ2xpY2s6IC0+XG4gICAgICBAc3RhdGUuc2Nyb2xsSXRlbXMucHVzaCB7IG5hbWU6IFwiSXRlbSAje0BzdGF0ZS5zY3JvbGxJdGVtcy5sZW5ndGh9XCIgfVxuICAgICAgQGZvcmNlVXBkYXRlKClcblxuXG5cbiAgIHJlbmRlcjogLT5cbiAgICAgIHtkaXYsIGJ1dHRvbn0gPSBET01cblxuICAgICAgZGl2IGNsYXNzOiAndWktY29udGFpbmVyJyxcbiAgICAgICAgIGJ1dHRvbiBvbkNsaWNrOiBAb25DbGljaywgJ0FkZCBhZGRpdGlvbmFsIGl0ZW0nXG5cbiAgICAgICAgIGRpdiBjbGFzczogJ3Njcm9sbC1jb250YWluZXInLCByZWY6ICdzY3JvbGxDb250YWluZXInLFxuICAgICAgICAgICAgQHN0YXRlLnNjcm9sbEl0ZW1zLm1hcCAoaXRlbSkgLT5cbiAgICAgICAgICAgICAgIFNjcm9sbEl0ZW0gbmFtZTogaXRlbS5uYW1lXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxlciIsIiMjIypcbiAqIFByb3ZpZGVzIHNtb290aCwgaGFyZHdhcmUtYWNjZWxsZXJhdGVkIGVhc2UtYmFzZWQgc2Nyb2xsaW5nIGZvciBjb250YWluZXJcbiAqIGVsZW1lbnRzIGJ5IG5vcm1hbGl6aW5nIHNjcm9sbCBiZWhhdmlvciBhY3Jvc3MgZGlmZmVyZW50IGJyb3dzZXJzIC8gcGxhdGZvcm1zLlxuICogV29ya3MgZ3JlYXQgZm9yIHBhcmFsbGF4LCBvciBzaW1wbHkgYnJvd3NpbmcgYSBkb2N1bWVudC5cbiAqXG4gKiBAYXV0aG9yIENocmlzdG9waGVyIFBhcHBhcyA8Y2hyaXNAd2ludHIudXM+XG4gKiBAZGF0ZSAgIDUuMTQuMTRcbiMjI1xuXG5TbW9vdGhTY3JvbGxNaXhpbiA9XG5cbiAgIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICBmcmljdGlvbjogLjJcbiAgICAgICAgIG5leHRQb3NpdGlvbjogMFxuICAgICAgICAgY3VycmVudFBvc2l0aW9uOiAwXG4gICAgICAgICBzY3JvbGxQZXJjZW50OiAwXG4gICAgICB9XG5cblxuICAgY29tcG9uZW50RGlkTW91bnQ6IC0+XG4gICAgICBAc2V0dXBTdHlsZXMoKVxuICAgICAgQHVwZGF0ZUhlaWdodCgpXG4gICAgICBAYW5pbWF0aW9uTG9vcCgpXG4gICAgICBAZm9yY2VVcGRhdGUoKVxuXG5cblxuICAgY29tcG9uZW50RGlkVXBkYXRlOiAtPlxuICAgICAgQHVwZGF0ZUhlaWdodCgpXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnc2Nyb2xsJywgQG9uU2Nyb2xsXG5cblxuXG4gICBzZXR1cFN0eWxlczogLT5cbiAgICAgIEByZWZzLnNjcm9sbENvbnRhaW5lci5nZXRET01Ob2RlKCkuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnXG5cblxuXG4gICB1cGRhdGVIZWlnaHQ6IC0+XG4gICAgICAkY29udGFpbmVyID0gQHJlZnMuc2Nyb2xsQ29udGFpbmVyLmdldERPTU5vZGUoKVxuICAgICAgJGNvbnRhaW5lci5wYXJlbnROb2RlLnN0eWxlLmhlaWdodCA9ICRjb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4J1xuXG5cblxuICAgYW5pbWF0aW9uTG9vcDogLT5cbiAgICAgICRjb250YWluZXIgPSBAcmVmcy5zY3JvbGxDb250YWluZXIuZ2V0RE9NTm9kZSgpXG5cbiAgICAgIEBzdGF0ZS5jdXJyZW50UG9zaXRpb24gKz0gfn4oQHN0YXRlLm5leHRQb3NpdGlvbiAtIEBzdGF0ZS5jdXJyZW50UG9zaXRpb24pICogQHN0YXRlLmZyaWN0aW9uXG4gICAgICBAc3RhdGUuc2Nyb2xsUGVyY2VudCAgICA9IH5+KEBzdGF0ZS5jdXJyZW50UG9zaXRpb24gLyAocGFyc2VJbnQoJGNvbnRhaW5lci5wYXJlbnROb2RlLnN0eWxlLmhlaWdodCkgLSB3aW5kb3cuaW5uZXJIZWlnaHQpICogMTAwKVxuXG4gICAgICBUd2VlbkxpdGUuc2V0IEByZWZzLnNjcm9sbENvbnRhaW5lci5nZXRET01Ob2RlKCksXG4gICAgICAgICB5OiAtQHN0YXRlLmN1cnJlbnRQb3NpdGlvblxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGlvbkxvb3BcblxuXG5cbiAgIG9uU2Nyb2xsOiAtPlxuICAgICAgQHN0YXRlLm5leHRQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICBAZm9yY2VVcGRhdGUoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gU21vb3RoU2Nyb2xsTWl4aW4iLCIjIFV0aWxsaXR5IGhlbHBlciBmb3IgdHJpbW1pbmcgdW5uZWNlc3NhcnkgcHJvcHMgZnJvbVxuIyBSZWFjdC5ET00gaW1wb3J0cy5cbiMgRXh0cmFjdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2F0b20vcmVhY3Rpb25hcnkvXG5cbntET019ID0gUmVhY3RcblxuZm9yIHRhZ05hbWUgb2YgRE9NXG4gICBkbyAodGFnTmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbdGFnTmFtZV0gPSAoYXJncy4uLikgLT4gdGFnKHRhZ05hbWUsIGFyZ3MuLi4pXG5cbnRhZyA9IChuYW1lLCBhcmdzLi4uKSAtPlxuICAgaWYgYXJnc1swXT8uY29uc3RydWN0b3IgaXMgT2JqZWN0XG4gICAgICBhdHRyaWJ1dGVzID0gYXJncy5zaGlmdCgpXG4gICBlbHNlXG4gICAgICBhdHRyaWJ1dGVzID0ge31cblxuICAgaWYgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKVxuICAgICAgYXR0cmlidXRlcy5jbGFzc05hbWUgPSBhdHRyaWJ1dGVzLmNsYXNzXG4gICAgICBkZWxldGUgYXR0cmlidXRlcy5jbGFzc1xuXG4gICBET01bbmFtZV0oYXR0cmlidXRlcywgYXJncy4uLikiXX0=

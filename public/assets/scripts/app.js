(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Scroller, scrollItems;

Scroller = require('./components/Scroller.coffee');

scrollItems = (_.range(20)).map(function(item, index) {
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
 * Provides ease-based scrolling
 *
 * @author Christopher Pappas <chris@wintr.us>
 * @date   5.2.14
 */
var SmoothScrollMixin;

SmoothScrollMixin = {
  getInitialState: function() {
    return {
      friction: .3,
      nextPosition: 0,
      currentPosition: 0
    };
  },
  componentDidMount: function() {
    this.updateHeight();
    this.animationLoop();
    return this.forceUpdate();
  },
  componentDidUpdate: function() {
    this.updateHeight();
    return window.addEventListener('scroll', this.onScroll);
  },
  updateHeight: function() {
    var $container;
    $container = this.refs.scrollContainer.getDOMNode();
    return $container.parentNode.style.height = $container.offsetHeight + 'px';
  },
  animationLoop: function() {
    this.state.currentPosition += ~~(this.state.nextPosition - this.state.currentPosition) * this.state.friction;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL25vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2FwcC5jb2ZmZWUiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2Nyb2xsSXRlbS5jb2ZmZWUiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2Nyb2xsZXIuY29mZmVlIiwiL1VzZXJzL2RhbWFzc2kvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9zcmMvc2NyaXB0cy9taXhpbnMvU21vb3RoU2Nyb2xsTWl4aW4uY29mZmVlIiwiL1VzZXJzL2RhbWFzc2kvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9zcmMvc2NyaXB0cy91dGlscy9ET00uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxxQkFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLDhCQUFSLENBQVgsQ0FBQTs7QUFBQSxXQUVBLEdBQWMsQ0FBQyxDQUFDLENBQUMsS0FBRixDQUFRLEVBQVIsQ0FBRCxDQUFZLENBQUMsR0FBYixDQUFpQixTQUFDLElBQUQsRUFBTyxLQUFQLEdBQUE7QUFDNUIsU0FBTztBQUFBLElBQUEsSUFBQSxFQUFPLE9BQUEsR0FBTSxLQUFiO0dBQVAsQ0FENEI7QUFBQSxDQUFqQixDQUZkLENBQUE7O0FBQUEsS0FLSyxD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LFlBQVUsQ0FBQSxVQUFZLFNBQUEsYUFBQSxJQUFBLENBQUEsQ0FBdEIsRUFWRztBQUFBLENBTE4sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU2Nyb2xsZXIgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvU2Nyb2xsZXIuY29mZmVlJ1xuXG5zY3JvbGxJdGVtcyA9IChfLnJhbmdlIDIwKS5tYXAgKGl0ZW0sIGluZGV4KSAtPlxuICAgcmV0dXJuIG5hbWU6IFwiSXRlbSAje2luZGV4fVwiXG5cblJlYWN0LnJlbmRlckNvbXBvbmVudCBTY3JvbGxlciggc2Nyb2xsSXRlbXM6IHNjcm9sbEl0ZW1zICksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdjb250YWluZXInIiwiXG5ET00gPSByZXF1aXJlICcuLi91dGlscy9ET00uY29mZmVlJ1xuXG5cblNjcm9sbEl0ZW0gPSBSZWFjdC5jcmVhdGVDbGFzc1xuXG4gICByZW5kZXI6IC0+XG4gICAgICB7ZGl2LCBoMX0gPSBET01cblxuICAgICAgZGl2IGNsYXNzOiAnaXRlbScsXG4gICAgICAgICBoMSBAcHJvcHMubmFtZVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxJdGVtIiwiIyMjKlxuICogU2Nyb2xsVmlldyBpbGx1c3RyYXRlcyB0aGUgYWJpbGl0eSB0byBpbnRlcmNlcHQgc2Nyb2xsIGV2ZW50cywgcGlwZSB0aGVtIHRocm91Z2hcbiAqIGFuIGVhc2luZyBlcXVhc2lvbiwgYW5kIHRoZW4gYXBwbHkgdGhlbSB0byBhIGNvbnRhaW5lci4gIFVzZWZ1bCBpbiBzaXR1YXRpb25zIHdoZXJlXG4gKiB5b3Ugd291bGQgbGlrZSB0byBub3JtYWxpemUgc2Nyb2xsaW5nIGFjcm9zcyBhbiB1bmtub3duIG51bWJlciBvZiBkZXZpY2VzIC8gcGxhdGZvcm1zXG4gKiBhbmQgYXBwbHkgdGhlIHJlc3VsdCB0byBhIHBhcmFsbGF4IGNvbnRhaW5lciBvciB0eXBpY2FsIHdlYnBhZ2VcbiAqXG4gKiBAYXV0aG9yIENocmlzdG9waGVyIFBhcHBhcyA8Y2hyaXNAd2ludHIudXM+XG4gKiBAZGF0ZSAgIDUuMi4xNFxuIyMjXG5cbkRPTSAgICAgICAgICAgICAgID0gcmVxdWlyZSAnLi4vdXRpbHMvRE9NLmNvZmZlZSdcblNtb290aFNjcm9sbE1peGluID0gcmVxdWlyZSAnLi4vbWl4aW5zL1Ntb290aFNjcm9sbE1peGluLmNvZmZlZSdcblNjcm9sbEl0ZW0gICAgICAgID0gcmVxdWlyZSAnLi9TY3JvbGxJdGVtLmNvZmZlZSdcblxuXG5TY3JvbGxlciA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cblxuICAgbWl4aW5zOiBbU21vb3RoU2Nyb2xsTWl4aW5dXG5cblxuICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHNjcm9sbEl0ZW1zOiBbXVxuICAgICAgfVxuXG5cbiAgIGNvbXBvbmVudFdpbGxNb3VudDogLT5cbiAgICAgIEBzZXRTdGF0ZVxuICAgICAgICAgc2Nyb2xsSXRlbXM6IEBwcm9wcy5zY3JvbGxJdGVtc1xuXG5cblxuICAgb25DbGljazogLT5cbiAgICAgIEBzdGF0ZS5zY3JvbGxJdGVtcy5wdXNoIHsgbmFtZTogXCJJdGVtICN7QHN0YXRlLnNjcm9sbEl0ZW1zLmxlbmd0aH1cIiB9XG4gICAgICBAZm9yY2VVcGRhdGUoKVxuXG5cblxuICAgcmVuZGVyOiAtPlxuICAgICAge2RpdiwgYnV0dG9ufSA9IERPTVxuXG4gICAgICBkaXYgY2xhc3M6ICd1aS1jb250YWluZXInLFxuICAgICAgICAgYnV0dG9uIG9uQ2xpY2s6IEBvbkNsaWNrLCAnQWRkIGFkZGl0aW9uYWwgaXRlbSdcblxuICAgICAgICAgZGl2IGNsYXNzOiAnc2Nyb2xsLWNvbnRhaW5lcicsIHJlZjogJ3Njcm9sbENvbnRhaW5lcicsXG4gICAgICAgICAgICBAc3RhdGUuc2Nyb2xsSXRlbXMubWFwIChpdGVtKSAtPlxuICAgICAgICAgICAgICAgU2Nyb2xsSXRlbSBuYW1lOiBpdGVtLm5hbWVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbGVyIiwiIyMjKlxuICogUHJvdmlkZXMgZWFzZS1iYXNlZCBzY3JvbGxpbmdcbiAqXG4gKiBAYXV0aG9yIENocmlzdG9waGVyIFBhcHBhcyA8Y2hyaXNAd2ludHIudXM+XG4gKiBAZGF0ZSAgIDUuMi4xNFxuIyMjXG5cblNtb290aFNjcm9sbE1peGluID1cblxuICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIGZyaWN0aW9uOiAuM1xuICAgICAgICAgbmV4dFBvc2l0aW9uOiAwXG4gICAgICAgICBjdXJyZW50UG9zaXRpb246IDBcbiAgICAgIH1cblxuXG4gICBjb21wb25lbnREaWRNb3VudDogLT5cbiAgICAgIEB1cGRhdGVIZWlnaHQoKVxuICAgICAgQGFuaW1hdGlvbkxvb3AoKVxuICAgICAgQGZvcmNlVXBkYXRlKClcblxuXG5cbiAgIGNvbXBvbmVudERpZFVwZGF0ZTogLT5cbiAgICAgIEB1cGRhdGVIZWlnaHQoKVxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Njcm9sbCcsIEBvblNjcm9sbFxuXG5cblxuICAgdXBkYXRlSGVpZ2h0OiAtPlxuICAgICAgJGNvbnRhaW5lciA9IEByZWZzLnNjcm9sbENvbnRhaW5lci5nZXRET01Ob2RlKClcbiAgICAgICRjb250YWluZXIucGFyZW50Tm9kZS5zdHlsZS5oZWlnaHQgPSAkY29udGFpbmVyLm9mZnNldEhlaWdodCArICdweCdcblxuXG5cbiAgIGFuaW1hdGlvbkxvb3A6IC0+XG4gICAgICBAc3RhdGUuY3VycmVudFBvc2l0aW9uICs9IH5+KEBzdGF0ZS5uZXh0UG9zaXRpb24gLSBAc3RhdGUuY3VycmVudFBvc2l0aW9uKSAqIEBzdGF0ZS5mcmljdGlvblxuXG4gICAgICBUd2VlbkxpdGUuc2V0IEByZWZzLnNjcm9sbENvbnRhaW5lci5nZXRET01Ob2RlKCksXG4gICAgICAgICB5OiAtQHN0YXRlLmN1cnJlbnRQb3NpdGlvblxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGlvbkxvb3BcblxuXG5cbiAgIG9uU2Nyb2xsOiAtPlxuICAgICAgQHN0YXRlLm5leHRQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICBAZm9yY2VVcGRhdGUoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gU21vb3RoU2Nyb2xsTWl4aW4iLCIjIFV0aWxsaXR5IGhlbHBlciBmb3IgdHJpbW1pbmcgdW5uZWNlc3NhcnkgcHJvcHMgZnJvbVxuIyBSZWFjdC5ET00gaW1wb3J0cy5cbiMgRXh0cmFjdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2F0b20vcmVhY3Rpb25hcnkvXG5cbntET019ID0gUmVhY3RcblxuZm9yIHRhZ05hbWUgb2YgRE9NXG4gICBkbyAodGFnTmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbdGFnTmFtZV0gPSAoYXJncy4uLikgLT4gdGFnKHRhZ05hbWUsIGFyZ3MuLi4pXG5cbnRhZyA9IChuYW1lLCBhcmdzLi4uKSAtPlxuICAgaWYgYXJnc1swXT8uY29uc3RydWN0b3IgaXMgT2JqZWN0XG4gICAgICBhdHRyaWJ1dGVzID0gYXJncy5zaGlmdCgpXG4gICBlbHNlXG4gICAgICBhdHRyaWJ1dGVzID0ge31cblxuICAgaWYgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnY2xhc3MnKVxuICAgICAgYXR0cmlidXRlcy5jbGFzc05hbWUgPSBhdHRyaWJ1dGVzLmNsYXNzXG4gICAgICBkZWxldGUgYXR0cmlidXRlcy5jbGFzc1xuXG4gICBET01bbmFtZV0oYXR0cmlidXRlcywgYXJncy4uLikiXX0=

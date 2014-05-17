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
  displayName: 'ScrollItem',
  onClick: function(event) {
    return this.props.deleteItemByIndex(this.props.index);
  },
  render: function() {
    var div, h1, style;
    div = DOM.div, h1 = DOM.h1;
    style = {
      backgroundColor: this.props.backgroundColor
    };
    return div({
      "class": 'item',
      style: style,
      onClick: this.onClick
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
  displayName: 'Scroller',
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
  onAddBtnClick: function() {
    this.state.scrollItems.push({
      name: "Item " + this.state.scrollItems.length
    });
    return this.forceUpdate();
  },
  deleteItemByIndex: function(index) {
    return this.setState({
      scrollItems: _.without(this.state.scrollItems, this.state.scrollItems[index])
    });
  },
  render: function() {
    var button, div, scrollItems;
    div = DOM.div, button = DOM.button;
    scrollItems = this.state.scrollItems.map((function(_this) {
      return function(item, index) {
        return ScrollItem({
          name: item.name,
          index: index,
          backgroundColor: item.backgroundColor,
          deleteItemByIndex: _this.deleteItemByIndex
        });
      };
    })(this));
    return div({
      "class": 'ui-container'
    }, button({
      onClick: this.onAddBtnClick
    }, 'Add additional item'), div({
      "class": 'scroll-container',
      ref: 'scrollContainer'
    }, scrollItems));
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
    window.addEventListener('scroll', this.onScroll);
    this.setupStyles();
    this.updateHeight();
    return this.animationLoop();
  },
  componentDidUpdate: function() {
    return this.updateHeight();
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
    TweenLite.set($container, {
      y: -this.state.currentPosition
    });
    return requestAnimationFrame(this.animationLoop);
  },
  onScroll: function() {
    return this.setState({
      nextPosition: window.scrollY
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL25vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2FwcC5jb2ZmZWUiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2Nyb2xsSXRlbS5jb2ZmZWUiLCIvVXNlcnMvZGFtYXNzaS9TaXRlcy9DTi9yZWFjdC1zbW9vdGgtc2Nyb2xsLW1peGluL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2Nyb2xsZXIuY29mZmVlIiwiL1VzZXJzL2RhbWFzc2kvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9zcmMvc2NyaXB0cy9taXhpbnMvU21vb3RoU2Nyb2xsTWl4aW4uY29mZmVlIiwiL1VzZXJzL2RhbWFzc2kvU2l0ZXMvQ04vcmVhY3Qtc21vb3RoLXNjcm9sbC1taXhpbi9zcmMvc2NyaXB0cy91dGlscy9ET00uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxxQkFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLDhCQUFSLENBQVgsQ0FBQTs7QUFBQSxXQUVBLEdBQWMsQ0FBQyxDQUFDLENBQUMsS0FBRixDQUFRLEVBQVIsQ0FBRCxDQUFZLENBQUMsR0FBYixDQUFpQixTQUFDLElBQUQsRUFBTyxLQUFQLEdBQUE7QUFDNUIsU0FBTztBQUFBLElBQ0osSUFBQSxFQUFPLE9BQUEsR0FBTSxLQURUO0dBQVAsQ0FENEI7QUFBQSxDQUFqQixDQUZkLENBQUE7O0FBQUEsS0FPSyxD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QUE7QUFLQSxFQUFBLElBQUcsVUFBVSxDQUFDLGNBQVgsQ0FBMEIsT0FBMUIsQ0FBSDtBQUNHLElBQUEsVUFBVSxDQUFDLFNBQVgsR0FBdUIsVUFBVSxDQUFDLE9BQUQsQ0FBakMsQ0FBQTtBQUFBLElBQ0EsTUFBQSxDQUFBLFVBQWlCLENBQUMsT0FBRCxDQURqQixDQURIO0dBTEE7U0FTQSxHQUFJLENBQUEsSUFBQSxDQUFKLFlBQVUsQ0FBQSxVQUFZLFNBQUEsYUFBQSxJQUFBLENBQUEsQ0FBdEIsRUFWRztBQUFBLENBTE4sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU2Nyb2xsZXIgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvU2Nyb2xsZXIuY29mZmVlJ1xuXG5zY3JvbGxJdGVtcyA9IChfLnJhbmdlIDIwKS5tYXAgKGl0ZW0sIGluZGV4KSAtPlxuICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IFwiSXRlbSAje2luZGV4fVwiXG4gICB9XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudCBTY3JvbGxlcih7IHNjcm9sbEl0ZW1zOiBzY3JvbGxJdGVtcyB9KSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2NvbnRhaW5lciciLCJcbkRPTSA9IHJlcXVpcmUgJy4uL3V0aWxzL0RPTS5jb2ZmZWUnXG5cblxuU2Nyb2xsSXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cbiAgIGRpc3BsYXlOYW1lOiAnU2Nyb2xsSXRlbSdcblxuXG4gICBvbkNsaWNrOiAoZXZlbnQpIC0+XG4gICAgICBAcHJvcHMuZGVsZXRlSXRlbUJ5SW5kZXggQHByb3BzLmluZGV4XG5cblxuICAgcmVuZGVyOiAtPlxuICAgICAge2RpdiwgaDF9ID0gRE9NXG5cbiAgICAgIHN0eWxlID1cbiAgICAgICAgIGJhY2tncm91bmRDb2xvcjogQHByb3BzLmJhY2tncm91bmRDb2xvclxuXG4gICAgICBkaXYgY2xhc3M6ICdpdGVtJywgc3R5bGU6IHN0eWxlLCBvbkNsaWNrOiBAb25DbGljayxcbiAgICAgICAgIGgxIEBwcm9wcy5uYW1lXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbEl0ZW0iLCIjIyMqXG4gKiBTY3JvbGxWaWV3IGlsbHVzdHJhdGVzIHRoZSBhYmlsaXR5IHRvIGludGVyY2VwdCBzY3JvbGwgZXZlbnRzLCBwaXBlIHRoZW0gdGhyb3VnaFxuICogYW4gZWFzaW5nIGVxdWFzaW9uLCBhbmQgdGhlbiBhcHBseSB0aGVtIHRvIGEgY29udGFpbmVyLiAgVXNlZnVsIGluIHNpdHVhdGlvbnMgd2hlcmVcbiAqIHlvdSB3b3VsZCBsaWtlIHRvIG5vcm1hbGl6ZSBzY3JvbGxpbmcgYWNyb3NzIGFuIHVua25vd24gbnVtYmVyIG9mIGRldmljZXMgLyBwbGF0Zm9ybXNcbiAqIGFuZCBhcHBseSB0aGUgcmVzdWx0IHRvIGEgcGFyYWxsYXggY29udGFpbmVyIG9yIHR5cGljYWwgd2VicGFnZVxuICpcbiAqIEBhdXRob3IgQ2hyaXN0b3BoZXIgUGFwcGFzIDxjaHJpc0B3aW50ci51cz5cbiAqIEBkYXRlICAgNS4yLjE0XG4jIyNcblxuRE9NICAgICAgICAgICAgICAgPSByZXF1aXJlICcuLi91dGlscy9ET00uY29mZmVlJ1xuU21vb3RoU2Nyb2xsTWl4aW4gPSByZXF1aXJlICcuLi9taXhpbnMvU21vb3RoU2Nyb2xsTWl4aW4uY29mZmVlJ1xuU2Nyb2xsSXRlbSAgICAgICAgPSByZXF1aXJlICcuL1Njcm9sbEl0ZW0uY29mZmVlJ1xuXG5cblNjcm9sbGVyID0gUmVhY3QuY3JlYXRlQ2xhc3NcblxuICAgZGlzcGxheU5hbWU6ICdTY3JvbGxlcidcblxuICAgbWl4aW5zOiBbU21vb3RoU2Nyb2xsTWl4aW5dXG5cblxuICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHNjcm9sbEl0ZW1zOiBbXVxuICAgICAgfVxuXG5cbiAgIGNvbXBvbmVudFdpbGxNb3VudDogLT5cbiAgICAgIEBzZXRTdGF0ZVxuICAgICAgICAgc2Nyb2xsSXRlbXM6IEBwcm9wcy5zY3JvbGxJdGVtc1xuXG5cblxuICAgb25BZGRCdG5DbGljazogLT5cbiAgICAgIEBzdGF0ZS5zY3JvbGxJdGVtcy5wdXNoIHsgbmFtZTogXCJJdGVtICN7QHN0YXRlLnNjcm9sbEl0ZW1zLmxlbmd0aH1cIiB9XG4gICAgICBAZm9yY2VVcGRhdGUoKVxuXG5cblxuICAgZGVsZXRlSXRlbUJ5SW5kZXg6IChpbmRleCkgLT5cbiAgICAgIEBzZXRTdGF0ZVxuICAgICAgICAgc2Nyb2xsSXRlbXM6IF8ud2l0aG91dCBAc3RhdGUuc2Nyb2xsSXRlbXMsIEBzdGF0ZS5zY3JvbGxJdGVtc1tpbmRleF1cblxuXG5cbiAgIHJlbmRlcjogLT5cbiAgICAgIHtkaXYsIGJ1dHRvbn0gPSBET01cblxuICAgICAgc2Nyb2xsSXRlbXMgPSBAc3RhdGUuc2Nyb2xsSXRlbXMubWFwIChpdGVtLCBpbmRleCkgPT5cbiAgICAgICAgIFNjcm9sbEl0ZW1cbiAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpdGVtLmJhY2tncm91bmRDb2xvclxuICAgICAgICAgICAgZGVsZXRlSXRlbUJ5SW5kZXg6IEBkZWxldGVJdGVtQnlJbmRleFxuXG4gICAgICBkaXYgY2xhc3M6ICd1aS1jb250YWluZXInLFxuICAgICAgICAgYnV0dG9uIG9uQ2xpY2s6IEBvbkFkZEJ0bkNsaWNrLCAnQWRkIGFkZGl0aW9uYWwgaXRlbSdcblxuICAgICAgICAgZGl2IGNsYXNzOiAnc2Nyb2xsLWNvbnRhaW5lcicsIHJlZjogJ3Njcm9sbENvbnRhaW5lcicsXG4gICAgICAgICAgICBzY3JvbGxJdGVtc1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsZXIiLCIjIyMqXG4gKiBQcm92aWRlcyBzbW9vdGgsIGhhcmR3YXJlLWFjY2VsbGVyYXRlZCBlYXNlLWJhc2VkIHNjcm9sbGluZyBmb3IgY29udGFpbmVyXG4gKiBlbGVtZW50cyBieSBub3JtYWxpemluZyBzY3JvbGwgYmVoYXZpb3IgYWNyb3NzIGRpZmZlcmVudCBicm93c2VycyAvIHBsYXRmb3Jtcy5cbiAqIFdvcmtzIGdyZWF0IGZvciBwYXJhbGxheCwgb3Igc2ltcGx5IGJyb3dzaW5nIGEgZG9jdW1lbnQuXG4gKlxuICogQGF1dGhvciBDaHJpc3RvcGhlciBQYXBwYXMgPGNocmlzQHdpbnRyLnVzPlxuICogQGRhdGUgICA1LjE0LjE0XG4jIyNcblxuU21vb3RoU2Nyb2xsTWl4aW4gPVxuXG4gICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICByZXR1cm4ge1xuICAgICAgICAgZnJpY3Rpb246IC4yXG4gICAgICAgICBuZXh0UG9zaXRpb246IDBcbiAgICAgICAgIGN1cnJlbnRQb3NpdGlvbjogMFxuICAgICAgICAgc2Nyb2xsUGVyY2VudDogMFxuICAgICAgfVxuXG5cbiAgIGNvbXBvbmVudERpZE1vdW50OiAtPlxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Njcm9sbCcsIEBvblNjcm9sbFxuXG4gICAgICBAc2V0dXBTdHlsZXMoKVxuICAgICAgQHVwZGF0ZUhlaWdodCgpXG4gICAgICBAYW5pbWF0aW9uTG9vcCgpXG5cblxuXG4gICBjb21wb25lbnREaWRVcGRhdGU6IC0+XG4gICAgICBAdXBkYXRlSGVpZ2h0KClcblxuXG5cbiAgIHNldHVwU3R5bGVzOiAtPlxuICAgICAgQHJlZnMuc2Nyb2xsQ29udGFpbmVyLmdldERPTU5vZGUoKS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCdcblxuXG5cbiAgIHVwZGF0ZUhlaWdodDogLT5cbiAgICAgICRjb250YWluZXIgPSBAcmVmcy5zY3JvbGxDb250YWluZXIuZ2V0RE9NTm9kZSgpXG4gICAgICAkY29udGFpbmVyLnBhcmVudE5vZGUuc3R5bGUuaGVpZ2h0ID0gJGNvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyAncHgnXG5cblxuXG4gICBhbmltYXRpb25Mb29wOiAtPlxuICAgICAgJGNvbnRhaW5lciA9IEByZWZzLnNjcm9sbENvbnRhaW5lci5nZXRET01Ob2RlKClcblxuICAgICAgQHN0YXRlLmN1cnJlbnRQb3NpdGlvbiArPSB+fihAc3RhdGUubmV4dFBvc2l0aW9uIC0gQHN0YXRlLmN1cnJlbnRQb3NpdGlvbikgKiBAc3RhdGUuZnJpY3Rpb25cbiAgICAgIEBzdGF0ZS5zY3JvbGxQZXJjZW50ICAgID0gfn4oQHN0YXRlLmN1cnJlbnRQb3NpdGlvbiAvIChwYXJzZUludCgkY29udGFpbmVyLnBhcmVudE5vZGUuc3R5bGUuaGVpZ2h0KSAtIHdpbmRvdy5pbm5lckhlaWdodCkgKiAxMDApXG5cbiAgICAgIFR3ZWVuTGl0ZS5zZXQgJGNvbnRhaW5lcixcbiAgICAgICAgIHk6IC1Ac3RhdGUuY3VycmVudFBvc2l0aW9uXG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0aW9uTG9vcFxuXG5cblxuICAgb25TY3JvbGw6IC0+XG4gICAgICBAc2V0U3RhdGVcbiAgICAgICAgIG5leHRQb3NpdGlvbjogd2luZG93LnNjcm9sbFlcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNtb290aFNjcm9sbE1peGluIiwiIyBVdGlsbGl0eSBoZWxwZXIgZm9yIHRyaW1taW5nIHVubmVjZXNzYXJ5IHByb3BzIGZyb21cbiMgUmVhY3QuRE9NIGltcG9ydHMuXG4jIEV4dHJhY3RlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tL3JlYWN0aW9uYXJ5L1xuXG57RE9NfSA9IFJlYWN0XG5cbmZvciB0YWdOYW1lIG9mIERPTVxuICAgZG8gKHRhZ05hbWUpID0+IG1vZHVsZS5leHBvcnRzW3RhZ05hbWVdID0gKGFyZ3MuLi4pIC0+IHRhZyh0YWdOYW1lLCBhcmdzLi4uKVxuXG50YWcgPSAobmFtZSwgYXJncy4uLikgLT5cbiAgIGlmIGFyZ3NbMF0/LmNvbnN0cnVjdG9yIGlzIE9iamVjdFxuICAgICAgYXR0cmlidXRlcyA9IGFyZ3Muc2hpZnQoKVxuICAgZWxzZVxuICAgICAgYXR0cmlidXRlcyA9IHt9XG5cbiAgIGlmIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ2NsYXNzJylcbiAgICAgIGF0dHJpYnV0ZXMuY2xhc3NOYW1lID0gYXR0cmlidXRlcy5jbGFzc1xuICAgICAgZGVsZXRlIGF0dHJpYnV0ZXMuY2xhc3NcblxuICAgRE9NW25hbWVdKGF0dHJpYnV0ZXMsIGFyZ3MuLi4pIl19

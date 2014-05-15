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
    this.updateHeight()
    this.animationLoop()
    this.forceUpdate()
  },


  componentDidUpdate: function() {
    this.updateHeight()
    window.addEventListener( 'scroll', this.onScroll )
  },


  updateHeight: function() {
    var $container = thisrefs.scrollContainer.getDOMNode()
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
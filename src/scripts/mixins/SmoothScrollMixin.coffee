###*
 * Provides smooth, hardware-accellerated ease-based scrolling for container
 * elements by normalizing scroll behavior across different browsers / platforms.
 * Works great for parallax, or simply browsing a document.
 *
 * @author Christopher Pappas <chris@wintr.us>
 * @date   5.14.14
###

SmoothScrollMixin =

   getInitialState: ->
      return {
         friction: .2
         nextPosition: 0
         currentPosition: 0
         scrollPercent: 0
      }


   componentDidMount: ->
      @setupStyles()
      @updateHeight()
      @animationLoop()
      @forceUpdate()



   componentDidUpdate: ->
      @updateHeight()
      window.addEventListener 'scroll', @onScroll



   setupStyles: ->
      @refs.scrollContainer.getDOMNode().style.position = 'fixed'



   updateHeight: ->
      $container = @refs.scrollContainer.getDOMNode()
      $container.parentNode.style.height = $container.offsetHeight + 'px'



   animationLoop: ->
      $container = @refs.scrollContainer.getDOMNode()

      @state.currentPosition += ~~(@state.nextPosition - @state.currentPosition) * @state.friction
      @state.scrollPercent    = ~~(@state.currentPosition / (parseInt($container.parentNode.style.height) - window.innerHeight) * 100)

      TweenLite.set $container,
         y: -@state.currentPosition

      requestAnimationFrame @animationLoop



   onScroll: ->
      @state.nextPosition = window.scrollY
      @forceUpdate()


module.exports = SmoothScrollMixin
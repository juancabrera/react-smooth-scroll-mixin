###*
 * Provides ease-based scrolling to containers with css position:fixed
 *
 * @author Christopher Pappas <chris@wintr.us>
 * @date   5.2.14
###


SmoothScrollMixin =

   getInitialState: ->
      return {
         friction: .3
         nextPosition: 0
         currentPosition: 0
      }


   componentDidMount: ->
      @updateHeight()
      @animationLoop()
      @forceUpdate()



   componentDidUpdate: ->
      @updateHeight()
      window.addEventListener 'scroll', @onScroll



   updateHeight: ->
      $container = @refs.scrollContainer.getDOMNode()
      $container.parentNode.style.height = $container.offsetHeight + 'px'



   animationLoop: ->
      @state.currentPosition += ~~(@state.nextPosition - @state.currentPosition) * @state.friction

      TweenLite.set @refs.scrollContainer.getDOMNode(),
         y: -@state.currentPosition

      requestAnimationFrame @animationLoop



   onScroll: ->
      @state.nextPosition = window.scrollY
      @forceUpdate()


module.exports = SmoothScrollMixin
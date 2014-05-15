###*
 * ScrollView illustrates the ability to intercept scroll events, pipe them through
 * an easing equasion, and then apply them to a container.  Useful in situations where
 * you would like to normalize scrolling across an unknown number of devices / platforms
 * and apply the result to a parallax container or typical webpage
 *
 * @author Christopher Pappas <chris@wintr.us>
 * @date   5.2.14
###

DOM               = require '../utils/DOM.coffee'
SmoothScrollMixin = require '../mixins/SmoothScrollMixin'
ScrollItem        = require './ScrollItem.coffee'


Scroller = React.createClass


   mixins: [SmoothScrollMixin]


   getInitialState: ->
      return {
         scrollItems: []
      }


   componentWillMount: ->
      @setState
         scrollItems: @props.scrollItems



   onClick: ->
      @state.scrollItems.push { name: "Item #{@state.scrollItems.length}" }
      @forceUpdate()



   render: ->
      {div, button} = DOM

      div class: 'ui-container',
         button onClick: @onClick, 'Add additional item'

         div class: 'scroll-container', ref: 'scrollContainer',
            @state.scrollItems.map (item) ->
               ScrollItem name: item.name


module.exports = Scroller
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
SmoothScrollMixin = require '../mixins/SmoothScrollMixin.coffee'
ScrollItem        = require './ScrollItem.coffee'


Scroller = React.createClass

  displayName: 'Scroller'

  mixins: [SmoothScrollMixin]

  getInitialState: ->
    return {
      scrollItems: []
    }

  componentWillMount: ->
    @setState
      scrollItems: @props.scrollItems


  onAddBtnClick: ->
    @state.scrollItems.push { name: "Item #{@state.scrollItems.length}" }
    @forceUpdate()


  deleteItemByIndex: (index) ->
    @setState
      scrollItems: _.without @state.scrollItems, @state.scrollItems[index]


   render: ->
    {div, button} = DOM

    scrollItems = @state.scrollItems.map (item, index) =>
      ScrollItem
        name: item.name,
        index: index
        backgroundColor: item.backgroundColor
        deleteItemByIndex: @deleteItemByIndex

    div class: 'ui-container',
      button onClick: @onAddBtnClick, 'Add additional item'

      div class: 'scroll-container', ref: 'scrollContainer',
        scrollItems


module.exports = Scroller

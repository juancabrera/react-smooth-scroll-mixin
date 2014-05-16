
DOM = require '../utils/DOM.coffee'


ScrollItem = React.createClass

   displayName: 'ScrollItem'


   onClick: (event) ->
      $item = @getDOMNode()
      $item.style.backgroundColor = 'red'

      @props.deleteItemByIndex @props.index

      return

      TweenMax.to $item, .4,
         height: 0
         autoAlpha: 0
         ease: Back.easeIn
         onComplete: =>



   render: ->
      {div, h1} = DOM

      style =
         backgroundColor: @props.backgroundColor

      div class: 'item', style: style, onClick: @onClick,
         h1 @props.name



module.exports = ScrollItem
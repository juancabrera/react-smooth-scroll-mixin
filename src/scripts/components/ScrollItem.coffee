
DOM = require '../utils/DOM.coffee'


ScrollItem = React.createClass

   displayName: 'ScrollItem'


   onClick: (event) ->
      @props.deleteItemByIndex @props.index


   render: ->
      {div, h1} = DOM

      style =
         backgroundColor: @props.backgroundColor

      div class: 'item', style: style, onClick: @onClick,
         h1 @props.name



module.exports = ScrollItem
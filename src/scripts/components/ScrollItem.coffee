
DOM = require '../utils/DOM.coffee'


ScrollItem = React.createClass

   render: ->
      {div, h1} = DOM

      div class: 'item',
         h1 @props.name



module.exports = ScrollItem
Scroller = require './components/Scroller.coffee'

scrollItems = (_.range 20).map (item, index) ->
   return {
      name: "Item #{index}"
      backgroundColor: 'blue'
   }

React.renderComponent Scroller({ scrollItems: scrollItems }), document.getElementById 'container'
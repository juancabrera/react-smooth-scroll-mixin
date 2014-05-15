Scroller = require './components/Scroller.coffee'

scrollItems = (_.range 5).map (item, index) ->
   return name: "Item #{index}"

React.renderComponent Scroller( scrollItems: scrollItems ), document.getElementById 'container'
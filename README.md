SmoothScroll React.js Mixin
===========================

Provides smooth, hardware-accellerated ease-based scrolling for container elements by normalizing scroll behavior across different browsers / platforms.   Works great for parallax, or simply browsing a document.

Right now it relies on Greensocks TweenLite for handling cross-browser positioning and smooth updates, but its by no means a requirement.  Simply replace that ref with your own.

Requirements
------------

1.  Make sure that the container that you would like to scroll has a ref named `scrollContainer`; and

2.  In your css, make sure that you've applied `position: fixed` to the container class.  This is in order to override the natural scroll behavior while still keeping scrollbar functionality intact.


Example use with Browserify:
----------------------------

```

SmoothScrollMixing = require './SmoothScrollMixin.coffee'

ScrollingApp = React.createClass

  mixins: [SmoothScrollMixin]

  render: ->
    {div} = React.DOM

    div className: 'scroll-container', ref: 'scrollContainer',
      div className: 'really-really-tall-element'

```

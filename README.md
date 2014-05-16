SmoothScroll React.js Mixin
===========================

Provides smooth, hardware-accellerated ease-based scrolling for container elements by normalizing scroll behavior across different browsers / platforms.   Works great for parallax, or simply browsing a document.

Check out an example here: https://smoothscrollmixin.firebaseapp.com/


Usage
------------

1.  Make sure that the container that you would like to scroll has a ref named `scrollContainer`.

2.  Right now it relies on Greensock's TweenLite for handling cross-browser positioning and smooth updates via `transform`, but its by no means a requirement.  Simply replace the ref with your own.

3.  On scroll, the total percentage is set on the state under `scrollPercentage`.  Use this if you would like to coordinate scroll layers for parallax or sync with GreenSock's TimelineMax.


Example
-------

(Vanilla JavaScript version is in `lib`)

```

SmoothScrollMixin = require './SmoothScrollMixin.coffee'

ScrollingApp = React.createClass

  mixins: [SmoothScrollMixin]

  render: ->
    {div} = React.DOM

    div className: 'scroll-container', ref: 'scrollContainer',
      div className: 'really-really-tall-element'

```


Development
-------------
- Install Node
 - [Node.js Installer](http://nodejs.org/)
- Install Grunt command line interface
 - `sudo npm install -g grunt-cli`
- For sourcemap support, SASS needs to be installed with the --pre flag
 - `gem install sass --pre`
- Clone and cd into the repo
 - `git clone https://github.com/damassi/smooth-scroll-test.git && cd smooth-scroll-test`
- Then install Grunt task dependencies
 - `npm install`



Development Tasks
-----------------

- For development: `grunt dev` then navigate to `http://localhost:3001` (or IP address).
- Copy mixin to the `lib` folder via `grunt lib`



License
-------

MIT
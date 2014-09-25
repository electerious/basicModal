# basicModal

Easy-to-use dialog system for modern web-apps.

![Modal Screenshot](http://l.electerious.com/uploads/big/b7c495109ae6b213b8367bdd7815c68a.png)

basicModal is a dialog-system for modern web-apps. It includes everything you need to display information, ask questions or request input from the user. Modals can be chained, so you can easily build a setup-assistant or show dialogs in a predefined order. Invalid input can be highlighted and handled using the included function.

basicModal uses [SASS](http://sass-lang.com/), [CoffeeScript](http://coffeescript.org/), [CSS3 Flexbox](http://dev.w3.org/csswg/css-flexbox/) and only requires [jQuery](http://jquery.com/) on your website.

Tested with the latest versions of [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/), [Apple Safari](https://www.apple.com/safari/), [Google Chrome](https://www.google.com/chrome/browser/), [Microsoft Internet Explorer](http://windows.microsoft.com/en-us/internet-explorer/download-ie) (10+) and [Opera](http://www.opera.com/).

## Installation

We recommend to install basicModall using [Bower](http://bower.io/).

	bower install basicModal --save
	
## Requirements

basicModal requires jQuery >= 2.1.0

	bower install jquery --save
	
## Include

Include the CSS file in the `head` and the JS file at the end of your `body`. Make sure you include [jQuery](http://jquery.com/) before the JS file of basicModal.

```html
<head>
  <link type="text/css" rel="stylesheet" href="bower_components/basicModal/dist/basicModal.min.css">
</head>
<body>
  <script src="bower_components/jQuery/dist/jquery.min.js"></script>
  <script src="bower_components/basicModal/dist/basicModal.min.js"></script>
</body>
```

## Demos

* [Alert](http://basicmodal.electerious.com/#alert)
* [Prompt](http://basicmodal.electerious.com/#prompt)
* [Login](http://basicmodal.electerious.com/#login)

## Functions

You can find a list of all avilable functions [on our site](http://basicmodal.electerious.com/#functions).

## License

(MIT License)

Copyright (C) 2014 [Tobias Reich](http://electerious.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# basicModal

Easy-to-use dialog system for modern web-apps.

![Modal Screenshot](http://l.electerious.com/uploads/big/7159e3679c7f52dd5be899cc476c2e72.png)

basicModal is a dialog-system for modern web-apps. It includes everything you need to display information, ask questions or request input from the user. Dialogs can be chained, so you can easily build a setup-assistant or show messages in a predefined order. Invalid input can be highlighted and handled using the included function.

basicModal is written in Vanilla JS and has zero dependencies. It uses [SASS](http://sass-lang.com) and [Flexbox](http://dev.w3.org/csswg/css-flexbox/).

Tested with the latest versions of [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/), [Apple Safari](https://www.apple.com/safari/), [Google Chrome](https://www.google.com/chrome/browser/), [Microsoft Internet Explorer](http://windows.microsoft.com/en-us/internet-explorer/download-ie) (10+) and [Opera](http://www.opera.com/).

## Demos

| Name | Description | Link |
|:-----------|:------------|:------------|
| Alert | Modal similar to `alert()`. The modal contains a message and a button. The message can be filled with HTML and the button fires the specified function when pressed. | [Demo](http://basicmodal.electerious.com/#alert) |
| Prompt | The prompt dialog is great when you want a decision or answer from the user. | [Demo](http://basicmodal.electerious.com/#prompt) |
| Login | Building a login with basicModal is super easy. It includes everything you need, like the ability to highlight invalid input. | [Demo](http://basicmodal.electerious.com/#login) |

## Features

- Works in all modern browsers
- Zero dependencies
- Support for text inputs
- Highlight invalid input
- Execute dialogs in row

## Installation

We recommend to install basicModal using [Bower](http://bower.io/) or [npm](https://npmjs.com).

	bower install basicModal
	npm install basicmodal
	
## Requirements

basicModal dependents on the following browser APIs:

- [classList](http://caniuse.com/#feat=classlist)
- [Flexible Box Layout Module](http://caniuse.com/#feat=flexbox)

Some of these APIs are capable of being polyfilled in older browser. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.
	
## Include

Include the CSS file in the `head` and the JS file at the end of your `body`.

```html
<link rel="stylesheet" href="dist/basicModal.min.css">
<script src="dist/basicModal.min.js"></script>
```

## Functions

You can find a list of available functions [on our site](http://basicmodal.electerious.com/#functions).

## Options

List of options you can pass to the `basicModal.show`-function:

```js
{
	body: '<p>String containing HTML</p>',
	class: 'customClass01 customClass02',
	closable: true,
	callback: undefined,
	buttons: {
		cancel: {
			title: 'Cancel',
			class: 'customButtonClass',
			fn: function(data) { console.log(data) }
		},
		action: {
			title: 'OK',
			class: 'customButtonClass',
			fn: function(data) { console.log(data) }
		}
	}
}
```

| Option | Type | Default | Required |
|:-----------|:------------|:------------|:------------|
| body | String | "" | No |
| class | String | "" | No |
| closable | boolean | true | No |
| callback | Function | undefined | No |
| buttons | Object | undefined | Yes |

basicModal accepts up to two buttons: `cancel` and `action`. Both of them can have the following options:

| Option | Type | Default | Required |
|:-----------|:------------|:------------|
| title | String | "Cancel" or "OK" | No |
| class | String | "" | No |
| fn | Function | undefined | Yes |
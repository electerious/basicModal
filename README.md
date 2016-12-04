# basicModal

Easy-to-use dialog system for modern web-apps.

![Modal Screenshot](https://l.electerious.com/uploads/big/0aac1124d3884e2ac0d62f0879d27333.png)

basicModal is a dialog-system for modern web-apps. It includes everything you need to display information, ask questions or request input from the user. Dialogs can be chained, so you can easily build a setup-assistant or show messages in a predefined order. Invalid input can be highlighted and handled using the included function.

basicModal is written in Vanilla JS and has zero dependencies. It uses [SASS](http://sass-lang.com) and [Flexbox](http://dev.w3.org/csswg/css-flexbox/).

Tested with the latest versions of [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/), [Apple Safari](https://www.apple.com/safari/), [Google Chrome](https://www.google.com/chrome/browser/), [Microsoft Internet Explorer](http://windows.microsoft.com/en-us/internet-explorer/download-ie) (10+) and [Opera](https://www.opera.com/).

## Contents

- [Demos](#demos)
- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
	- [Alert](#alert)
	- [Prompt](#prompt)
	- [Input](#input)
- [Functions](#functions)
	- [Show](#show)
	- [Error](#error)
	- [Visible](#visible)
	- [Action & Cancel](#action--cancel)
	- [Reset](#reset)
	- [Get Values](#get-values)
	- [Close](#close)
- [Options](#options)

## Demos

| Name | Description | Link |
|:-----------|:------------|:------------|
| Alert | Modal similar to `alert()`. The modal contains a message and a button. The message can be filled with HTML and the button fires the specified function when pressed. | [Demo](https://basicmodal.electerious.com/#alert) |
| Prompt | The prompt dialog is great when you want a decision or answer from the user. | [Demo](https://basicmodal.electerious.com/#prompt) |
| Login | Building a login with basicModal is super easy. It includes everything you need, like the ability to highlight invalid input. | [Demo](https://basicmodal.electerious.com/#login) |

## Features

- Works in all modern browsers
- Zero dependencies
- CommonJS and AMD support
- Support for text inputs
- Highlight invalid input
- Execute dialogs in row

## Requirements

basicModal depends on the following browser APIs:

- [classList](http://caniuse.com/#feat=classlist)
- [Flexible Box Layout Module](http://caniuse.com/#feat=flexbox)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## Setup

We recommend to install basicModal using [Bower](https://bower.io/) or [npm](https://npmjs.com).

```sh
bower install basicModal
```
```sh
npm install basicmodal
```

Include the CSS file in the `head` tag and the JS file at the end of your `body` tag…

```html
<link rel="stylesheet" href="dist/basicModal.min.css">
```
```html
<script src="dist/basicModal.min.js"></script>
```

…or skip the JS file and use basicModal as a module:

```js
const basicModal = require('basicmodal')
```

## Usage

### Alert

Lets start with a modal similar to `alert()`. The modal contains a message and a button. The message can be filled with HTML and the button fires the specified function when pressed.

```js
basicModal.show({
	body: '<p>This is a dead-simple alert modal!<br>The message can be filled with anything you want.</p>',
	buttons: {
		action: {
			title: 'Dismiss',
			fn: basicModal.close
		}
	}
})
```

### Prompt

The prompt dialog is great when you want a decision or answer from the user. The only difference from the first example is the additional button.

```js
basicModal.show({
	body: '<p>This type of modal can be used to ask the user questions. Are you sure you want to continue?</p>',
	buttons: {
		cancel: {
			title: 'Cancel',
			fn: basicModal.close
		},
		action: {
			title: 'Continue',
			fn: basicModal.close
		}
	}
})
```

### Input

Building an input-dialog with basicModal is super easy. It includes everything you need, like the ability to highlight invalid fields. The specified action-button-function receives an object which includes the values of all inputs. Use the name attribute in your HTML to set the name of the inputs.

```js
basicModal.show({
	body: '<p>This type of modal can be used to ask the user questions. Please enter your name:</p><input class="basicModal__text" type="text" name="name" placeholder="Jane Doe">',
	buttons: {
		cancel: {
			title: 'Cancel',
			fn: basicModal.close
		},
		action: {
			title: 'Continue',
			fn: (data) => {

				if (data.name.length===0) return basicModal.error('name')

				console.log(data)
				basicModal.close()

			}
		}
	}
})
```

## Functions

basicModal comes with a handful of handy functions. Below are all of them along with a short description.

### Show

The most important function of basicModal. Call `show` to show a modal. The `object` you pass to the function includes all the information about the modal. Take a look at the demos above to get a feel of the capabilities.

```ts
basicModal.show(options: object)
```

### Error

Use the `error` function to highlight invalid input. This function can only be used when the modal has input elements. Each input needs a `name` attribute as shown in the example above. The input with the matching attribute will be marked red and the modal will shake to signal an error. This function also executes the `reset` function, to remove previous errors and to reactive the buttons.

```ts
basicModal.error(nameAttribute: string)
```

### Visible

Check if there's a visible modal. Returns `true` when a modal is visible and `false` otherwise.

```ts
basicModal.visible() : boolean
```

### Action & Cancel

You can trigger the buttons of the modal manually if wanted. Triggering a button is equivalent to clicking them.

```ts
basicModal.action() : boolean
```

```ts
basicModal.cancel() : boolean
```

### Reset

In order to avoid multiple executions of the same function, buttons can only be pressed once before being disabled. Use reset if you want to reactivate the buttons or to reset the highlighted input errors.

```ts
basicModal.reset() : boolean
```

### Get Values

The following function returns an object, which includes all input values from the current modal.

```ts
basicModal.getValues() : object
```

### Close

And finally: Close the modal. You can force close a modal by passing true to the function. This is required when the modal is created with the closable property set to `false`.

```ts
basicModal.close(forceClose: boolean) : boolean
```

## Options

List of options you can pass to the `basicModal.show` function:

```js
basicModal.show({

	// String containing HTML (required)
	body: '<p>String containing HTML</p>',

	// String - List of custom classes added to the modal (optional)
	class: 'customClass01 customClass02',

	// Boolean - Define if the modal can be closed with the close-function (optional)
	closable: true,

	// Function - Will fire when modal is visible (optional)
	callback: undefined,

	// Object - basicModal accepts up to two buttons and requires at least one of them
	buttons: {

		cancel: {

			// String (optional)
			title: 'Cancel',

			// String - List of custom classes added to the button (optional)
			class: 'customButtonClass',

			// Function - Will fire when user clicks the button (required)
			fn: basicModal.close

		},

		action: {

			// String (optional)
			title: 'OK',

			// String - List of custom classes added to the button (optional)
			class: 'customButtonClass',

			// Function - Will fire when user clicks the button (required)
			fn: (data) => basicModal.close()

		}

	}

})
```

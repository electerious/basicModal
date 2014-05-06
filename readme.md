# basicModal

Easy-to-use modal window for your website or webapp.

![Modal Screenshot](http://l.electerious.com/uploads/big/b7c495109ae6b213b8367bdd7815c68a.png)

## Installation

	bower install basicModal
	
## Requirements

basicModal requires jQuery >= 2.1.0
	
## How to use

Simply include the following files in your HTML:

```html
<link type="text/css" rel="stylesheet" href="bower_components/basicModal/dist/basicModal.min.css">
<script async type="text/javascript" src="bower_components/jQuery/dist/jquery.min.js"></script>
<script async type="text/javascript" src="bower_components/basicModal/dist/basicModal.min.js"></script>
```

Show a modal by using the following command:

```coffee
modal.show
	body:	"""
			<p>This step will reset your username and password, allowing you to change your login. Are your sure?</p>
			"""
	closable: true
	buttons:
		cancel:
			title: 'Cancel'
			fn: -> modal.close()
		action:
			title: 'Reset login'
			color: 'normal'
			icon: ''
			fn: -> modal.close()
```

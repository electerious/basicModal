let lastFocus = null

export const THEME = {
	small  : 'basicModal__small',
	xclose : 'basicModal__xclose'
}

const dom = function(elem = '', multiple = false) {

	if (multiple===true) return document.querySelectorAll('.basicModal ' + elem)
	else                 return document.querySelector('.basicModal ' + elem)

}

const each = function(data, fn) {

	if (data==null) return false

	if ((data).constructor===Object) return Array.prototype.forEach.call(Object.keys(data), (key) => fn(data[key], key, data))
	else                             return Array.prototype.forEach.call(data, (item, i) => fn(item, i, data))

}

const valid = function(data) {

	if (data==null || Object.keys(data).length===0) {
		console.error('Missing or empty modal configuration object')
		return false
	}

	if (data.body==null)       data.body = ''
	if (data.class==null)      data.class = ''
	if (data.closable!==false) data.closable = true

	if (data.buttons==null) {
		console.error('basicModal requires at least one button')
		return false
	}

	// Validate action-button
	if (data.buttons.action!=null) {

		if (data.buttons.action.class==null) data.buttons.action.class = ''
		if (data.buttons.action.title==null) data.buttons.action.title = 'OK'

		if (data.buttons.action.fn==null) {
			console.error('Missing fn for action-button')
			return false
		}

	}

	// Validate cancel-button
	if (data.buttons.cancel!=null) {

		if (data.buttons.cancel.class==null) data.buttons.cancel.class = ''
		if (data.buttons.cancel.title==null) data.buttons.cancel.title = 'Cancel'

		if (data.buttons.cancel.fn==null) {
			console.error('Missing fn for cancel-button')
			return false
		}

	}

	return true

}

const build = function(data) {

	let icon = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M405 136.798l-29.798-29.798-119.202 119.202-119.202-119.202-29.798 29.798 119.202 119.202-119.202 119.202 29.798 29.798 119.202-119.202 119.202 119.202 29.798-29.798-119.202-119.202z"/></svg>'
	let html = ''

	html += `
	        <div class='basicModalContainer basicModalContainer--fadeIn' data-closable='${ data.closable }'>
	            <div class='basicModal basicModal--fadeIn ${ data.class }' role="dialog">
	                <div class='basicModal__content'>
	                    ${ data.body }
	                </div>
	                <div class='basicModal__buttons'>
	        `

	// Cancel-button
	if (data.buttons.cancel!=null) {
		if (data.buttons.cancel.class.indexOf('basicModal__xclose')===-1) {

			// Default close-button
			html +=	`<a id='basicModal__cancel' class='basicModal__button ${ data.buttons.cancel.class }'>${ data.buttons.cancel.title }</a>`

		} else {

			// Custom close-button for the login-theme
			html += `<div id='basicModal__cancel' class='basicModal__button ${ data.buttons.cancel.class }' aria-label='close'>${ icon }</div>`

		}
	}

	// Action-button
	if (data.buttons.action!=null) {

		html += `<a id='basicModal__action' class='basicModal__button ${ data.buttons.action.class }'>${ data.buttons.action.title }</a>`

	}

	html += `
	                </div>
	            </div>
	        </div>
	        `

	return html

}

export const getValues = function() {

	let values  = {}
	let inputs  = dom('input[name]', true)
	let selects = dom('select[name]', true)

	// Get value from all inputs
	each(inputs, (input) => {

		let name  = input.getAttribute('name')
		let value = input.value

		// Store name and value of input
		values[name] = value

	})

	// Get selected value from all selects
	each(selects, (select) => {

		let name  = select.getAttribute('name')
		let value = select.options[select.selectedIndex].value

		// Store name and value of select
		values[name] = value

	})

	return (Object.keys(values).length===0 ? null : values)

}

const bind = function(data) {

	// Cancel-button
	if (data.buttons.cancel!=null) {

		dom('#basicModal__cancel').onclick = function() {

			// Don't execute function when button has been clicked already
			if (this.classList.contains('basicModal__button--active')===true) return false

			this.classList.add('basicModal__button--active')
			data.buttons.cancel.fn()

		}

	}

	// Action-button
	if (data.buttons.action!=null) {

		dom('#basicModal__action').onclick = function() {

			// Don't execute function when button has been clicked already
			if (this.classList.contains('basicModal__button--active')===true) return false

			this.classList.add('basicModal__button--active')
			data.buttons.action.fn(getValues())

		}

	}

	// Bind inputs
	each(dom('input', true), (input) => {

		input.oninput = input.onblur = function() { this.classList.remove('error') }

	})

	// Bind selects
	each(dom('select', true), (select) => {

		select.onchange = select.onblur = function() { this.classList.remove('error') }

	})

	return true

}

export const show = function(data) {

	// Validate data and set default values
	if (valid(data)===false) return false

	// Close open modal
	if (dom()!=null) {
		close(true)
		setTimeout(() => show(data), 301)
		return false
	}

	// Save focused element
	lastFocus = document.activeElement

	// Build modal
	let html = build(data)

	// Append modal to DOM
	document.body.insertAdjacentHTML('beforeend', html)

	// Bind elements
	bind(data)

	// Select the first input when available
	let input = dom('input')
	if (input!=null) input.select()

	// If there is no input but a select, select it
	let select = dom('select')
	if (input==null && select!=null) select.focus()

	// Execute callback when available
	if (data.callback!=null) data.callback(data)

	return true

}

export const error = function(nameAttribute) {

	// Reactive buttons and remove old errors
	reset()

	// Select element with the given name attribute
	let elem = dom(`input[name='${ nameAttribute }']`) || dom(`select[name='${ nameAttribute }']`)

	// Stop function when element not found
	if (elem==null) return false

	elem.classList.add('error')

	if (typeof elem.select==='function') elem.select()
	else                                 elem.focus()

	// Shake input or select
	dom().classList.remove('basicModal--fadeIn', 'basicModal--shake')
	setTimeout(() => dom().classList.add('basicModal--shake'), 1)

}

export const visible = function() {

	if (dom()!=null) return true
	return false

}

export const action = function() {

	let elem = dom('#basicModal__action')

	if (elem!=null) {

		elem.click()
		return true

	}

	return false

}

export const cancel = function() {

	let elem = dom('#basicModal__cancel')

	if (elem!=null) {

		elem.click()
		return true

	}

	return false

}

export const reset = function() {

	// Reactive buttons
	let buttons = dom('.basicModal__button', true)
	each(buttons, (button) => button.classList.remove('basicModal__button--active'))

	// Remove errors from inputs
	let inputs = dom('input', true)
	each(inputs, (input) => input.classList.remove('error'))

	// Remove errors from selects
	let selects = dom('select', true)
	each(selects, (select) => select.classList.remove('error'))

	return true

}

export const close = function(force = false) {

	// Only close when a modal is visible
	if (visible()===false) return false

	// Get modal container
	let container = dom().parentElement

	// Don't close when modal not closable
	// Use 'force===true' to close unclosebale modal
	if (container.getAttribute('data-closable')==='false' && force===false) return false

	container.classList.remove('basicModalContainer--fadeIn')
	container.classList.add('basicModalContainer--fadeOut')

	setTimeout(() => {

		// Only close when container exists
		if (container==null)               return false
		if (container.parentElement==null) return false

		container.parentElement.removeChild(container)

	}, 300)

	// Restore last active element
	if (lastFocus!=null) {
		lastFocus.focus()
		lastFocus = null
	}

	return true

}
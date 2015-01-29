this.basicModal =

	_lastFocus: null

	_dom: (elem) ->

		if not elem? then return $('.basicModal')
		else return $('.basicModal').find("#{ elem }")

	_valid: (data) ->

		if data?

			###
			# Set defaults
			###

			if not data.body? then		data.body = ''
			if not data.class? then		data.class = ''
			if not data.closable? then	data.closable = true

			if data.buttons?.action?

				if not data.buttons.action.class? then	data.buttons.action.class = ''
				if not data.buttons.action.title? then	data.buttons.action.title = 'OK'

			if data.buttons?.cancel?

				if not data.buttons.cancel.title? then	data.buttons.cancel.title = 'Cancel'

			else if data.buttons?.action?

				data.buttons.action.class += ' basicModal__button--full'

			return true

		return false

	_build: (data) ->

		html =	"""
				<div class='basicModalContainer basicModalContainer--fadeIn' data-closable='#{ data.closable }'>
					<div class='basicModal basicModal--fadeIn #{ data.class }' role="dialog">
						#{ data.body }
				"""

		if data.buttons?.cancel?
			if data.class.indexOf('login') is -1
				# Default close-button
				html += "<a id='basicModal__cancel' class='basicModal__button'>#{ data.buttons.cancel.title }</a>"
			else
				# Custom close-button for the login-theme
				html += "<div id='basicModal__cancel' class='basicModal__button' aria-label='close'><a class='ion-close'></a></div>"

		if data.buttons?.action?
			html += "<a id='basicModal__action' class='basicModal__button #{ data.buttons.action.class }'>#{ data.buttons.action.title }</a>"

		html +=	"""
					</div>
				</div>
				"""

		return html

	_getValues: ->

		values = null

		if	basicModal._dom('input').length isnt 0 or
			basicModal._dom('.basicModal__dropdown').length isnt 0

				values = {}

				basicModal._dom('input').each ->
					name	= $(this).attr('data-name')
					value	= $(this).val()
					values[name] = value

				basicModal._dom('.basicModal__dropdown').each ->
					name	= $(this).attr('data-name')
					value	= $(this).attr('data-value')
					values[name] = value

		return values

	_bind: (data) ->

		# Bind cancel button
		if data.buttons?.cancel?.fn?
			basicModal._dom('#basicModal__cancel').click ->
				return false if $(this).hasClass 'basicModal__button--active'
				$(this).addClass 'basicModal__button--active'
				data.buttons.cancel.fn()

		# Bind action button
		if data.buttons?.action?.fn?
			basicModal._dom('#basicModal__action').click ->
				return false if $(this).hasClass 'basicModal__button--active'
				$(this).addClass 'basicModal__button--active'
				data.buttons.action.fn basicModal._getValues()

		# Bind input
		basicModal._dom('input').keydown -> $(this).removeClass 'error'

		###
		# Bind dropdown
		###

		dropdownTimeout = null

		basicModal._dom('.basicModal__dropdown .front').click ->

			dropdown = $(this).parent()

			clearTimeout dropdownTimeout

			dropdown.find('.back').show()
			dropdown.addClass 'flip'

		basicModal._dom('.basicModal__dropdown .back ul li[class!="separator"]').click ->

			dropdown = $(this).parent().parent().parent()

			value = $(this).clone()
			value.find('span').remove()
			value = value.html().trim()

			dropdown.find('.front span').html value
			dropdown.attr 'data-value', $(this).data('value')
			dropdown.removeClass 'flip'
			dropdownTimeout = setTimeout ->
				dropdown.find('.back').hide()
			, 3000

	show: (data) ->

		# Validate data
		return false if not basicModal._valid data

		# Save focused element
		basicModal._lastFocus = document.activeElement

		# Remove open modal

		if basicModal._dom().parent().length isnt 0
			basicModal.close true
			setTimeout ->
				basicModal.show data
			, 301
			return false

		# Build and append
		$('body').append basicModal._build(data)

		# Bind elements
		basicModal._bind data

		# Select first input
		basicModal._dom('input')[0].focus()

		# Call callback
		callback() if data.callback?

		return true

	error: (input) ->

		# Reactive buttons and remove old errors
		basicModal.reset()

		# Focus input
		basicModal._dom("input[data-name='#{ input }'], .basicModal__dropdown[data-name='#{ input }']")
			.addClass 'error'
			.focus().select()

		# Shake
		basicModal._dom().removeClass 'basicModal--fadeIn basicModal--shake'
		setTimeout ->
			basicModal._dom().addClass 'basicModal--shake'
		, 1

	visible: ->

		if basicModal._dom().parent().length is 0 then return false
		return true

	action: ->

		if basicModal._dom('#basicModal__action').length isnt 0

			basicModal._dom('#basicModal__action').click()
			return true

		return false

	cancel: ->

		if basicModal._dom('#basicModal__cancel').length isnt 0

			basicModal._dom('#basicModal__cancel').click()
			return true

		return false

	reset: ->

		# Reactive buttons
		basicModal._dom('.basicModal__button').removeClass 'basicModal__button--active'

		# Remove old error
		basicModal._dom('.input, .basicModal__dropdown').removeClass 'error'

		return true

	close: (force) ->

		###
		Close modal if force is not set or true,
		or mouse is not over modal.
		###

		container = basicModal._dom().parent()

		if	not force? or
			force is true

				# Don't close when not closable
				return false if container.attr('data-closable') isnt 'true' and force isnt true

				container.removeClass('basicModalContainer--fadeIn').addClass('basicModalContainer--fadeOut')
				setTimeout ->
					container.remove()
				, 300

				# Restore last active element
				if basicModal._lastFocus?
					basicModal._lastFocus.focus()
					basicModal._lastFocus = null

				return true

		return false
this.modal =

	_valid: (data) ->

		if data?

			# Set defaults
			data.body = '' if not data.body?
			data.class = '' if not data.class?
			data.closable = true if not data.closable?

			return true

		return false

	_build: (data) ->

		html =	"""
				<div class='modalContainer fadeIn' data-closable='#{ data.closable }'>
					<div class='modal fadeIn #{ data.class }'>
						#{ data.body }
				"""

		if data.buttons?.cancel?
			html += "<a id='cancel' class='button'>#{ data.buttons.cancel.title }</a>"

		if data.buttons?.action?
			html += "<a id='action' class='button #{ data.buttons.action.color }'>"
			if data.buttons?.action?.icon? then html += "<span class='#{ data.buttons.action.icon }'></span>"
			html += "#{ data.buttons.action.title }</a>"

		html +=	"""
					</div>
				</div>
				"""

		return html

	_getValues: ->

		values = null

		if $(".modalContainer input").length isnt 0

			values = {}
			$(".modalContainer input").each ->
				name	= $(this).data('name')
				value	= $(this).val()
				values[name] = value

		return values

	show: (data) ->

		# Validate data
		return false if not modal._valid data

		# Remove open modal
		if $(".modalContainer").length isnt 0
			modal.close true
			setTimeout ->
				modal.show data
			, 301
			return false

		# Build and append
		$('body').append modal._build(data)

		# Bind cancel button
		if data.buttons?.cancel?.fn?
			$('.modalContainer #cancel').click data.buttons.cancel.fn

		# Bind action button
		if data.buttons?.action?.fn?
			$('.modalContainer #action').click -> data.buttons.action.fn modal._getValues()

		# Bind inputs
		$('.modalContainer input').keydown -> $(this).removeClass 'error'

		# Call callback
		if data.callback?
			callback()
			return true

		return true

	error: (input) ->

		# Reactive button
		$('.modalContainer #action').removeClass 'active'

		# Remove old error
		$('.modalContainer input').removeClass 'error'

		# Focus input
		$(".modalContainer input[data-name='#{ input }']")
			.addClass 'error'
			.focus().select()

		# Shake
		$('.modalContainer .modal').removeClass 'fadeIn shake'
		setTimeout ->
			$('.modalContainer .modal').addClass 'shake'
		, 1

	close: (force) ->

		###
		Close modal if force is not set or true,
		or mouse is not over modal.
		###
		if	not force? or
			force is true

				# Don't close when not closable
				return false if $('.modalContainer[data-closable=true]').length is 0 and force isnt true

				$('.modalContainer').removeClass('fadeIn').addClass('fadeOut')
				setTimeout ->
					$(".modalContainer").remove()
					return true
				, 300

				return true

		return false
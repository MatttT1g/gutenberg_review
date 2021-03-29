( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;

	blocks.registerBlockType( 'gutenberg-examples/review-card', {
		title: 'Отзыв',
		icon: 'index-card',
		category: 'layout',
		attributes: {
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			position: {
				type: 'array',
				source: 'children',
				selector: '.position',
			},
			text: {
				type: 'array',
				source: 'children',
				selector: '.text',
			},
		},


		edit: function( props ) {
			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			return el(
				'div',
				{ className: props.className },
				el(
					'div',
					{ className: 'review-image' },
					el( MediaUpload, {
						onSelect: onSelectImage,
						allowedTypes: 'image',
						value: attributes.mediaID,
						render: function( obj ) {
							return el(
								components.Button,
								{
									className: attributes.mediaID
										? 'image-button'
										: 'button button-large',
									onClick: obj.open,
								},
								! attributes.mediaID
									? 'Добавить фото'
									: el( 'img', { src: attributes.mediaURL } )
							);
						},
					} )
				),
				el( RichText, {
					tagName: 'h2',
					inline: true,
					placeholder: 'Введите имя автора отзыва',
					value: attributes.title,
					onChange: function( value ) {
						props.setAttributes( { title: value } );
					},
				} ),
				el( RichText, {
					tagName: 'h4',
					placeholder: 'Введите должность автора отзыва',
					value: attributes.position,
					onChange: function( value ) {
						props.setAttributes( { position: value } );
					},
					className: 'position',
				} ),
				el( RichText, {
					tagName: 'div',
					multiline: 'p',
					inline: false,
					placeholder: 'Введите текст отзыва',
					value: attributes.text,
					onChange: function( value ) {
						props.setAttributes( { text: value } );
					},
				} )
			);
		},
		save: function( props ) {
			var attributes = props.attributes;

			return el(
				'div',
				{ className: 'section review' },
				attributes.mediaURL &&
					el(
						'div',
						{ className: 'review-block-img' },
						el( 'img', { src: attributes.mediaURL } )
					),

				el( 
				'div', 
				{ className: 'review-info' }, 
				el( RichText.Content, {
					tagName: 'h2',
					className: 'review-name',
					value: attributes.title,
				} ),
				
				el( RichText.Content, {
					tagName: 'h4',
					className: 'review-position',
					value: attributes.position,
				} ),
				el( RichText.Content, {
					tagName: 'div',
					className: 'service-desc',
					value: attributes.text,
				} )
				),	
				
			);
		},
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._
);

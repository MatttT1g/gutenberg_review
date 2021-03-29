<?php

/**
 * Plugin Name: Review Block
 * Description: Add review block for the Gutenberg editor.
 * Version: 1.0.0
 * Author: Test
 *
 */

function review_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'review-block',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'review-block',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'gutenberg-examples/review-card', array(
		'style' => 'review-block',
		'editor_script' => 'review-block',
	) );

}
add_action( 'init', 'review_register_block' );

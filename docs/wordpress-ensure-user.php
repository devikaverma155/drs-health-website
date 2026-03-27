<?php
/**
 * WordPress: Ensure a user exists in wp_users (get or create).
 * Use this so checkout creates a real WordPress user, not only a "customer" record.
 * Then the order can be linked to that user and show in My Account / Account → Orders.
 *
 * Install: copy to wp-content/mu-plugins/drs-ensure-user.php
 *
 * In wp-config.php add (same secret as in Next.js .env):
 *   define( 'DRS_ENSURE_USER_SECRET', 'your_shared_secret' );
 *
 * In Next.js .env add:
 *   WC_ORDER_EMAIL_SECRET=your_shared_secret
 * (or use a separate DRS_ENSURE_USER_SECRET if you prefer)
 *
 * Endpoint: POST /wp-json/drs/v1/ensure-user
 * Body (JSON): { "secret": "...", "email": "user@example.com", "first_name": "Jane", "last_name": "Doe" }
 * Response: { "user_id": 123, "is_new": true|false }
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'drs/v1', '/ensure-user', array(
    'methods'             => 'POST',
    'permission_callback' => function ( $request ) {
      $secret_constant = defined( 'DRS_ENSURE_USER_SECRET' ) ? DRS_ENSURE_USER_SECRET : ( defined( 'DRS_ORDER_EMAIL_SECRET' ) ? DRS_ORDER_EMAIL_SECRET : '' );
      if ( ! $secret_constant ) {
        return false;
      }
      $body  = $request->get_json_params();
      $secret = isset( $body['secret'] ) ? $body['secret'] : '';
      return $secret === $secret_constant;
    },
    'args'                => array(
      'email' => array(
        'required'          => true,
        'type'              => 'string',
        'format'             => 'email',
        'sanitize_callback'  => 'sanitize_email',
      ),
      'first_name' => array(
        'type'              => 'string',
        'sanitize_callback'  => 'sanitize_text_field',
      ),
      'last_name' => array(
        'type'              => 'string',
        'sanitize_callback'  => 'sanitize_text_field',
      ),
    ),
    'callback'            => function ( $request ) {
      $email = $request->get_param( 'email' );
      if ( ! is_email( $email ) ) {
        return new WP_REST_Response( array( 'error' => 'Invalid email' ), 400 );
      }

      $user = get_user_by( 'email', $email );
      if ( $user ) {
        return new WP_REST_Response( array(
          'user_id' => (int) $user->ID,
          'is_new'  => false,
        ), 200 );
      }

      $first_name = $request->get_param( 'first_name' ) ?: '';
      $last_name  = $request->get_param( 'last_name' ) ?: '';
      $login_base = sanitize_user( str_replace( array( '@', '.', '+' ), array( '_', '_', '_' ), $email ), true );
      $username   = $login_base;
      $suffix     = 0;
      while ( username_exists( $username ) ) {
        $suffix++;
        $username = $login_base . '_' . $suffix;
      }

      $password = wp_generate_password( 16, true, true );
      $user_id  = wp_insert_user( array(
        'user_login'   => $username,
        'user_email'   => $email,
        'user_pass'    => $password,
        'first_name'   => $first_name,
        'last_name'    => $last_name,
        'role'         => 'customer',
        'display_name' => trim( $first_name . ' ' . $last_name ) ?: $email,
      ) );

      if ( is_wp_error( $user_id ) ) {
        return new WP_REST_Response( array( 'error' => $user_id->get_error_message() ), 500 );
      }

      return new WP_REST_Response( array(
        'user_id' => (int) $user_id,
        'is_new'  => true,
      ), 200 );
    },
  ) );
} );

<?php
/**
 * Plugin Name: VloerBot Chatbot
 * Plugin URI: https://github.com/yourusername/vloerenhuis-bot
 * Description: AI-powered chatbot widget for flooring companies. Provides intelligent customer support with file upload capabilities.
 * Version: 1.0.12
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: vloerbot
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('VLOERBOT_VERSION', '1.0.12');
define('VLOERBOT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('VLOERBOT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('VLOERBOT_PLUGIN_BASENAME', plugin_basename(__FILE__));

class VloerBot_Chatbot {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_head', array($this, 'inject_custom_styles'));
        add_action('wp_footer', array($this, 'render_chat_widget'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        // Only load on frontend
        if (is_admin()) {
            return;
        }
        
        // Get build assets
        $build_dir = VLOERBOT_PLUGIN_DIR . 'build';
        $build_url = VLOERBOT_PLUGIN_URL . 'build';
        
        // Find the built CSS and JS files
        $css_file = $this->find_build_file($build_dir, 'css');
        $js_file = $this->find_build_file($build_dir, 'js');
        
        if ($css_file) {
            wp_enqueue_style(
                'vloerbot-chatbot',
                $build_url . '/' . $css_file,
                array(),
                VLOERBOT_VERSION
            );
        }
        
        if ($js_file) {
            wp_enqueue_script(
                'vloerbot-chatbot',
                $build_url . '/' . $js_file,
                array(),
                VLOERBOT_VERSION,
                true
            );
            
            // Inject Supabase configuration and profile image
            $supabase_url = get_option('vloerbot_supabase_url', '');
            $supabase_key = get_option('vloerbot_supabase_key', '');
            $profile_image = get_option('vloerbot_profile_image', '');
            
            wp_localize_script('vloerbot-chatbot', 'vloerbotConfig', array(
                'supabaseUrl' => esc_url_raw($supabase_url),
                'supabaseKey' => sanitize_text_field($supabase_key),
                'profileImage' => esc_url_raw($profile_image),
            ));
        }
    }
    
    /**
     * Find build file by extension
     */
    private function find_build_file($dir, $ext) {
        if (!is_dir($dir)) {
            return false;
        }
        
        $files = glob($dir . '/assets/*.' . $ext);
        if (!empty($files)) {
            return 'assets/' . basename($files[0]);
        }
        
        return false;
    }
    
    /**
     * Render chat widget container
     */
    public function render_chat_widget() {
        // Only render on frontend
        if (is_admin()) {
            return;
        }
        
        // Check if Supabase credentials are configured
        $supabase_url = get_option('vloerbot_supabase_url', '');
        $supabase_key = get_option('vloerbot_supabase_key', '');
        
        if (empty($supabase_url) || empty($supabase_key)) {
            // Optionally show admin notice on frontend (only for logged-in admins)
            if (current_user_can('manage_options')) {
                echo '<!-- VloerBot: Please configure Supabase credentials in WordPress admin -->';
            }
            return;
        }
        
        echo '<div id="vloerbot-root"></div>';
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            'VloerBot Settings',
            'VloerBot',
            'manage_options',
            'vloerbot-settings',
            array($this, 'render_settings_page')
        );
    }
    
    /**
     * Enqueue admin scripts (for color pickers)
     */
    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'settings_page_vloerbot-settings') {
            return;
        }
        
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_script('wp-color-picker');
        wp_enqueue_script('jquery');
        wp_enqueue_media(); // For image uploader
    }
    
    /**
     * Inject custom styles based on settings
     */
    public function inject_custom_styles() {
        // Only on frontend
        if (is_admin()) {
            return;
        }
        
        $primary_color = get_option('vloerbot_primary_color', '');
        $accent_color = get_option('vloerbot_accent_color', '');
        $background_color = get_option('vloerbot_background_color', '');
        $font_family = get_option('vloerbot_font_family', '');
        
        if (empty($primary_color) && empty($accent_color) && empty($background_color) && empty($font_family)) {
            return;
        }
        
        echo '<style id="vloerbot-custom-styles">';
        echo '#vloerbot-root, #vloerbot-root * {';
        
        // Set default colors if not set
        $primary_color = !empty($primary_color) ? $primary_color : '#402D21';
        $accent_color = !empty($accent_color) ? $accent_color : '#D5803F';
        
        // Always apply colors (use defaults if not set)
        $hsl_primary = $this->hex_to_hsl($primary_color);
        echo '--primary: ' . $hsl_primary . ';';
        echo '--foreground: ' . $hsl_primary . ';';
        
        $hsl_accent = $this->hex_to_hsl($accent_color);
        echo '--accent: ' . $hsl_accent . ';';
        echo '--chat-user-bg: ' . $hsl_accent . ';';
        
        if (!empty($background_color)) {
            $hsl = $this->hex_to_hsl($background_color);
            echo '--background: ' . $hsl . ';';
            echo '--card: ' . $hsl . ';';
        }
        
        if (!empty($font_family)) {
            // Handle custom font vs predefined
            if ($font_family === 'custom') {
                $custom_font = get_option('vloerbot_custom_font', '');
                if (!empty($custom_font)) {
                    echo 'font-family: ' . esc_attr($custom_font) . ' !important;';
                }
            } else {
                echo 'font-family: ' . esc_attr($font_family) . ' !important;';
            }
        }
        
        echo '}';
        echo '</style>';
    }
    
    /**
     * Convert hex color to HSL format
     */
    private function hex_to_hsl($hex) {
        $hex = str_replace('#', '', $hex);
        $r = hexdec(substr($hex, 0, 2)) / 255;
        $g = hexdec(substr($hex, 2, 2)) / 255;
        $b = hexdec(substr($hex, 4, 2)) / 255;
        
        $max = max($r, $g, $b);
        $min = min($r, $g, $b);
        $delta = $max - $min;
        
        $l = ($max + $min) / 2;
        
        if ($delta == 0) {
            $h = $s = 0;
        } else {
            $s = $l > 0.5 ? $delta / (2 - $max - $min) : $delta / ($max + $min);
            
            switch ($max) {
                case $r:
                    $h = (($g - $b) / $delta + ($g < $b ? 6 : 0)) / 6;
                    break;
                case $g:
                    $h = (($b - $r) / $delta + 2) / 6;
                    break;
                case $b:
                    $h = (($r - $g) / $delta + 4) / 6;
                    break;
            }
        }
        
        $h = round($h * 360);
        $s = round($s * 100);
        $l = round($l * 100);
        
        return $h . ' ' . $s . '% ' . $l . '%';
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('vloerbot_settings', 'vloerbot_supabase_url', array(
            'type' => 'string',
            'sanitize_callback' => 'esc_url_raw',
            'default' => '',
        ));
        
        register_setting('vloerbot_settings', 'vloerbot_supabase_key', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => '',
        ));
        
        register_setting('vloerbot_settings', 'vloerbot_primary_color', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_hex_color',
            'default' => '',
        ));
        
        register_setting('vloerbot_settings', 'vloerbot_accent_color', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_hex_color',
            'default' => '',
        ));
        
        register_setting('vloerbot_settings', 'vloerbot_background_color', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_hex_color',
            'default' => '',
        ));
        
        register_setting('vloerbot_settings', 'vloerbot_font_family', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => '',
        ));
        
        register_setting('vloerbot_settings', 'vloerbot_custom_font', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => '',
        ));
        
        register_setting('vloerbot_settings', 'vloerbot_profile_image', array(
            'type' => 'string',
            'sanitize_callback' => 'esc_url_raw',
            'default' => '',
        ));
    }
    
    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        
        // Save settings
        if (isset($_POST['vloerbot_save_settings']) && check_admin_referer('vloerbot_save_settings')) {
            update_option('vloerbot_supabase_url', sanitize_text_field($_POST['vloerbot_supabase_url']));
            update_option('vloerbot_supabase_key', sanitize_text_field($_POST['vloerbot_supabase_key']));
            update_option('vloerbot_primary_color', sanitize_hex_color($_POST['vloerbot_primary_color'] ?? ''));
            update_option('vloerbot_accent_color', sanitize_hex_color($_POST['vloerbot_accent_color'] ?? ''));
            update_option('vloerbot_background_color', sanitize_hex_color($_POST['vloerbot_background_color'] ?? ''));
            
            // Handle font family - check if custom was selected
            $font_family_input = sanitize_text_field($_POST['vloerbot_font_family'] ?? '');
            if (isset($_POST['vloerbot_font_family_selector']) && $_POST['vloerbot_font_family_selector'] === 'custom') {
                $custom_font = sanitize_text_field($_POST['vloerbot_font_family'] ?? '');
                update_option('vloerbot_font_family', 'custom');
                update_option('vloerbot_custom_font', $custom_font);
            } else {
                update_option('vloerbot_font_family', $font_family_input);
                update_option('vloerbot_custom_font', '');
            }
            
            // Handle profile image
            if (isset($_POST['vloerbot_profile_image'])) {
                update_option('vloerbot_profile_image', esc_url_raw($_POST['vloerbot_profile_image']));
            }
            
            echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
        }
        
        $supabase_url = get_option('vloerbot_supabase_url', '');
        $supabase_key = get_option('vloerbot_supabase_key', '');
        $primary_color = get_option('vloerbot_primary_color', '');
        $accent_color = get_option('vloerbot_accent_color', '');
        $background_color = get_option('vloerbot_background_color', '');
        $font_family = get_option('vloerbot_font_family', '');
        ?>
        <div class="wrap">
            <h1>VloerBot Chatbot Settings</h1>
            <form method="post" action="">
                <?php wp_nonce_field('vloerbot_save_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="vloerbot_supabase_url">Supabase URL</label>
                        </th>
                        <td>
                            <input 
                                type="url" 
                                id="vloerbot_supabase_url" 
                                name="vloerbot_supabase_url" 
                                value="<?php echo esc_attr($supabase_url); ?>" 
                                class="regular-text"
                                placeholder="https://xxxxx.supabase.co"
                                required
                            />
                            <p class="description">Your Supabase project URL. Found in Supabase Dashboard → Settings → API</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="vloerbot_supabase_key">Supabase Publishable Key</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                id="vloerbot_supabase_key" 
                                name="vloerbot_supabase_key" 
                                value="<?php echo esc_attr($supabase_key); ?>" 
                                class="regular-text"
                                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                required
                            />
                            <p class="description">Your Supabase anon/public key. Found in Supabase Dashboard → Settings → API</p>
                        </td>
                    </tr>
                </table>
                
                <h2>Appearance Settings</h2>
                <p class="description">Customize the chatbot colors and font to match your WordPress theme.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="vloerbot_primary_color">Primary Color</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                id="vloerbot_primary_color" 
                                name="vloerbot_primary_color" 
                                value="<?php echo esc_attr($primary_color); ?>" 
                                class="vloerbot-color-picker"
                                data-default-color="#3d2819"
                            />
                            <p class="description">Main text and primary elements color (e.g., #3d2819)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="vloerbot_accent_color">Accent Color</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                id="vloerbot_accent_color" 
                                name="vloerbot_accent_color" 
                                value="<?php echo esc_attr($accent_color); ?>" 
                                class="vloerbot-color-picker"
                                data-default-color="#C17A3E"
                            />
                            <p class="description">Chat button and accent elements color (e.g., #C17A3E)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="vloerbot_background_color">Background Color</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                id="vloerbot_background_color" 
                                name="vloerbot_background_color" 
                                value="<?php echo esc_attr($background_color); ?>" 
                                class="vloerbot-color-picker"
                                data-default-color="#ffffff"
                            />
                            <p class="description">Chat window background color (e.g., #ffffff)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="vloerbot_font_family">Font Family</label>
                        </th>
                        <td>
                            <select 
                                id="vloerbot_font_family" 
                                name="vloerbot_font_family" 
                                class="regular-text"
                            >
                                <option value="">Default (Inter)</option>
                                <option value="Arial, sans-serif" <?php selected($font_family, 'Arial, sans-serif'); ?>>Arial</option>
                                <option value="Georgia, serif" <?php selected($font_family, 'Georgia, serif'); ?>>Georgia</option>
                                <option value="'Times New Roman', serif" <?php selected($font_family, "'Times New Roman', serif"); ?>>Times New Roman</option>
                                <option value="'Courier New', monospace" <?php selected($font_family, "'Courier New', monospace"); ?>>Courier New</option>
                                <option value="Verdana, sans-serif" <?php selected($font_family, 'Verdana, sans-serif'); ?>>Verdana</option>
                                <option value="'Helvetica Neue', Helvetica, Arial, sans-serif" <?php selected($font_family, "'Helvetica Neue', Helvetica, Arial, sans-serif"); ?>>Helvetica Neue</option>
                                <option value="'Open Sans', sans-serif" <?php selected($font_family, "'Open Sans', sans-serif"); ?>>Open Sans</option>
                                <option value="'Roboto', sans-serif" <?php selected($font_family, "'Roboto', sans-serif"); ?>>Roboto</option>
                                <option value="'Lato', sans-serif" <?php selected($font_family, "'Lato', sans-serif"); ?>>Lato</option>
                                <option value="'Montserrat', sans-serif" <?php selected($font_family, "'Montserrat', sans-serif"); ?>>Montserrat</option>
                                <option value="'Poppins', sans-serif" <?php selected($font_family, "'Poppins', sans-serif"); ?>>Poppins</option>
                                <option value="custom" <?php selected($font_family, 'custom'); ?>>Custom (enter below)</option>
                            </select>
                            <p class="description">Select a font family or choose "Custom" to enter your own</p>
                        </td>
                    </tr>
                    <tr id="custom-font-row" style="<?php echo ($font_family === 'custom') ? '' : 'display: none;'; ?>">
                        <th scope="row">
                            <label for="vloerbot_custom_font">Custom Font Family</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                id="vloerbot_custom_font" 
                                name="vloerbot_font_family" 
                                value="<?php echo ($font_family === 'custom') ? esc_attr(get_option('vloerbot_custom_font', '')) : ''; ?>" 
                                class="regular-text"
                                placeholder="e.g., 'Your Font', sans-serif"
                            />
                            <p class="description">Enter your custom font family (e.g., "'Your Font', sans-serif")</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="vloerbot_profile_image">Profile Picture</label>
                        </th>
                        <td>
                            <input 
                                type="url" 
                                id="vloerbot_profile_image" 
                                name="vloerbot_profile_image" 
                                value="<?php echo esc_url($profile_image); ?>" 
                                class="regular-text"
                                placeholder="https://example.com/image.jpg"
                            />
                            <button 
                                type="button" 
                                class="button" 
                                id="vloerbot_upload_image"
                            >Upload Image</button>
                            <?php if (!empty($profile_image)): ?>
                                <div style="margin-top: 10px;">
                                    <img src="<?php echo esc_url($profile_image); ?>" alt="Profile" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" />
                                </div>
                            <?php endif; ?>
                            <p class="description">URL to the chatbot's profile picture (recommended: 100x100px, square image)</p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button('Save Settings', 'primary', 'vloerbot_save_settings'); ?>
            </form>
            
            <script>
            jQuery(document).ready(function($) {
                // Initialize color pickers
                $('.vloerbot-color-picker').wpColorPicker();
                
                // Media uploader for profile image
                $('#vloerbot_upload_image').on('click', function(e) {
                    e.preventDefault();
                    var button = $(this);
                    var file_frame = wp.media({
                        title: 'Select Profile Image',
                        button: {
                            text: 'Use this image'
                        },
                        multiple: false
                    });
                    
                    file_frame.on('select', function() {
                        var attachment = file_frame.state().get('selection').first().toJSON();
                        $('#vloerbot_profile_image').val(attachment.url);
                    });
                    
                    file_frame.open();
                });
                
                // Show/hide custom font input
                $('#vloerbot_font_family').on('change', function() {
                    if ($(this).val() === 'custom') {
                        $('#custom-font-row').show();
                        $('#vloerbot_custom_font').attr('name', 'vloerbot_font_family');
                        $('#vloerbot_font_family').attr('name', 'vloerbot_font_family_selector');
                    } else {
                        $('#custom-font-row').hide();
                        $('#vloerbot_custom_font').attr('name', '');
                        $('#vloerbot_font_family').attr('name', 'vloerbot_font_family');
                    }
                });
                
                // Trigger on page load if custom is selected
                if ($('#vloerbot_font_family').val() === 'custom') {
                    $('#custom-font-row').show();
                    $('#vloerbot_custom_font').attr('name', 'vloerbot_font_family');
                    $('#vloerbot_font_family').attr('name', 'vloerbot_font_family_selector');
                }
            });
            </script>
            
            <hr>
            
            <h2>How to Find Your Supabase Credentials</h2>
            <ol>
                <li>Go to <a href="https://supabase.com" target="_blank">supabase.com</a> and sign in</li>
                <li>Select your project</li>
                <li>Navigate to <strong>Settings → API</strong></li>
                <li>Copy the <strong>Project URL</strong> and paste it in the "Supabase URL" field above</li>
                <li>Copy the <strong>anon/public</strong> key and paste it in the "Supabase Publishable Key" field above</li>
                <li>Click "Save Settings"</li>
            </ol>
            
            <h2>Plugin Status</h2>
            <?php if (!empty($supabase_url) && !empty($supabase_key)): ?>
                <p style="color: green;">✓ Supabase credentials configured</p>
            <?php else: ?>
                <p style="color: red;">⚠ Please configure Supabase credentials above</p>
            <?php endif; ?>
        </div>
        <?php
    }
}

// Initialize plugin
function vloerbot_chatbot_init() {
    return VloerBot_Chatbot::get_instance();
}

// Start the plugin
vloerbot_chatbot_init();


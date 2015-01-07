<?php
return array(
  'assetic_configuration' => array(
    'modules' => array(
      'default_base' => array(
        'root_path' => array(
          __DIR__ . '/../../../../design/frontend/default/<%= theme_name %>/assets',
        ),
        'collections' => array(
          'frontend_images' => array(
            'assets' => array(
              'images/*.png',
              'images/*.jpg',
              'images/*.gif',
              'images/*.ico',
              'images/**/*.png',
              'images/**/*.jpg',
              'images/**/*.gif',
              'images/**/*.ico',
              'images/**/**/*.png',
              'images/**/**/*.jpg',
              'images/**/**/*.gif',
              'images/**/**/*.ico',
              'images/**/**/**/*.png',
              'images/**/**/**/*.jpg'
            ),
            'options' => array(
              'move_raw' => true,
              'output' => 'frontend',
            )
          ),
          'frontend_fonts' => array(
            'assets' => array(
              'css/fonts/*.eot',
              'css/fonts/*.otf',
              'css/fonts/*.svg',
              'css/fonts/*.woff',
              'css/fonts/**/*.eot',
              'css/fonts/**/*.otf',
              'css/fonts/**/*.svg',
              'css/fonts/**/*.woff'
            ),
            'options' => array(
              'move_raw' => true,
              'output' => 'frontend',
            )
          ),
          'frontend_css_<%= theme_name %>' => array(
              'assets' => array(
              'css/<%= theme_name %>.css'
            ),
              'options' => array(
              'output' => 'frontend/css/main'
            )
          ),

          'head_<%= site_name %>_lib' => array(
            'assets' => array(
              'vendors/angular/angular.js',
              'vendors/angular-bootstrap/ui-bootstrap.min.js',
              'vendors/angular-bootstrap/ui-bootstrap-tpls.min.js',
              'vendors/angular-touch/angular-touch.min.js',

              // 'vendors/jquery/dist/jquery.min.js',

              'vendors/respond/dest/respond.min.js',
              //'vendors/bootstrap/js/alert.js',
              // 'vendors/bootstrap/js/button.js',
              // 'vendors/bootstrap/js/carousel.js',
              // 'vendors/bootstrap/js/collapse.js',
              // 'vendors/bootstrap/js/dropdown.js',
              // 'vendors/bootstrap/js/modal.js',
              // 'vendors/bootstrap/js/tooltip.js',
              // 'vendors/bootstrap/js/popover.js',
              // 'vendors/bootstrap/js/scrollspy.js',
              // 'vendors/bootstrap/js/tab.js',
              // 'vendors/bootstrap/js/affix.js',
            ),
            'filters' => array(),
            'options' => array(
              'output' => 'frontend/js/head_<%= site_name %>_lib.js',
            ),
          ),
          'head_<%= site_name %>_js' => array(
            'assets' => array(
              'scripts/app.js',
            ),
            'filters' => array(),
            'options' => array(
              'output' => 'frontend/js/head_<%= site_name %>_main.js',
            ),
          ),
        ),
      ),
    ),
    'routes' => array(
      'frontend.*' => array(
        '@frontend_css' => '@frontend_css_<%= theme_name %>',
        '@head_<%= site_name %>_lib' => '@head_<%= site_name %>_lib',
        '@head_<%= site_name %>_js' => '@head_<%= site_name %>_js',
      ),
    ),
  ),
);

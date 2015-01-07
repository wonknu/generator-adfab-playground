<?php

$dbParams = array(
    'database'  => '<%= db_name %>',
    'username'  => '<%= db_user %>',
    'password'  => '<%= db_pwd %>',
    'hostname'  => 'localhost',
    'port'      => '3306',
    'charset'   => 'utf8',
    'driverOptions' => array(
        1002 => 'SET NAMES utf8',
    ),
);

return array(
    'design' => array(
        'admin' => array(
            'package' => 'default',
            'theme' => 'playground',
        ),
        'frontend' => array(
            'package' => 'default',
            'theme' => 'starter',
        ),
    ),
    // Licence keys and api keys
    // The reason why having a Facebook subdomain is better is for separating sessions between plateform and facebook.
    // This channel stuff gives the opportunity to know on which channel we are.
    'channel' => array(
        'facebook' => 'facebook.local',
        'platform' => 'playground.local',
    ),
    // This URL is used as a link on pages
    'facebook_url' => 'http://www.facebook.com/Playground.gg',

    // used only by PlaygroundFacebook : The app and page attached to the account. To Be Refactored
    'facebook' => array(
        'fb_appid'  => '118474821657382',
        'fb_secret' => 'fde26982baea07cab11881876a45a5fe',
        'fb_page'   => '330253093762158',
    ),
    'contact' => array( 'email' => 'contact@test.com'),
    'rss' => array(
        'url' => 'http://www.metrofrance.com/rss.xml?c=1157379272-9',
    ),
    'doctrine' => array(
        'connection' => array(
            // default connection name
            'orm_default' => array(
                'driverClass' => 'Doctrine\DBAL\Driver\PDOMySql\Driver',
                'params' => array(
                    'host'     => $dbParams['hostname'],
                    'port'     => $dbParams['port'],
                    'user'     => $dbParams['username'],
                    'password' => $dbParams['password'],
                    'dbname'   => $dbParams['database'],
                    'charset'  => $dbParams['charset'],
                    'driverOptions' => $dbParams['driverOptions'],
                )
            )
        ),
    ),
    'video_processing' => array(
        'binPath' => 'nice -n 11 /usr/bin/ffmpeg',
        'thumbnailWidth' => '720',
        'thumbnailHeight' => '400',
        'scaleSize' => 'hd1080',
        'cropWidth' => '1920',
        'cropHeight' => '1080',
        'duration' => '5',
    ),
    'ocra_cached_view_resolver' => array(
        // configuration to be passed to `Zend\Cache\StorageFactory#factory()`
        'cache' => array(
            'adapter' => array(
                'name'    => 'filesystem',
                'options' => array(
                    'cache_dir' => __DIR__.'/../../data/cache',
                    'ttl' => 84600,
                    'namespace' => 'app_view_resolver_' . sha1(realpath(__FILE__)),
                ),
            ),
            'plugins' => array(
                // We store database rows on filesystem so we need to serialize them
                'Serializer'
            ),
        ),
        // following is the key used to store the template map in the cache adapter
        'cached_template_map_key' => 'cached_template_map',
    ),
);

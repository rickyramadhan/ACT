<?php 

require '../../twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../views');
$twig = new Twig_Environment($loader);

echo $twig->render('home_en.html', array(
    'ton_beras'  => 2000,
    'sisa_hari'  => 53,
    'persen_pencapaian'  => 4,
    'city'  => 'Samarinda'
));
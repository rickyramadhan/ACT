<?php 

include 'configuration.php';
require '../' . $twig_folder . '/lib/Twig/Autoloader.php';
require 'statistic.php';
require 'news.php';
Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('views');
$twig = new Twig_Environment($loader);

// echo $_SERVER['SERVER_NAME']; exit();

$uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri_segments = explode('/', $uri_path);

$lang = strtolower($uri_segments[2]); //exit();

$template = $twig->load('home.html');
if ($lang == "en") {
	$template = $twig->load('home_en.html');
    if(!isset($_SERVER['HTTPS']) OR $_SERVER['HTTPS'] != 'on'){
        header("Location: " . $base_url . $lang);
    } 
} elseif ($lang == '') {
	$template = $twig->load('home.html');
    if(!isset($_SERVER['HTTPS']) OR $_SERVER['HTTPS'] != 'on'){
        header("Location: " . $base_url);
    } 
	$lang = 'id';
} else {
	$lang = 'id';
	header("Location: " . $base_url);
	// echo "Inggris";
}

$statistic = get_statistic();
$news = get_list_news($lang);

$tgl_sekarang = new DateTime();
$tgl_target = new DateTime('2017-05-26');

$interval = $tgl_sekarang->diff($tgl_target);
// print_r($news['data']->data);
// exit();

$total_beras = $statistic['home_beras_kapal_kemanusiaan_act'] + $statistic['home_beras_kapal_kemanusiaan_public'];
$persen = floor(($total_beras/25000) * 100);

echo $template->render(array(
    'ton_beras'  => $total_beras,
    'sisa_hari'  => $interval->days,
    'persen_pencapaian'  => $persen,
    'newses' => $news['data']->data,
    'server_name' => $_SERVER['SERVER_NAME'],
    'base_url' => $base_url,
    'lang' => $lang,
    'url_js_donationPG'  => $url_js_donationPG
));
<?php 

	function get_list_news($langCode='id', $page=1, $per_page=6, $footer1 = 0, $footer2=0, $keyword = '', $feature=0, $kategoriId = 20, $tag='') {

		$website = urlencode(json_encode('act.id'));
	    $return = array();
	    $return['success'] = FALSE;
	    $fullurl = "https://newsroom.act.id/".'api/actnew_news?lang='.$langCode.'&page='.$page.'&per_page=' . $per_page.'&footer1=' . $footer1.'&footer2=' . $footer2.'&keyword='.$keyword.'&feature='.$feature.'&news_category='.$kategoriId.'&tag='.$tag.'&website='.$website . '/';
	    // print_r($fullurl);exit();

	    $ch = curl_init();
	    curl_setopt($ch, CURLOPT_URL, $fullurl);
	    curl_setopt($ch, CURLOPT_HEADER, 0);
	    curl_setopt($ch, CURLOPT_VERBOSE, 1);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	    // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	    // curl_setopt($ch, CURLOPT_SSLVERSION, 3);
	    curl_setopt($ch, CURLOPT_CERTINFO, 1);
	    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
	    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); 
	    // curl_setopt($ch, CURLOPT_CAINFO,  getcwd().'/ssl_cert/COMODORSADomainValidationSecureServerCA.crt');
	    // curl_setopt($ch, CURLOPT_FAILONERROR, 0);
	    // curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
	    curl_setopt($ch, CURLOPT_USERPWD, "admin:1234");

	    // $this->curl->option('SSLVERSION', 3);
	    
	    $result = curl_exec($ch);
	    curl_close($ch);
	    $result_decode = json_decode($result);
	    // print_r($result_decode);exit();
	    if ($result_decode->status) {
	        $return['success'] = TRUE;
	        $return['data'] = $result_decode;
	    }

	    return $return;

	}
?>
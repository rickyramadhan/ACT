<?php

	$invoice_no = "16".date('ymd').substr(mt_rand(), 0, 5);
	$data['invoice_no'] = $invoice_no;
	$data['trx_date'] = date('Y-m-d H:i:s');
	$data['id_asal'] = 1;
	$data['currency'] = "IDR";
			
	$detail = array('dontype' => "Beras Kapal Kemanusiaan",
					'dontext' => "Beras Kapal Kemanusiaan",
					'donvalue' => $_GET['dontotal'],
					'kegiatan_id' => 42020409,
					'program_id' => 254,
					'notif' => ""
					);
	$donation_details[] = $detail;
	$data['jumlah'] = $_GET['dontotal'];
	
	$msg = array($data, $donation_details);
	$msg_encode = json_encode($msg);

	$passtx = "kikim";
	$nodetx = "123kik1mL4gi";
	$value = encrypt2($msg_encode, $passtx, $nodetx);
			
	$restuser = 'admin';
	$restkey = '1234';
	$return = array();
	$return['success'] = FALSE;
	$fullurl = 'http://localhost/Payment_Gateway/index.php/soap/payment_soapserver/soap_penerimaan_online_rest';
	$fullurl = 'https://donation.act.id/soap/payment_soapserver/soap_penerimaan_online_rest';
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_VERBOSE, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($ch, CURLOPT_URL, $fullurl.'?_='.$value);
			
	$result = curl_exec($ch);
	curl_close($ch);
			
	$result_decrpyt = decrypt2x($result, $passtx, $nodetx);
	$result_decrpyt_json = json_decode($result_decrpyt);

	if ((!$result) or ( $result_decrpyt_json->status == 'false')) {
		$status_transaksi_pg['status'] = 'PG_Failed';
	}
	else{
		$status_transaksi_pg['status'] = 'PG_Success';
		$status_transaksi_pg['invoice'] = $invoice_no;
		$_SESSION['cart']	= "";
	}
			
			
	echo json_encode($status_transaksi_pg);
	
	
	function encrypt2($decrypted, $password, $salt = '!kQm*fF3pXe1Kbm%9') {
		$key = hash('SHA256', $salt . $password, true);
		srand();
		$iv = mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC), MCRYPT_RAND);
		if (strlen($iv_base64 = rtrim(base64_encode($iv), '=')) != 22)
			return false;
		$encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $decrypted . md5($decrypted), MCRYPT_MODE_CBC, $iv));
			return base64_encode($iv_base64 . $encrypted);
	}

	function decrypt2x($encrypted, $password, $salt = '!kQm*fF3pXe1Kbm%9') {
		$encrypted = base64_decode($encrypted);
		$key = hash('SHA256', $salt . $password, true);
		$iv = base64_decode(substr($encrypted, 0, 22) . '==');
		$encrypted = substr($encrypted, 22);
		$decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, base64_decode($encrypted), MCRYPT_MODE_CBC, $iv), "\0\4");
		$hash = substr($decrypted, -32);
		$decrypted = substr($decrypted, 0, -32);
		if (md5($decrypted) != $hash)
			return false;
		return $decrypted;
	}
?>
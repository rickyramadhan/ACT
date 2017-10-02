	function sendDonatePG(url_payment){
		//showLoading('show');
		var radio_select = $('input[name=pembayaran]:checked').val();
		var atas_nama = $('input[name=name]').val();
		
		var dontotal = radio_select;
		if(radio_select=='kambinga' || radio_select=='kambing'){
			radio_select=='kambing';
			dontotal = 1750000;
		}
		else if(radio_select=='sapi')
			dontotal = 12250000;
		else if(radio_select=='kps')
			dontotal = 4750000;
		else if(radio_select=='sps')
			dontotal = 33250000;
		
		if (dontotal > 1 && atas_nama!='') {
			
			$.ajax({
				url:'https://www.globalqurban.com/merchant_pg/index.php',
				type:'GET',
				data:{
					dontotal : dontotal,
					donselect : radio_select,
					atas_nama : atas_nama,
					web : 'kumparan'
				},
				dataType:'JSON',
				success:function(response)
				{
					if (response['status'] === 'PG_Success') {
						$('body').append(
							'<form action="'+url_payment+'donasi/" id="ACTPaymentGateway" name="ACTPaymentGateway" method="POST">'+
								'<input name="pg_invoiceno" type="hidden" id="pg_invoiceno" value="" />'+
							'</form>'
						);
						
						$('#pg_invoiceno').val(response['invoice']);
						$('#ACTPaymentGateway').submit();
					}
					else{
						alert("Maaf, ada kesalahan transaksi, Silahkan ulangi kembali");
						//showLoading('hide');
						//showLoading('show','<h2>Request Failed</h2>');
					}
				},
				error: function(xhr, textStatus, errorThrown){
					alert("Maaf, ada kesalahan transaksi, Silahkan ulangi kembali");
					//showLoading('hide');
					//showLoading('show','<h2>Request Failed</h2>');
				}
			});
		} 
		else {
			alert("Silahkan Pilih jumlah donasi Anda");
			//showLoading('hide');
			//showLoading('show','<h2>Silahkan Pilih Donasi</h2>');
		}
		//showLoading('hide');
	}
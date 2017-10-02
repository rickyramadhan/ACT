function sendDonatePG(){
		//showLoading('show');
		var dontotal = $(".total-donasi H3").text();
		dontotal = dontotal.replace(/\D/g,'');
		var server_name = 'localhost';
		var ajax_url = base_url + "json_sendDonate_pg.php";
		
		if (dontotal > 0) {
			$.ajax({
				url:ajax_url,
				type:'GET',
				data:{
					dontotal : dontotal
				},
				dataType:'JSON',
				success:function(response)
				{
					//alert(response);
					if (response['status'] === 'PG_Success') {
						$('body').append(
							'<form action="'+url_js_donationPG+'" id="ACTPaymentGateway" name="ACTPaymentGateway" method="POST">'+
								'<input name="pg_invoiceno" type="hidden" id="pg_invoiceno" value="" />'+
							'</form>'
						);
						
						$('#pg_invoiceno').val(response['invoice']);
						$('#ACTPaymentGateway').submit();
					}
					else{
						//showLoading('hide');
						//showLoading('show','<h2>Request Failed</h2>');
					}
				},
				error: function(xhr, textStatus, errorThrown){
					//showLoading('hide');
					//showLoading('show','<h2>Request Failed</h2>');
				}
			});
		} 
		else {
			//showLoading('hide');
			//showLoading('show','<h2>Silahkan Pilih Donasi</h2>');
		}
		//showLoading('hide');
	}
	
	function number_format(number, decimals, dec_point, thousands_sep){
     
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec)
                {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

        if (s[0].length > 3)
        {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }

        if ((s[1] || '').length < prec)
        {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }

        return s.join(dec);
    }
	
	$( ".input-donasi" ).keyup(function() {
		beras = this.value;
		
		berasperkg = 10000;
		total_donasi = beras*berasperkg;
		
		if(total_donasi>=999999999){
			total_donasi = 10000;
		}
		else if(total_donasi>=10000){
			total_donasi = total_donasi;
		}
		else{
			total_donasi = berasperkg;
		}
		
		$(".total-donasi H3").html("Rp. "+number_format(total_donasi,0,",","."));
	});
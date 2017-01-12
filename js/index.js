$('document').ready(function(){

	$('#buscarDados').click(function(){
		///2.2/questions?page=10&pagesize=5&order=asc&sort=votes&site=stackoverflow
		var link = "page="+$('#page').val()+
				"&pagesize="+$('#rpp').val()+
				"&min="+$('#score').val()+
				"&sort="+$('#sort').val();
				
		$.ajax({
	 		type: 'POST',
	 		url: "http://api.stackexchange.com/2.2/questions?"+link+"&site=stackoverflow",
	 		//data: formData,
	 		cache: false,
	 		contenType: 'application/x-www-form-urlencoded',
	 		/*headers: { 
	 					'Authorization':'Bearer '+document.getElementById('token').value,
	 			    },*/
	 		processData: false,
	 		dataType: 'jsonp',
	 		beforeSend: function(){
				$('#statusBusca').text('Dados sendos buscados.....').css('color','blue').show();
	 		},
	 		success:function (data){
				console.log(data);
				$('#statusBusca').text('Dados buscados com sucesso!').css('color','green').show();
			},
			error: function (data){
				console.log(data);
				$('#statusBusca').text('Erro ao tentar buscar os dados solicitados!').css('color','red').show();
			}
		});
		return false;
	});
});
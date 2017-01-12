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
	
	function montarTabela(jsonResponse){
		var itens = jsonResponse.items;
		
		$('#tabelaPerguntas').show();
		
		dataTable = $('#tabelaPerguntas').DataTable({   
			"language": {
				"url": "http://cdn.datatables.net/plug-ins/1.10.13/i18n/Portuguese-Brasil.json"
			},
			"scrollX": false,
			"paging": false,
			"data": itens,
			"columns": [
				{"data": "question_id", "class": "td-center"},
				{"data": function(data){
					return "<a href='"+data.owner.link+"' target='_blank'>"+data.owner.display_name+"</a>";
					}, "class": "td-center"},
 	            {"data": function(data){
					return "<a href='"+data.link+"' target='_blank'>"+data.title+"</a>";
					}, "class": "td-center"},
				{"data": "score", "class": "td-center"},
			],
			
            "destroy": true
		});
	};
});
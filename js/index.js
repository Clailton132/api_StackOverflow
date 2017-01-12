$('document').ready(function(){

	 //Inicializa o dataTables (variavel que recebe a tabela
    dataTable = null;
	
	//Desabilita o input score caso o option selecionado não seja o vote
	$('#sort').change(function(){
		if($('#sort').val() != 'votes'){
			$("#score").prop('disabled', true);
			$("#score").val('');
		} else {
			$("#score").prop('disabled', false);
		}
	});
	$('#buscarDados').click(function(){
		
		//Verifica as precedencias de page e rpp conforme solicitado.
		if($('#page').val() != '' && $('#rpp').val() == ''){
			$('#statusBusca').text('É necessário preencher o campo RPP caso tenha inserido algum valor no campo PAGE').css('color','red').show();
			return false;
		}
		if($('#page').val() == '' && $('#rpp').val() != ''){
			$('#statusBusca').text('É necessário preencher o campo PAGE caso tenha inserido algum valor no campo RPP').css('color','red').show();
			return false;
		}
		var link = "";
		
		//Insere apenas as tag que contem valor a ser enviado.
		if($('#page').val() != ''){
			link += "&page="+$('#page').val();
		}
		if($('#rpp').val() != ''){
			link += "&pagesize="+$('#rpp').val();
		}
		if($('#score').val() != ''){
			link += "&min="+$('#score').val();
		}
		if($('#sort').val() != ''){
			link += "&sort="+$('#sort').val();
		}
				
		$.ajax({
	 		type: 'POST',
	 		url: "http://api.stackexchange.com/2.2/questions?order=desc"+link+"&site=stackoverflow",
	 		cache: false,
	 		contenType: 'application/x-www-form-urlencoded',
	 		processData: false,
	 		dataType: 'jsonp',
	 		beforeSend: function(){
				$('#statusBusca').text('Dados sendos buscados.....').css('color','blue').show();
	 		},
	 		success:function (data){
				console.log(data);
				montarTabela(data)
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
		
		if(dataTable != null){
			dataTable.destroy();
		};
		
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
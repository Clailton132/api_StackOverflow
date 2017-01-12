$('document').ready(function(){

	 //Inicializa o dataTables (variavel que recebe a tabela)
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
	//Faz uma busca ao clicar o botão "Buscar" caso todos os requisitos sejam atentidos.
	$('#buscarDados').click(function(){
		
		//Verifica as precedencias de page e rpp conforme solicitado.
		if($('#page').val() != '' && $('#rpp').val() == ''){
			$('#statusBusca').text('É necessário preencher o campo RPP caso tenha inserido algum valor no campo PAGE!').css('color','red').show();
			return false;
		}
		if($('#page').val() == '' && $('#rpp').val() != ''){
			$('#statusBusca').text('É necessário preencher o campo PAGE caso tenha inserido algum valor no campo RPP!').css('color','red').show();
			return false;
		}
		if($('#sort').val() == 'vote' && $('#score').val() == ''){
			$('#statusBusca').text('É necessário preencher o campo SCORE!').css('color','red').show();
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
		
		//Callback via ajax.
		$.ajax({
	 		type: 'POST',
	 		url: "http://api.stackexchange.com/2.2/questions?order=desc"+link+"&site=stackoverflow",
	 		cache: false,
	 		contenType: 'application/x-www-form-urlencoded',
	 		processData: false,
	 		dataType: 'jsonp',
	 		beforeSend: function(){
				//Feedback informando que a busca está sendo feita.
				$('#statusBusca').text('Dados sendos buscados.....').css('color','blue').show();
	 		},
	 		success:function (data){
				console.log(data);
				if(data.hasOwnProperty('items')){
					montarTabela(data)
					//Feedback informando que a busca foi bem sucessida.
					$('#statusBusca').text('Dados buscados com sucesso!').css('color','green').show();
				} else {
					//Feedback informando que a busca foi bem sucessida.
					$('#statusBusca').text('Erro ao buscar os dados. Verifique todos os parâmetros!').css('color','red').show();
					if(dataTable != null){
						dataTable.destroy();
					};
					$('#tabelaPerguntas').hide();
				}
				
			},
			error: function (data){
				console.log(data);
				//Feedback informando que houve um problema na busca.
				$('#statusBusca').text('Erro ao tentar buscar os dados solicitados!').css('color','red').show();
			}
		});
		return false;
	});
	
	//Função que monta a tabela de resultados.
	function montarTabela(jsonResponse){

		//Mostra a tabela.
		$('#tabelaPerguntas').show();
		
		dataTable = $('#tabelaPerguntas').DataTable({   
			//Importa a linguagem pt-BR
			"language": {
				"url": "http://cdn.datatables.net/plug-ins/1.10.13/i18n/Portuguese-Brasil.json"
			},
			//Sem paginação.
			"paging": false,
			//Recebe os itens para montagem da tabela.
			"data": jsonResponse.items,
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
$(document).ready(function(){

    $.getJSON("http://localhost:3003/listar-tarefas", function(valores){
        
        console.log(valores)

        valores.forEach(function(item, idx){
            let nova = '<li codigo="'+idx+'" class="tarefa-item task-item-empty">' 
                + "<b>"+ item.titulo +"</b>"
                + "<p>"+ item.descricao +"</p>"
                +"</li>";
            
            $(".tarefas-dia").append(nova);
        });

    });// fim do getJson

    $("#bt-salvar").click(function(){

        $("input, textarea").removeClass("is-invalid");

        if( $("#titulo-tarefa").val() == "" )
        {
            $("#titulo-tarefa").addClass("is-invalid");
        }

        if ($("#descricao-tarefa").val() == "")
        {
            $("#descricao-tarefa").addClass("is-invalid");
        }



    }); //fim do click bt-salvar

    $("body").on("click", ".tarefa-item", function(){
        $("#modalTarefa").modal("show");
        let codigo = $(this).attr("codigo");

        carregarTarefa(codigo, function(dados){

            console.log(dados);

            $("#titulo-tarefa").val(dados.titulo);
            $("#descricao-tarefa").val(dados.descricao);
            $("#responsavel-tarefa").val(dados.responsavel);
            $("#data-inicio").val(dados.dataIni);
            $("#data-fim").val(dados.dataFim);
        });
        
    }); // fim do click editar

    $(".nova-tarefa").click(function()){
        $("input, textarea").removeClass("is-invalid");
        $("input, textarea").val("");
    } // fim do click novo tarefa

});

/**
 * carrega os dados da tarefa indicada pelo ID
 * @param {string} id 
 * @param {function} callback 
 */

function carregarTarefa(id, callback)
{
    $.getJSON("http://localhost:3003/listar-tarefas", function(valores){
        callback(valores[id])
    })
}
$(document).ready(function(){

    $.getJSON("/tarefas.json", function(valores){
        
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
        });
        
    }); // fim do click

});

function carregarTarefa(id, callback)
{
    $.getJSON("/tarefas.json", function(valores){
        callback(valores[id])
    })
}
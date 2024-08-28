$(document).ready(function(){

    $.getJSON("http://localhost:3003/listar-tarefas", function(valores){
        
        console.log(valores)

        valores.forEach(function(item, idx){
            let nova = '<li codigo="'+ item._id +'" class="tarefa-item task-item-empty">' 
                + "<b>"+ item.titulo +"</b>"
                + "<p>"+ item.descricao +"</p>"
                +"</li>";
            
            $(".tarefas-dia").append(nova);
        });

    });// fim do getJson

    $.getJSON("http://localhost:3003/listar-usuarios", function(usuarios){
        usuarios.forEach(function(item){
            let opt = '<option value="'+item._id+'">Usuário 1</option>';
            $("#responsavel-tarefa").append(opt);
        });
    }); // fim do get usuarios

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

            let diaIni = dados.dataIni.substr(0, 10);
            let diaFim = dados.dataFim.substr(0,10);

            $("#titulo-tarefa").val(dados.titulo);
            $("#descricao-tarefa").val(dados.descricao);
            $("#responsavel-tarefa").val(dados.responsavel);
            $("#data-inicio").val(diaIni);
            $("#data-fim").val(diaFim);
        });
        
    }); // fim do click editar

    $(".nova-tarefa").click(function(){
        $("input, textarea").removeClass("is-invalid");
        $("input, textarea").val("");
    }); // fim do click novo tarefa

});

/**
 * carrega os dados da tarefa indicada pelo ID
 * @param {string} id 
 * @param {function} callback 
 */

function carregarTarefa(id, callback)
{
    $.getJSON("localhost:3003/ler-tarefa/"+id, function(valores){
        callback(valores[id])
    });
}
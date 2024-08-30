$(document).ready(function(){

    let usuario = localStorage.getItem("usuario");
    if (!usuario) {
        location.assign("/login");
    }

    $.getJSON("http://localhost:3003/listar-tarefas", function(valores){   
    
        valores.forEach(function(item, idx){
            let nova = '<li codigo="'+ item._id +'" class="tarefa-item task-item-empty">' 
                +'<span class="bt-del"> X </span>'
                + "<b>"+ item.titulo +"</b>"
                + "<p>"+ item.descricao +"</p>"                
                +"</li>";
            
            $(".tarefas-dia").append(nova);
        });

    });// fim do getJson

    $.getJSON("http://localhost:3003/listar-usuarios", function(usuarios){
        usuarios.forEach(function(item){
            let opt = '<option value="'+item._id+'">'+ item.nome +'</option>';
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

        let diaIni = new Date($("#data-inicio").val());
                
        let tarefa = {
            titulo: $("#titulo-tarefa").val(),
            descricao: $("#descricao-tarefa").val(),
            dataIni: diaIni.toISOString(),
            dataFim: $("#data-fim").val() + "T03:00:00.000Z",
            responsavel: {
                _id: $("#responsavel-tarefa").val(),
                nome: $("#responsavel-tarefa option:selected").text()
            },
            id: $("#id-tarefa").val()
        };

        console.log(tarefa);

        $.post("localhost:3003/cadastro-tarefa", tarefa, function(retorno, status){
            console.log(retorno);
            $("#modalTarefa").modal("hide");
            location.reload();
        }); // fim post



    }); //fim do click bt-salvar

    $("body").on("click", ".tarefa-item", function(){
        $("#modalTarefa").modal("show");
        let codigo = $(this).attr("codigo");

        carregarTarefa(codigo, function(dados){

            let diaIni = dados.dataIni.substr(0, 10);
            let diaFim = dados.dataFim.substr(0,10);

            $("#titulo-tarefa").val(dados.titulo);
            $("#descricao-tarefa").val(dados.descricao);
            $("#responsavel-tarefa").val(dados.responsavel._id);
            $("#data-inicio").val(diaIni);
            $("#data-fim").val(diaFim);
            $("#id-tarefa").val(codigo);
        });
        
    }); // fim do click editar

    $(".nova-tarefa").click(function(){
        $("input, textarea").removeClass("is-invalid");
        $("input, textarea").val("");
    }); // fim do click novo tarefa

    $("body").on("click", ".bt-del", function(ev){
        ev.stopPropagation();
        let codigo = $(this).parent().attr("codigo");

        $.post("http://localhost:3003/deletar-tarefa/"+codigo, function(valor){
            location.reload();
        });
    }); // fim do delete

});

/**
 * carrega os dados da tarefa indicada pelo ID
 * @param {string} id 
 * @param {function} callback 
 */

function carregarTarefa(id, callback)
{
    $.getJSON("localhost:3003/ler-tarefa/"+id, function(valores){
        callback(valores)

    })
}
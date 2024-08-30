$(document).ready(function(){

    $("msg").hide();

    $("#bt-entrar").click(function(ev){
        ev.preventDefault();
        $("msg").hide();

        let login = {
            senha: $("#floatingPassword").val(),
            email: $("#floatingInput").val()
        }

        $.post("http://localhost:3003/logar", login, function(retorno){
            console.log(retorno);
            if (retorno.erro)
            {
                $("#msg").html(retorno.erro)
                $("#msg").show();
            } else {
                localStorage.setItem("usuario", JSON.stringify(retorno));
                location.assign("/index");
            }
        });
    });
});
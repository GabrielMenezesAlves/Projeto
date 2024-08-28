const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const conurl = "mongodb+srv://aula-back:aula123456@turma-agosto.mam4s.mongodb.net/";
const conexao = new MongoClient(conurl);


app.post("/cadastro-tarefa", function(req, res){
    res.send("ok");
});

app.get("/listar-usuarios", async function(req, res){
    const mongo = await conexao.connect();
    const col = mongo.db("gabriel").collection("usuarios");
    
    const opt = {
        projection: {nome: 1}
    };
    const dados = await col.find({}, opt).toArray();

    res.json(dados);

});

app.get("/listar-tarefas", async function(req, res){
    
    const mongo = await conexao.connect();
    const col = mongo.db("gabriel").collection("tarefas");

    const dados = await col.find({}).toArray();

    res.json(dados);
});

app.get("/ler-tarefa/:id", async function(req, res){
    const mongo = await conexao.connect();
    const col = mongo.db("gabriel").collection("tarefas");

    // pega o id solicitado esse req params
    const id = new ObjectId(req.params.id);
    const tarefa = await col.findOne({_id: id});

    res.json(tarefa);

});

app.listen(3003, function(){
    console.log("servidor iniciado");
});


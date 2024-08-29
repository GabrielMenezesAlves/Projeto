const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const { MongoClient, ObjectId } = require("mongodb");
const conurl = "mongodb+srv://aula-back:aula123456@turma-agosto.mam4s.mongodb.net/";
const conexao = new MongoClient(conurl);


app.post("/cadastro-tarefa", async function(req, res){

    // mudando a data de string para Date
    req.body.dataIni = new Date(req.body.dataIni);
    req.body.dataFim = new Date(req.body.dataFim);

    let id = req.body.id;


    const mongo = await conexao.connect();
    const col = mongo.db("gabriel").collection("tarefas");

    let retorno;

    if (id == "")
    {
        retorno = await col.insertOne(req.body);
    } else
    {
        let novoid = new ObjectId(id);
        retorno = await col.updateOne({_id: novoid}, {$set: req.body})
    }    

    res.json(retorno);
    
});

app.post("/deletar-tarefa/:id", async function(req, res){

    const id = new ObjectId(req.params.id);
    const mongo = await conexao.connect();
    const col = mongo.db("gabriel").collection("tarefas");

    let retorno = await col.deleteOne({_id: id});
    res.json(retorno);

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


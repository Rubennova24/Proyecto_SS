const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const connection = require("./conexion");
const cors = require('cors');

 const app = express();
 const rutas=require('./routes/rutas');
 app.use(cors());

 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());
 app.use('/',rutas);
 var publicDir = require('path').join(__dirname,'/public'); 
 app.use(express.static(publicDir)); 
 const multiPartMiddleware = multipart({
   uploadDir: './public/subidas'
 });
 app.post('/subirimagen', multiPartMiddleware, (req, res) =>{
    // console.log(req.files.uploads[0].path);
        res.json({
            'message':'Se subio correctamente',
            'path': req.files.uploads[0].path
        });
 });

 connection.connect((err, res) => {
    if(err){
        console.log(err);
        console.log('Error de conexion con sql');
        return;
    }
    console.log('conexion exitosa a la base de datos');
 });

 app.listen(3000,(err,res)=> {
     if(err){
         console.log('Error al levantar servidor')
         return;
        }
        console.log('Apis escuchando en el puerto 3000')
    })
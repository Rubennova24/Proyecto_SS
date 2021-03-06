const excel = require('exceljs');
var workbook2 = new excel.Workbook();
module.exports = {
    getCarreras: (connection, body, callback) => {
        connection.query('SELECT * FROM carrera ORDER BY Nombre;', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    updateNuevoCiclo:(connection, body, callback) => {
        connection.query('UPDATE fecha_inscripciones SET Inicio = ? ,Final = ? ,CierreTotal = ?;', [body.Inicio,body.Final,body.CierreTotal], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    asignadospor:(connection, body, callback) => {
        connection.query('INSERT INTO asignadospor (`fechaCambio`, `Asignador`) VALUES ( current_timestamp() , ?);', [body.Asignador], (err, results) => {
            if (err) {
                callback("false");
                
                return;
            }
            callback(results);
        })
    },

    getdpto: (connection, body, callback) => {
        connection.query('SELECT * FROM departamento WHERE Codigo IN(SELECT Cdg_dpto FROM dpto_ca WHERE Cdg_ca = ?)ORDER BY Nombre;', [body.IdCarrera], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getmateria: (connection, body, callback) => {
        connection.query('SELECT * FROM materia WHERE Carrera = ? && Dpto = ? ORDER BY Semestre;', [body.IdCarrera, body.IdDpto], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getlista: (connection, body, callback) => {
        connection.query('SELECT * FROM ?? ;', [body.Materia], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                
                callback("false");
                
                return;
            }
            
            callback(results);
        })
    },
    maestroAsignado: (connection, body, callback) => {
        connection.query('SELECT DISTINCT (Maestro), Salon, Horario, FechaInicio FROM ?? ;', [body.nom_tab], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    checkDpto: (connection, body, callback) => {
        connection.query('SELECT DISTINCT (Departamento) FROM ?? WHERE Departamento = ? ;', [body.nom_tab,body.Dpto], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    dropView: (connection, body, callback) => {
        connection.query('DROP VIEW ??;',
            [body.Vista] ,(err, result) =>{
                    if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    callback("false");
                    return;
                    }
                    callback(result);
                    });
    },
    dropTable: (connection, body, callback) => {
        connection.query('DROP TABLE ?? ;',
            [body.Tabla] ,(err, result) =>{
                    if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    
                    callback("false");
                    return;
                    }
                   
                    callback(result);
                    });
    },
    dropTableInfo: (connection, body, callback) => {
        
        connection.query('DELETE FROM ?? WHERE carrera = ? ;',
            [body.Lista, body.nomCarrera],(err, result) =>{
                if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    callback("false");
                    return;
                    }
                    callback(result);
                    }); 
    },
    getTablafromView: (connection, body, callback) => {
        
        connection.query('SELECT View_definition FROM INFORMATION_SCHEMA.Views WHERE table_schema = "cursosespeciales" && TABLE_NAME= ?;',
            [body.View],(err, result) =>{
                if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    callback("false");
                    return;
                    }
                    callback(result);
                    }); 
    },
    deletemaestros: (connection, body, callback) => {
        connection.query('DELETE FROM maestros_asignados;',(err, result) =>{
                if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    callback("false");
                    return;
                    }
                    callback(result);
                    }); 
    },
    
    createlista: (connection, body, callback) => {
        connection.query('CREATE TABLE ?? ( Id varchar(8) NOT NULL,Nombre varchar(50) NOT NULL,Carrera varchar(8) NOT NULL, Imagen varchar(100) NOT NULL,Maestro varchar(50) NOT NULL,Salon varchar(5) NOT NULL,Horario time NOT NULL, Departamento varchar(8),FechaInicio date NOT NULL, CONSTRAINT PRIMARY KEY (Id),CONSTRAINT FOREIGN KEY(Carrera) REFERENCES carrera(Codigo),CONSTRAINT FOREIGN KEY(Departamento) REFERENCES departamento(Codigo));', [body.Materia], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    inscribirlista: (connection, body, callback) => {
        connection.query('INSERT INTO ?? (`Id`, `Nombre`, `Carrera`, `Imagen`, `Departamento`) VALUES ( ? , ? , ? , ? , ?);', [body.Materia, body.Id, body.Nombre, body.Carrera, body.Imagen, body.Dpto], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    
    setMaestro: (connection, body, callback) => {
        connection.query('CALL `asignarJefeDpto`( ? , ? );', [body.jefe,body.nombre_maestro], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    asignarMaestro: (connection, body, callback) => {

        //hacer trigger
        connection.beginTransaction(function(err) {
            if (err) {
                throw err;
            } 
            connection.query('INSERT INTO maestros_asignados (`clase`, `nombre_maestro`, `salon`, `horario`, `nombre_lista`, `carrera`, `fechainicio`) VALUES (? , ? , ? , ?, ?, ?, ?);',
            [body.Clase, body.Nombre, body.Salon, body.Horario,body.NombreLista ,body.Carrera, body.fechaInicio] ,(err, result) =>{
                    if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    callback("false");
                    }
                    callback(result);
                    });
            connection.query('UPDATE ?? SET `maestro` = ? , `salon` = ? , `horario` = ?, `fechainicio` = ? WHERE `carrera`= ?;',
            [body.NombreLista, body.Nombre, body.Salon, body.Horario, body.fechaInicio, body.Carrera],(err, result) =>{
                    if (err) {
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    });           
      });
      connection.commit(function(err) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }
      });
        
    },
    createVista: (connection, body, callback) => {
        
        connection.query("CREATE OR REPLACE VIEW ?? AS SELECT * FROM ?? WHERE carrera = ? ;", [body.Nombre, body.Materia, body.Carrera], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    VerCarrerasLista: (connection, body, callback) => {
        connection.query('SELECT DISTINCT Carrera FROM ??;', [body.Materia], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },

    VerVistas: (connection, body, callback) => {
        connection.query("SELECT * FROM ??", [body.Nombre], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    VerVistas2: (connection, body, callback) => {
        connection.query("SELECT * FROM ??;", [body.Nombre], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },

    getVistas2: (connection, body, callback) => {
        connection.query('SELECT Table_Name FROM INFORMATION_SCHEMA.Tables WHERE table_schema = "cursosespeciales" && table_type="view" ORDER BY Table_Name', (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    getConteo: (connection, body, callback) => {
        connection.query("SELECT COUNT(*) AS num FROM ??", [body.Nombre], (err,rows, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            //console.log('Query result: ', rows[0].num);
            callback(rows[0].num);
        })
    },
    getCarreraVista: (connection, body, callback) => {
        connection.query("SELECT DISTINCT Carrera FROM ??", [body.Nombre], (err,results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            //console.log('Query result: ', rows[0].num);
            callback(results);
        })
    },
    getUsr: (connection, body, callback) => {
        connection.query('SELECT * FROM jefe_dpto WHERE Nombre = ? && Contrasena = BINARY ?',[body.Usuario, body.Password], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },

    getUsr2: (connection, body, callback) => {
        connection.query('SELECT * FROM jefe_centro WHERE Nombre = ? && Contrasena = BINARY ?',[body.Usuario, body.Password], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    getJefe: (connection, body, callback) => {
        connection.query('SELECT * FROM jefe_dpto WHERE Id = ?',[body.Id], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    registrar: (connection, body, callback) => {
        connection.query('INSERT INTO jefe_dpto (`id`, `nombre`, `contrasena`, `jefecentro`, `dpto`) VALUES (? , ? , ? , ?, ? );',
        [body.Id, body.Nombre, body.Contrasena,body.JefeCentro, body.Dpto], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    editar: (connection, body, callback) => {
        connection.query('UPDATE jefe_dpto SET `nombre` = ? , `contrasena` = ? , `jefecentro` = ?, `dpto` = ?  WHERE `id` = ? ;',
        [body.Nombre, body.Contrasena, body.JefeCentro, body.Dpto, body.Id], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    eliminar: (connection, body, callback) => {
        connection.query('DELETE FROM jefe_dpto WHERE id = ? ',[body.Id], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    getJefes: (connection, body, callback) => {
        connection.query('SELECT dpto.Id,Dpto.Nombre,Dpto.Contrasena, Dpto.Dpto, Dpto.JefeCentro ,Centro.Nombre Jefe,dep.Nombre Departamento FROM jefe_dpto dpto,Jefe_centro Centro, departamento dep WHERE Dpto.JefeCentro=Centro.Id && Dpto.Dpto=dep.Codigo', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getJefes_Centro: (connection, body, callback) => {
        connection.query('SELECT * FROM jefe_centro ORDER BY Nombre;', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getDptos: (connection, body, callback) => {
        connection.query('SELECT * FROM departamento ORDER BY Nombre;', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getFinscripciones: (connection, body, callback) => {
        connection.query('SELECT * FROM fecha_inscripciones;', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getTablas: (connection, body, callback) => {
        connection.query('SELECT Table_Name,Table_Type FROM INFORMATION_SCHEMA.Tables WHERE table_schema = "cursosespeciales"', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getModificacion: (connection, body, callback) => {
        connection.query('SELECT * FROM asignadospor ORDER BY fechaCambio DESC LIMIT 1', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    //querys para compatibilidad
    getMateriasrepetidas: (connection, body, callback) => {
        connection.query('Select mat.Nombre From materia mat WHERE mat.Dpto = ? Group By mat.Nombre Having Count(*) > 1',[body.Dpto], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    getCarrerasrepetidas: (connection, body, callback) => {
        connection.query('SELECT ca.Codigo,ca.Nombre FROM carrera ca,materia mat where mat.Nombre= ? && ca.Codigo=mat.Carrera',[body.Materia], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    getCompatibilidades: (connection, body, callback) => {
        connection.query('SELECT * FROM compatibilidad WHERE Dpto= ? ORDER BY Materia',[body.Dpto], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    nuevacompatibilidad: (connection, body, callback) => {
        connection.query('INSERT INTO `compatibilidad`(`Materia`, `Dpto`, `col1`, `col2`, `col3`, `col4`, `col5`, `col6`, `col7`, `col8`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?);',[body.Materia,body.Dpto,body.col1,body.col2,body.col3,body.col4,body.col5,body.col6,body.col7,body.col8], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    updatecompatibilidad: (connection, body, callback) => {
        connection.query('UPDATE compatibilidad SET Dpto = ?, Materia = ?, col1 = ?, col2 = ?, col3 = ?, col4 = ?, col5 = ?, col6 = ?, col7 = ?, col8 = ? WHERE Indice = ?',[body.Dpto,body.Materia,body.col1,body.col2,body.col3,body.col4,body.col5,body.col6,body.col7,body.col8,body.Indice], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    eliminarcompatibilidad: (connection, body, callback) => {
        connection.query('DELETE FROM compatibilidad WHERE Indice = ?',[body.Indice], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    getCompatibilidad: (connection, body, callback) => {
        connection.query('SELECT * FROM compatibilidad WHERE Dpto= ? && Indice= ? ORDER BY Materia',[body.Dpto,body.Indice], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    obtenerCompatibilidad: (connection, body, callback) => {
        connection.query('SELECT * FROM compatibilidad WHERE Materia = ? ORDER BY Materia',[body.Materia], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    getcarrsincompats: (connection, body, callback) => {
        const carreras = body.Array.split(',');
       
        var consulta='SELECT DISTINCT(Carrera) FROM '+body.Materia+' WHERE'
        for(let carr of carreras){
            if(carr!= ''){
                consulta+=' Carrera != "'+carr+'" && ';
            }
        }
        consulta+=' Carrera != "" ;';
        
        connection.query(consulta, (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                console.log(err);
                callback("false");
                return;
            }
            callback(results);
        })
        
    },
    updateAsignacioncompats: (connection, body, callback) => {
        const carreras = body.Array.split(',');
        
        var consulta='UPDATE '+body.Materia+' SET `maestro` = "'+body.Maestro+'" , `salon` = "'+body.Salon+'" , `horario` = "'+body.Horario+'", `fechainicio` = "'+body.fechaInicio+'" WHERE '
        for(let carr of carreras){
            if(carr!= ''){
                consulta+=' Carrera = "'+carr+'" || ';
            }
        }
        consulta+=' Carrera = "" ;';
       // console.log(consulta);
        connection.query(consulta, (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                console.log(err);
                callback("false");
                return;
            }
            callback(results);
        })
        
    },
    asignarMaestroCompat: (connection, body, callback) => {
        connection.query('INSERT INTO maestros_asignados (`clase`, `nombre_maestro`, `salon`, `horario`, `nombre_lista`, `carrera`, `fechainicio`) VALUES (? , ? , ? , ?, ?, ?, ?);',[body.Materia, body.Nombre, body.Salon, body.Horario, body.NomList, body.Carrera, body.fechaInicio], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                console.log(err);
                callback("false");
                return;
            }
            callback(results);
        })
    },
    Vistacompatibilidad: (connection, body, callback) => { 
        connection.query("CREATE OR REPLACE VIEW ?? AS SELECT * FROM ?? WHERE carrera = ? || carrera = ? || carrera = ? || carrera = ? || carrera = ? || carrera = ? || carrera = ? || carrera = ? ;", [body.Nombre, body.Materia,body.col1,body.col2,body.col3,body.col4,body.col5,body.col6,body.col7,body.col8], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                console.log(err);
                callback("false");
                return;
            }
            callback(results);
        })
    },
    getCarrera: (connection, body, callback) => {
        connection.query('SELECT Nombre FROM carrera WHERE Codigo= ?',[body.Codigo], (err, results) =>{
            if(err){
                //callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results[0].Nombre);
        })
    },
    getMaestros: (connection, body, callback) => {
        connection.query('SELECT CAST(Id AS INT) id, Nombre FROM maestros WHERE departamento = ? ORDER BY id;',[body.Dpto] ,(err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    eliminar_mstro: (connection, body, callback) => {
        connection.query('DELETE FROM maestros WHERE Nombre = ? ',[body.Nombre], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    editar_mstro: (connection, body, callback) => {
        connection.query('UPDATE maestros SET nombre = ?  WHERE id = ? ;',
        [body.Nombre, body.Id], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                console.log(err);
                return;
            }
            callback(results);
        })
    },
    getMaestro: (connection, body, callback) => {
        connection.query('SELECT * FROM maestros WHERE Id = ?',[body.Id], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    registrar_mstro: (connection, body, callback) => {
        connection.query('INSERT INTO maestros (`id`, `nombre`, `departamento`, `centro`) VALUES (? , ? , ? , ? );',
        [body.Id, body.Nombre, body.Dpto, body.Centro], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    ultimo_id: (connection, body, callback) => {
        connection.query('SELECT CAST(Id AS INT) id FROM maestros ORDER BY Id DESC LIMIT 1;', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    guardarexcel: (connection, body, callback)=>{
        connection.query('SELECT * FROM ?? ;', [body.Tabla], (err, rows, fields)=>{
            if (err){
                callback("false");
                return;
            }
            const json = JSON.parse(JSON.stringify(rows));
            

            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet(body.Tabla);

            worksheet.columns = [
                {header: 'Id', key: 'Id', width: 8},
                {header: 'Nombre', key: 'Nombre', width: 50},
                {header: 'Carrera', key: 'Carrera', width: 8},
                {header: 'Imagen', key: 'Imagen', width: 50},
                {header: 'Maestro', key: 'Maestro', width: 50},
                {header: 'Salon', key: 'Salon', width: 5},
                {header: 'Horario', key: 'Horario', width: 15},
                {header: 'Departamento', key: 'Departamento', width: 8},
                {header: 'Fecha Inicio', key: 'FechaInicio', width: 15},
            ];

            worksheet.addRows(json);

            workbook.xlsx.writeFile('public/excel/'+body.Tabla+'.xlsx').then(function(){
                callback("true");
            });
        });
    },
    
    guardarReporteExcel: (connection, body, callback)=>{
        const Tablas = body.Tablas.split(',');
        for(let Tabla of Tablas){
            connection.query('SELECT * FROM ?? ;', [Tabla], (err, rows, fields)=>{
                if (err){
                    
                    callback("false");
                    return;
                }
                const json = JSON.parse(JSON.stringify(rows));
                let worksheet2 = workbook2.addWorksheet(Tabla);
    
                worksheet2.columns = [
                    {header: 'Id', key: 'Id', width: 8},
                    {header: 'Nombre', key: 'Nombre', width: 50},
                    {header: 'Carrera', key: 'Carrera', width: 8},
                    {header: 'Imagen', key: 'Imagen', width: 50},
                    {header: 'Maestro', key: 'Maestro', width: 50},
                    {header: 'Salon', key: 'Salon', width: 5},
                    {header: 'Horario', key: 'Horario', width: 15},
                    {header: 'Departamento', key: 'Departamento', width: 8},
                    {header: 'Fecha Inicio', key: 'FechaInicio', width: 15},
                ];
    
                worksheet2.addRows(json);
                workbook2.xlsx.writeFile('public/historico/reportesemestre.xlsx').then(function(){
                    
                });
            });
        }
        callback("true");
        
        
    },
    getMaterias: (connection, body, callback) => {
        connection.query('SELECT * FROM materia WHERE Dpto = ? ORDER BY Semestre;', [body.IdDpto], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    eliminar_mat: (connection, body, callback) => {
        connection.query('DELETE FROM materia WHERE Codigo = ? && Carrera = ?',[body.Codigo,body.Carrera], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    registrar_mat: (connection, body, callback) => {
        connection.query('INSERT INTO materia (`codigo`, `nombre`, `semestre`, `centro`, `carrera`, `dpto`) VALUES (? , ? , ? , ?, ? , ? );',
        [body.Codigo, body.Nombre, body.Semestre, body.Centro, body.Carrera, body.Dpto], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },
    editar_mat: (connection, body, callback) => {
        connection.query('UPDATE materia SET nombre = ?, semestre = ? WHERE codigo = ? && carrera = ? ;',
        [body.Nombre, body.Semestre, body.Codigo, body.Carrera], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                console.log(err);
                return;
            }
            callback(results);
        })
    }
}
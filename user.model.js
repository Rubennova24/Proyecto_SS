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
        connection.query('SELECT DISTINCT (Maestro), Salon, Horario FROM ?? ;', [body.nom_tab], (err, results) => {
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
    deleteasignadospor: (connection, body, callback) => {
        connection.query('DELETE FROM asignadospor;',(err, result) =>{
                if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    callback("false");
                    return;
                    }
                    callback(result);
                    }); 
    },
    createlista: (connection, body, callback) => {
        connection.query('CREATE TABLE ?? ( Id varchar(8) NOT NULL,Nombre varchar(50) NOT NULL,Carrera varchar(8) NOT NULL, Imagen varchar(100) NOT NULL,Maestro varchar(50) NOT NULL,Salon varchar(5) NOT NULL,Horario time NOT NULL, Departamento varchar(8), CONSTRAINT PRIMARY KEY (Id),CONSTRAINT FOREIGN KEY(Carrera) REFERENCES carrera(Codigo),CONSTRAINT FOREIGN KEY(Departamento) REFERENCES departamento(Codigo));', [body.Materia], (err, results) => {
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
            connection.query('INSERT INTO maestros_asignados (`clase`, `nombre_maestro`, `salon`, `horario`, `nombre_lista`, `carrera`) VALUES (? , ? , ? , ?, ?, ? );',
            [body.Clase, body.Nombre, body.Salon, body.Horario,body.NombreLista ,body.Carrera, body.NombreLista] ,(err, result) =>{
                    if (err) {
                    //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                    callback("false");
                    }
                    callback(result);
                    });
            connection.query('UPDATE ?? SET `maestro` = ? , `salon` = ? , `horario` = ? WHERE `carrera`= ?;',
            [body.NombreLista, body.Nombre, body.Salon, body.Horario, body.Carrera],(err, result) =>{
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
}
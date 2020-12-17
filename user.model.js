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
    
    getCarrerasyMaterias: (connection, body, callback) => {
        connection.query('CALL `countMaterias`();', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getMateriasyCarreras: (connection, body, callback) => {
        connection.query('CALL `rutina3`(?);',[body.Nombre] ,(err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getMateriasDpto: (connection, body, callback) => {
        connection.query('CALL `rutina2`(?);',[body.nom_mat], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback(results);
        })
    },
    getMateriasC3: (connection, body, callback) => {
        connection.query('SELECT DISTINCT mat.Nombre FROM materia mat GROUP BY mat.Nombre HAVING COUNT(*)>1', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
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
    createlista: (connection, body, callback) => {
        connection.query('CREATE TABLE ?? (num INT NOT NULL AUTO_INCREMENT, Id varchar(8) NOT NULL,Nombre varchar(50),Carrera varchar(8) NOT NULL,Maestro varchar(50),Salon varchar(5),Horario time,CONSTRAINT PRIMARY KEY (Id),CONSTRAINT FOREIGN KEY(Carrera) REFERENCES carrera(Codigo), INDEX `id_index` (num));', [body.Materia], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback(results);
        })
    },
    inscribirlista: (connection, body, callback) => {
        connection.query('INSERT INTO ?? (`Id`, `Nombre`, `Carrera`) VALUES ( ? , ? , ? );', [body.Materia, body.Id, body.Nombre, body.Carrera], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
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
        connection.query('SELECT Table_Name FROM INFORMATION_SCHEMA.Tables WHERE table_schema = "cursosespeciales" && table_type="view"', (err, results) => {
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
        connection.query('SELECT * FROM jefe_dpto WHERE Nombre = ? && Contrasena = ?',[body.Usuario, body.Password], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    },

    getUsr2: (connection, body, callback) => {
        connection.query('SELECT * FROM jefe_centro WHERE Nombre = ? && Contrasena = ?',[body.Usuario, body.Password], (err, results) =>{
            if(err){
                callback({array: null, id: null, success: false, err: JSON.stringify(err) });
                //callback("false");
                return;
            }
            callback(results);
        })
    }
}
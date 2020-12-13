module.exports = {
    getCarreras: (connection, body, callback) => {
        connection.query('SELECT * FROM carrera ORDER BY Nombre;', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback( results );
        })
    },
    getdpto: (connection, body, callback) => {
        connection.query('SELECT * FROM departamento WHERE Codigo IN(SELECT Cdg_dpto FROM dpto_ca WHERE Cdg_ca = ?)ORDER BY Nombre;',
        [body.IdCarrera], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback( results );
        })
    },
    getmateria: (connection, body, callback) => {
        connection.query('SELECT * FROM materia WHERE Carrera = ? && Dpto = ? ORDER BY Semestre;',
        [body.IdCarrera,body.IdDpto], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback( results );
        })
    },
    getlista: (connection, body, callback) => {
        connection.query('SELECT * FROM `?` ;',
        [body.Materia], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback( results );
        })
    },
    createlista: (connection, body, callback) => {
        connection.query('CREATE TABLE `?` (Id varchar(8) NOT NULL,Nombre varchar(50),Carrera varchar(5) NOT NULL,CONSTRAINT PRIMARY KEY (Id),CONSTRAINT FK_MAT FOREIGN KEY(Carrera) REFERENCES carrera(Codigo));',
        [body.Materia], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback( results );
        })
    },
    inscribirlista: (connection, body, callback) => {
        connection.query('INSERT INTO `?` (`Id`, `Nombre`, `Carrera`) VALUES ( ? , ? , ? );',
        [body.Materia, body.Id,body.Nombre,body.Carrera], (err, results) => {
            if (err) {
                //callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                callback("false");
                return;
            }
            callback( results );
        })
    },
}
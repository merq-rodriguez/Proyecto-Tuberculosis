CALL ProSavePersona('REGISTRAR', 22222222, 'Juan', 'Avila', 'Lechero', 3208217841, '1994/11/29', 1, 1, 1, 1, 1, 1, 1, null);
INSERT INTO  ips (nombre) VALUES('CLINICA DE LA AMAZONIA');
INSERT INTO grupo_etnico (nombre) VALUES('INDIGENA');
INSERT INTO regimen_salud(nombre) VALUES('CONTRIBUTIVO');
INSERT INTO pueblo_indigeno (nombre) VALUES('Wayuu');
INSERT INTO grupo_poblacional (nombre) VALUES ('POBLACION MESTIZA');


DELIMITER @
CREATE PROCEDURE ProSavePersona(
    IN _accion VARCHAR(30),
    IN _identificacion INT,
    IN _nombres VARCHAR(255),
    IN _apellidos VARCHAR(255),
    IN _ocupacion VARCHAR(255),
    IN _telefono VARCHAR(12),
	IN _fechanacimiento DATE,
    IN _fkIPS INT,
    IN _fkPertenencia_etnica INT,
    IN _fkRegimen INT,
    IN _fkPueblo_indigeno INT,
    IN _fkGrupo_poblacional INT,
	IN _fkLugarnacimiento INT,
	IN _fkTipodocumento INT,
	IN _fkGenero INT
)
BEGIN
    DECLARE isExist INT;
    CASE _accion
        WHEN 'REGISTRAR' THEN #Si usted pone en el procedimiento "REGISTRAR" se procede a registrar la persona.
            INSERT INTO persona(doc_identificacion, nombres, apellidos, ocupacion, telefono, fechanacimiento, fkRegimen, fkPueblo_indigeno, fkIPS, fkGrupo_poblacional, fkPertenencia_etnica, fkLugarnacimiento, fkTipodocumento, fkGenero) 
                        VALUES(_identificacion, _nombres, _apellidos, _ocupacion, _telefono, _fechanacimiento, _fkRegimen, _fkPueblo_indigeno, _fkIPS, _fkGrupo_poblacional, _fkPertenencia_etnica, _fkLugarnacimiento, _fkTipodocumento, _fkGenero);
        WHEN 'ACTUALIZAR' THEN #Si usted pone "ACTUALIZAR" se actualiza. Primero valida que esa persona exista en la tabla
            SET isExist = (SELECT doc_identificacion FROM persona WHERE doc_identificacion = _identificacion);
            IF isExist IS NOT NULL THEN
                UPDATE persona 
                    SET doc_identificacion = _identificacion, 
                    nombres = _nombres,
                    apellidos = _apellidos,
                    ocupacion = _ocupacion,
                    telefono = _telefono,
                    fechanacimiento = _fechanacimiento,
                    fkIPS = _fkIPS,
                    fkPertenencia_etnica = _fkPertenencia_etnica,
                    fkRegimen = _fkRegimen,
                    fkPueblo_indigeno = _fkPueblo_indigeno,
                    fkGrupo_poblacional  = _fkGrupo_poblacional,
                    fkLugarnacimiento = _fkLugarnacimiento,
                    fkTipodocumento = _fkTipodocumento,
                    fkGenero = _fkGenero
                 WHERE doc_identificacion = _identificacion;
            ELSE #Si no Existe esa persona con esa identificacion en la tabla le vota este error 
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La persona no se encuentra registrada';                
            END IF;
    END CASE;
END@
DELIMITER ;


DELIMITER @
CREATE PROCEDURE ProSaveUsuario(
    IN _accion VARCHAR(20),
    IN _username VARCHAR(255),
	IN _email VARCHAR(255),
	IN _password VARCHAR(255),
	IN _fkPersona INT,
	IN _fkRol INT
)
BEGIN
    DECLARE isExist INT;
    CASE _accion
    WHEN 'REGISTRAR' THEN 
        INSERT INTO usuario(username, email, password, fkPersona, fkRol, estado) 
        VALUES(_username, _email, _password, _fkPersona, _fkRol, 1);
    when 'ACTUALIZAR' THEN 
        SET isExist = (SELECT idUsuario FROM usuario WHERE fkPersona = _fkPersona);
        IF isExist IS NOT NULL THEN
            UPDATE usuario 
            SET username = _username,
            email = _email,
            password = _password,
            fkPersona = _fkPersona,
            fkRol = _fkRol
            WHERE fkPersona = _fkPersona AND estado = 1;
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario no se encuentra registrado';                            
        END IF;
        
    END CASE;
END@
DELIMITER ;

CALL ProSaveUsuario('ACTUALIZAR','Meteoro', 'pepito@gmail.com', '1234', 1111111111, 1);

DELIMITER @
CREATE PROCEDURE ProSavePaciente(
   IN _accion VARCHAR(25),
   IN _estatura FLOAT,
   IN _peso INT,
   IN _talla INT, 
   IN _fkPersona INT
)
BEGIN
DECLARE isExist INT;
DECLARE imc FLOAT;
SET imc = (select _peso / POW(_estatura,2) ); #Peso por estatura en metros al cuadrado
    CASE _accion
        WHEN 'REGISTRAR' THEN
            INSERT INTO paciente(imc, estatura, peso, talla, fkPersona) 
            VALUES(imc, _estatura, _peso, _talla, _fkPersona);
        WHEN 'ACTUALIZAR' THEN 
            SET isExist = (SELECT idPaciente FROM paciente WHERE fkPersona = _fkPersona);
            IF isExist IS NOT NULL THEN
                UPDATE paciente 
                SET estatura = _estatura,
                imc = imc,
                peso = _peso,
                talla = _talla
                WHERE fkPersona = _fkPersona; 
            ELSE 
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El paciente no se encuentra registrado'; #Este seria el mensaje que me muestra. Probemos...                           
            END IF;
    END CASE;
END@
DELIMITER ;
#
CALL ProSavePaciente('ACTUALIZAR',2.5, 70, 900, 1111111111);

DELIMITER @
CREATE PROCEDURE ProRegistrarLugartrabajo(
    _nombre VARCHAR(255),
    _fecha DATE,
	_fkPersona INT,
    _telefono VARCHAR(12),
	_fkLugar INT,
	_prefijo VARCHAR(255),
    _numero VARCHAR(255),
    _sufijo VARCHAR(255),
    _barrio VARCHAR (255)
)
BEGIN
    INSERT INTO direccion (prefijo, numero, sufijo, barrio) 
    VALUES(_prefijo, _numero, _sufijo, _barrio);
    INSERT INTO lugartrabajo(nombre, fecha,fkPersona, fkLugar, fkDireccion, telefono) 
    VALUES (_nombre, _fecha, _fkPersona, _fkLugar, (SELECT last_insert_id()), _telefono);
END@
DELIMITER ;

CALL  ProRegistrarLugartrabajo('CASINO LAS VEGAS', NOW(), 1111111111, 3202222111,1, 'CALLE', '1a', '123', 'VIRGINIA CENTRO');



DELIMITER @
CREATE PROCEDURE ProActualizarLugartrabajo(
    _idDireccion INT,
    _idLugarTrabajo INT,
    _nombre VARCHAR(255),
    _fecha DATE,
	_fkPersona INT,
    _telefono VARCHAR(12),
	_fkLugar INT,
	_prefijo VARCHAR(255),
    _numero VARCHAR(255),
    _sufijo VARCHAR(255),
    _barrio VARCHAR (255)
)
BEGIN
    DECLARE isExist INT;
    SET isExist = (SELECT idTrabajo FROM lugartrabajo WHERE idTrabajo = _idLugarTrabajo AND fkDireccion = _idDireccion);
    IF isExist IS NOT NULL THEN
        UPDATE direccion 
            SET prefijo = _prefijo,
            numero = _numero,
            sufijo = _sufijo,
            barrio = _barrio
        WHERE idDireccion = _idDireccion;
    
        UPDATE lugartrabajo 
            SET nombre = _nombre,
            fecha = _fecha,
            fkPersona = _fkPersona,
            fkLugar = _fkLugar,
            telefono = _telefono
        WHERE idTrabajo = _idLugarTrabajo;
    ELSE 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El lugar de trabajo o la direccion no se encuentra registrado.';                            
    END IF;
END@
DELIMITER ;

CALL ProActualizarLugartrabajo(3, 2, 'CASINO FARAONES', NOW(), 1111111111, 3002229090,1, 'CALLE', '1a', '123', 'VIRGINIA XXX');



DELIMITER @
CREATE PROCEDURE ProRegistrarResidencia(
    IN _fecha DATE, 
    IN _fkLugar INT,
    IN _fkPersona INT,
    IN _prefijo VARCHAR(255),
    IN _numero VARCHAR(255),
    IN _sufijo VARCHAR(255),
    IN _barrio VARCHAR (255)
)
BEGIN
    INSERT INTO direccion (prefijo, numero, sufijo, barrio) 
    VALUES(_prefijo, _numero, _sufijo, _barrio);
    INSERT INTO lugar_residencia( fecha, fkLugar, fkDireccion, fkPersona)
    VALUES( _fecha, _fkLugar, (SELECT last_insert_id()), _fkPersona);
END@
DELIMITER ;

CALL ProRegistrarResidencia(NOW(),1, 1111111111, 'CALLE', '1a', '123', 'VIRGINIA CENTRO');


DELIMITER @
CREATE PROCEDURE ProActualizarResidencia(
    IN _idDireccion INT,
    IN _idResidencia INT,
    IN _fecha DATE, 
    IN _fkLugar INT,
    IN _fkPersona INT,
    IN _prefijo VARCHAR(255),
    IN _numero VARCHAR(255),
    IN _sufijo VARCHAR(255),
    IN _barrio VARCHAR (255)
)
BEGIN
    DECLARE isExist INT;
    SET isExist = (SELECT idResidencia FROM lugar_residencia WHERE idResidencia = _idResidencia AND fkDireccion = _idDireccion);
    IF isExist IS NOT NULL THEN
        UPDATE direccion 
        SET prefijo = _prefijo,
            numero = _numero,
            sufijo = _sufijo,
            barrio = _barrio
        WHERE idDireccion = _idDireccion;
            
        UPDATE lugar_residencia 
        SET fecha = _fecha,
            fkLugar = _fkLugar,
            fkDireccion = _idDireccion,
            fkPersona = _fkPersona
        WHERE idResidencia = _idResidencia;
    ELSE 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El lugar de residencia no se encuentra registrado o la direccion.';                                    
    END IF;
END@
DELIMITER ;

CALL ProActualizarResidencia(7, 1,  '1998/09/09', 1, 1111111111, 'calle','123', '20-02','CENTRO YYXX');




DELIMITER @
CREATE PROCEDURE ProRegistrarPreguntaCuestionario(
    IN _nombre_pregunta VARCHAR(255),
    IN _fkTipo_pregunta INT,
    IN _idCuestionario INT
)
BEGIN
    INSERT INTO pregunta(nombre, fkTipo_pregunta) VALUES(_nombre_pregunta, _fkTipo_pregunta);
    INSERT INTO pregunta_cuestionario (fkPregunta, fkCuestionario) 
    VALUES((SELECT last_insert_id()), _idCuestionario);      
END@
DELIMITER ;

CALL ProActualizarPreguntaCuestionario(1,'Algo', 1, 1);

DELIMITER @
CREATE PROCEDURE ProActualizarPreguntaCuestionario(
    IN _idPregunta INT,
    IN _nombre_pregunta VARCHAR(255),
    IN _fkTipo_pregunta INT,
    IN _idCuestionario INT
)
BEGIN
DECLARE isExists INT;
SET isExists = (SELECT idPregunta FROM pregunta WHERE idPregunta = _idPregunta);
    IF isExists IS NOT NULL THEN
        UPDATE pregunta AS pre 
        INNER JOIN pregunta_cuestionario AS precu 
        ON pre.idPregunta = precu.fkPregunta
        SET pre.nombre = _nombre_pregunta,
	    precu.fkCuestionario = _idCuestionario
        WHERE pre.idPregunta = _idPregunta AND precu.fkCuestionario = _idCuestionario;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La pregunta no existe.';                                            
    END IF;
END@
DELIMITER ;


DELIMITER @
CREATE PROCEDURE ProInsertarcadenacontacto(
    IN _idPaciente INT,
    IN _estadosalud VARCHAR(255),
    IN _duracioncontacto TIME,
    IN _fechacontacto DATE,
    IN _contexto VARCHAR(255),
    IN _fkPersona INT,
    IN _fkLugarcontacto INT,
    IN _fkDireccioncontacto INT,
    IN _fkTiporelacion INT,
    IN _fkNivelexposicion INT
)

BEGIN
    INSERT INTO cadenacontacto 
    (estadosalud,
    duracioncontacto,
    fechacontacto,
    contexto,
    fkPersona,
    fkLugarcontacto,
    fkDireccioncontacto,
    fkTiporelacion,
    fkNivelexposicion) 
    VALUES(
    _estadosalud,
    _duracioncontacto,
    _fechacontacto,
    _contexto,
    _fkPersona,
    _fkLugarcontacto,
    _fkDireccioncontacto,
    _fkTiporelacion,
    _fkNivelexposicion);

    INSERT INTO paciente_cadenacontacto(fkPaciente, fkCadenacontacto)
    VALUES(_idPaciente, (SELECT last_insert_id()));
END@
DELIMITER ;

drop procedure ProInsertarcadenacontacto;
call ProInsertarcadenacontacto(2,'enfermo','10:22:22',NOW(),'en la casa',1117534247,13,36,1,1);


DELIMITER @
CREATE PROCEDURE ProActualizarCadenacontacto(
    IN _idContacto INT,
    IN _estadosalud VARCHAR(255),
    IN _duracioncontacto TIME,
    IN _fechacontacto DATE,
    IN _contexto VARCHAR(255),
    IN _fkPersona INT,
    IN _fkLugarcontacto INT,
    IN _fkDireccioncontacto INT,
    IN _fkTiporelacion INT,
    IN _fkNivelexposicion INT
)
BEGIN
    UPDATE  cadenacontacto
    SET
    estadosalud = _estadosalud,
    duracioncontacto = _duracioncontacto,
    fechacontacto = _fechacontacto,
    contexto = _contexto,
    fkPersona = _fkPersona,
    fkLugarcontacto = _fkLugarcontacto,
    fkDireccioncontacto = _fkDireccioncontacto,
    fkTiporelacion = _fkTiporelacion,
    fkNivelexposicion = _fkNivelexposicion
    WHERE idContacto = _idContacto;
END@
DELIMITER ;
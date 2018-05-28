CREATE DATABASE IF NOT EXISTS tuberculosis;
USE tuberculosis;

CREATE TABLE IF NOT EXISTS departamento(
	idDepartamento INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1 
);

CREATE TABLE IF NOT EXISTS municipio(
	idMunicipio INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	fkDepartamento INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkDepartamento) REFERENCES departamento(idDepartamento)
);

CREATE TABLE IF NOT EXISTS rol(
	idRol INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(255),
	descripcion TEXT,
	estado CHAR(1) DEFAULT 1
);

INSERT INTO rol VALUES(1, 'ADMINISTRADOR', 'Se encarga de administrar todo el sistema', 1);
INSERT INTO rol VALUES(2, 'MEDICO', 'Es el encargado de llevar los casos de tuberculosis', 1);
INSERT INTO rol VALUES(3, 'SUPERVISOR', 'Es el enfermero/a que hace seguimiento de los casos de tuberculosis', 1);
INSERT INTO rol VALUES(4, 'PACIENTE', 'Es un paciente del proceso', 1);


CREATE TABLE IF NOT EXISTS condicion_ingreso(
	idIngreso INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	descripcion TEXT,
	estado CHAR(1) DEFAULT 1
);

INSERT INTO condicion_ingreso VALUES(1, 'Paciente nuevo', 'Paciente que nunca ha sido tratado por tuberculosis o que ha recibido medicamentos anti tuberculoso por menos de un mes.',1);
INSERT INTO condicion_ingreso VALUES(2, 'Tras recaída', 'paciente que ha sido previamente tratado por tuberculosis, fue declarado curado o tratamiento terminado al final de su último ciclo de tratamiento, y ahora es diagnosticado con un episodio recurrente de tuberculosis (ya sea una verdadera recaída o un nuevo episodio de tuberculosis causado por reinfección).',1);
INSERT INTO condicion_ingreso VALUES(3, 'Tras fracaso', 'paciente previamente tratado por tuberculosis, cuyo tratamiento fracasó.',1);
INSERT INTO condicion_ingreso VALUES(4, 'Recuperado tras pérdida de seguimiento', 'paciente que ha sido tratado previa-mente por tuberculosis y declarado pérdida al seguimiento al final de su tratamiento más reciente.',1);
INSERT INTO condicion_ingreso VALUES(5, 'Otros pacientes previamente tratados', 'son aquellos que han sido previamente tratados por tuberculosis, pero cuyo resultado después del tratamiento más reciente es desconocido o indocumentado.',1);



CREATE TABLE IF NOT EXISTS genero(
	idGenero INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

INSERT INTO genero VALUES (1, 'MASCULINO', 1);
INSERT INTO genero VALUES (2, 'FEMENINO', 1);


CREATE TABLE IF NOT EXISTS tipodocumento(
	idTipodoc INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

INSERT INTO tipodocumento VALUES (1, 'CEDULA DE CIUDADANIA', 1);
INSERT INTO tipodocumento VALUES (2, 'TARGETA DE IDENTIDAD', 1);
INSERT INTO tipodocumento VALUES (3, 'PASAPORTE', 1);

CREATE TABLE IF NOT EXISTS ips(
	idIps INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1)
);

CREATE TABLE IF NOT EXISTS grupo_etnico(
	idEtnico INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1)
);
INSERT INTO grupo_etnico(nombre) VALUES('AFRODECENDIENTE');
INSERT INTO grupo_etnico(nombre) VALUES('PUEBLOS INDIGENAS');
INSERT INTO grupo_etnico(nombre) VALUES('RAIZALES');
INSERT INTO grupo_etnico(nombre) VALUES('ROM');

CREATE TABLE IF NOT EXISTS grupo_poblacional(
	idPoblacional INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1)
);

CREATE TABLE IF NOT EXISTS regimen_salud(
	idRegimen INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1)
);

CREATE TABLE IF NOT EXISTS pueblo_indigeno(
	idPueblo_indigeno INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1)
);


CREATE TABLE IF NOT EXISTS persona(
	doc_identificacion INT PRIMARY KEY NOT NULL,
	nombres VARCHAR(255),
	apellidos VARCHAR(255),
	ocupacion VARCHAR(255),
	telefono VARCHAR(12),
	fechanacimiento DATE,
	fkregimen INT,
	fkPueblo_indigeno INT,
	fkIPS INT,
	fkGrupo_poblacional INT,
	fkPertenencia_etnica INT,
	fkLugarnacimiento INT,
	fkTipodocumento INT,
	fkGenero INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkLugarnacimiento) REFERENCES municipio(idMunicipio),
    FOREIGN KEY(fkTipodocumento) REFERENCES tipodocumento(idTipodoc),
    FOREIGN KEY(fkIPS) REFERENCES ips(idIps),
    FOREIGN KEY(fkGrupo_poblacional) REFERENCES grupo_poblacional(idPoblacional),
    FOREIGN KEY(fkPertenencia_etnica) REFERENCES grupo_etnico(idEtnico),
    FOREIGN KEY(fkGenero) REFERENCES genero(idGenero),
	FOREIGN KEY(fkregimen) REFERENCES regimen_salud(idRegimen),
	FOREIGN KEY(fkPueblo_indigeno) REFERENCES pueblo_indigeno(idPueblo_indigeno)
	
);




CREATE TABLE IF NOT EXISTS direccion(
	idDireccion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    prefijo VARCHAR(20),
    numero VARCHAR(50),
	sufijo VARCHAR(50),
	barrio VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);




CREATE TABLE IF NOT EXISTS lugar_residencia(
	idResidencia INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha DATE,
	fkLugar INT,
	fkDireccion INT,
	fkPersona INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkLugar) REFERENCES municipio(idMunicipio),
    FOREIGN KEY(fkPersona) REFERENCES persona(doc_identificacion),
	FOREIGN KEY(fkDireccion) REFERENCES direccion(idDireccion)
);


CREATE TABLE IF NOT EXISTS paciente(
	idPaciente INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	imc FLOAT,
	estatura FLOAT,
	peso INT,
	talla INT, 
	fkPersona INT UNIQUE,
	fkCondicion_ingreso INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkPersona) REFERENCES persona(doc_identificacion),
    FOREIGN KEY(fkCondicion_ingreso) REFERENCES condicion_ingreso(idIngreso)	
);

CREATE TABLE IF NOT EXISTS condicion_clinica(
	idCondicion_clinica INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	descripcion TEXT,
	estado CHAR(1) DEFAULT 1
);

INSERT INTO condicion_clinica VALUES(1, 'Enfermedad Renal', '',1);
INSERT INTO condicion_clinica VALUES(2, 'Enfermedad Hepática', '',1);
INSERT INTO condicion_clinica VALUES(3, 'VIH/SIDA', '',1);
INSERT INTO condicion_clinica VALUES(4, 'Diabetes Mellitus', '',1);
INSERT INTO condicion_clinica VALUES(5, 'Silicosis', '',1);
INSERT INTO condicion_clinica VALUES(6, 'Desnutricion', '',1);
INSERT INTO condicion_clinica VALUES(7, 'Alcoholismo', '',1);
INSERT INTO condicion_clinica VALUES(8, 'Farmacodependencia', '',1);
INSERT INTO condicion_clinica VALUES(9, 'Embarazo', '',1);
INSERT INTO condicion_clinica VALUES(10, 'Tabaquismo', '',1);


CREATE TABLE IF NOT EXISTS ingreso_paciente(
	idIngreso_paciente INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fkCondicion_ingreso INT,
	fkPaciente INT,
	fecha_ingreso DATE,
	hora_ingreso TIME,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkCondicion_ingreso) REFERENCES condicion_ingreso(idIngreso),	
	FOREIGN KEY(fkPaciente) REFERENCES paciente (idPaciente)
);

CREATE TABLE condicionclinica_paciente(
	fkCondicion_clinica INT,
	fkIngreso_paciente INT,
	estado CHAR(1) DEFAULT 1,
	PRIMARY KEY(fkCondicion_clinica, fkIngreso_paciente),
	FOREIGN KEY(fkIngreso_paciente) REFERENCES ingreso_paciente(idIngreso_paciente),	
	FOREIGN KEY(fkCondicion_clinica) REFERENCES condicion_clinica(idCondicion_clinica)
);

CREATE TABLE IF NOT EXISTS lugartrabajo(
	idtrabajo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	fecha DATE,
	telefono VARCHAR(12),
	fkPersona INT,
	fkLugar INT,
	fkDireccion INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkPersona) REFERENCES persona(doc_identificacion),
    FOREIGN KEY(fkLugar) REFERENCES municipio(idMunicipio),
    FOREIGN KEY(fkDireccion) REFERENCES direccion(idDireccion)	
);

CREATE TABLE IF NOT EXISTS localizacion(
	idLocalizacion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	latitud VARCHAR(255),
	longitud VARCHAR(255),
	fkDireccion INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkDireccion) REFERENCES direccion(idDireccion)
);







CREATE TABLE IF NOT EXISTS usuario(
	idUsuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(255) UNIQUE,
	email VARCHAR(255) UNIQUE,
	password VARCHAR(255),
	fkPersona INT UNIQUE,
	fkRol INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkRol) REFERENCES rol(idRol),
    FOREIGN KEY(fkPersona) REFERENCES persona(doc_identificacion) 
);


CREATE TABLE IF NOT EXISTS gestacion(
	idGestacion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	semanas INT,
	fecha_inicio DATE,
	fkPersona INT,
	estado char(1) DEFAULT 1,
    FOREIGN KEY(fkPersona) REFERENCES persona(doc_identificacion)    
);

CREATE TABLE IF NOT EXISTS cuestionario(
	idCuestionario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

INSERT INTO cuestionario(idCuestionario, nombre) VALUES(1, 'Datos de laboratorio');
INSERT INTO cuestionario(idCuestionario, nombre) VALUES(2, 'Ayudas diagnósticas utilizadas para la configuración de caso');



CREATE TABLE IF NOT EXISTS tipo_pregunta(
	idTipo_pregunta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

INSERT INTO tipo_pregunta(nombre) VALUES('ABIERTA');
INSERT INTO tipo_pregunta(nombre) VALUES('CERRADA');
INSERT INTO tipo_pregunta(nombre) VALUES('OPCION MULTIPLE');
INSERT INTO tipo_pregunta(nombre) VALUES('NUMERICA');



CREATE TABLE IF NOT EXISTS pregunta(
	idPregunta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	fkTipo_pregunta INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkTipo_pregunta) REFERENCES tipo_pregunta(idTipo_pregunta)
);


#POner un tipo a las preguntas
#Tipos de pregunta: cerrada, abierta.
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (1, '¿Tiene cicatriz de vacuna BCG?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (2, '¿Tiene vacuna BCG registrada en carné?', 2);


#Informacion Adicion (NOMBRE DEL CUSTIONARIO)
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (3, '¿Es trabajador de la salud?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (4, '¿Sí en el punto anterior marco sí escriba la ocupación en salud.', 1);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (5, '¿Presenta diagnóstico previo de VIH?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (6, '¿Se realizó asesoría pre-test de VIH?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (7, '¿Se realizó prueba para diagnóstico de VIH?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (8, '¿Hay coinfección tuberculosis - VIH/sida?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (9, '¿Terapia preventiva con Trimetropin sulfa/cotrimoxazol?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (10, '¿Recibe tratamiento antiretroviral?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (11, '¿Inicio tratamiento?', 2);

#Datos de laboratorio (NOMBRE DEL CUESTIONARIO)
#Hay que tener en cuenta que muchas de estas preguntas se solucionan
#Con las demas tablas.
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (12, '¿Se utilizó prueba molecular para la confirmación del caso?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (13, '¿Baciloscopia?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (14, '¿Cultivo?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (15, '¿Histopatología?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (16, '¿Cuadro clínico?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (17, '¿Nexo epidemiológico?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (18, '¿Radiológico?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (19, '¿Adenosina deaminasa (ADA)?', 2);
INSERT INTO pregunta(idPregunta, nombre, fkTipo_pregunta) VALUES (20, '¿Tuberculina?', 2);





CREATE TABLE IF NOT EXISTS pregunta_cuestionario(
	fkPregunta INT,
    fkCuestionario INT,
	estado CHAR(1) DEFAULT 1,
	PRIMARY KEY(fkPregunta, fkCuestionario),
    FOREIGN KEY (fkPregunta) REFERENCES pregunta(idPregunta),
    FOREIGN KEY (fkCuestionario) REFERENCES cuestionario(idCuestionario)   
);

INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (1, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (2, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (3, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (4, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (5, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (6, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (7, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (8, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (9, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (10, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (11, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (12, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (13, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (14, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (15, 1);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (16, 2);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (17, 2);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (18, 2);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (19, 2);
INSERT INTO pregunta_cuestionario(fkPregunta, fkCuestionario) VALUES (20, 2);

|







CREATE TABLE IF NOT EXISTS respuesta_persona(
	fkPersona INT,
	fkCuestionario INT,
	fkPregunta INT,
	respuesta VARCHAR(255),
	estado CHAR(1) DEFAULT 1,
	PRIMARY key(fkPersona, fkCuestionario, fkPregunta),
	FOREIGN KEY(fkCuestionario) REFERENCES cuestionario(idCuestionario),
	FOREIGN KEY(fkPregunta) REFERENCES pregunta(idPregunta),	
	FOREIGN KEY(fkPersona) REFERENCES persona(doc_identificacion)
);




CREATE TABLE IF NOT EXISTS nivelexposicion(
	idNivelexpocicion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	descripcion TEXT,
	estado CHAR(1) DEFAULT 1
);

INSERT INTO nivelexposicion(nombre, descripcion) VALUES('NIVEL I', 'Convivientes habituales del paciente tuberculoso.');
INSERT INTO nivelexposicion(nombre, descripcion) VALUES('NIVEL II', 'Contacto frecuente.');
INSERT INTO nivelexposicion(nombre, descripcion) VALUES('NIVEL III', 'Contacto ocasional con un enfermo bacilífero.');





CREATE TABLE IF NOT EXISTS tiporelacion(
	idTiporelacion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

INSERT INTO tiporelacion VALUES(1, 'RELACION DE AMISTAD', 1);
INSERT INTO tiporelacion VALUES(2, 'RELACION AMOROSA', 1);
INSERT INTO tiporelacion VALUES(3, 'RELACION DE TRABAJO', 1);
INSERT INTO tiporelacion VALUES(4, 'RELACION DEPORTIVA', 1);
INSERT INTO tiporelacion VALUES(5, 'RELACION ACADEMICA', 1);




CREATE TABLE IF NOT EXISTS cadenacontacto( #Personas que han tenido contacto con el paciente
	idContacto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	estadosalud VARCHAR(255),
	duracioncontacto TIME,
	fechacontacto DATE,
	contexto VARCHAR(255),
	fkPersona INT,
	fkLugarcontacto INT,
	fkDireccioncontacto INT,
	fkTiporelacion INT,
	fkNivelexposicion INT,
	estado CHAR(1) DEFAULT 1,
    FOREIGN KEY(fkPersona) REFERENCES persona(doc_identificacion),    
    FOREIGN KEY(fkLugarcontacto) REFERENCES municipio(idMunicipio),    
    FOREIGN KEY(fkDireccioncontacto) REFERENCES direccion(idDireccion),    
    FOREIGN KEY(fkTiporelacion) REFERENCES tiporelacion(idTiporelacion),    
    FOREIGN KEY(fkNivelexposicion) REFERENCES nivelexposicion(idNivelexpocicion)
);

CREATE TABLE IF NOT EXISTS paciente_cadenacontacto(
	fkPaciente INT,
	fkCadenacontacto INT,
	estado CHAR(1) DEFAULT 1,
	PRIMARY key(fkPaciente, fkCadenacontacto),
    FOREIGN KEY(fkPaciente) REFERENCES paciente(idPaciente),    
    FOREIGN KEY(fkCadenacontacto) REFERENCES cadenacontacto(idContacto)    
);

CREATE TABLE IF NOT EXISTS sintoma(
	idSintoma INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	fechainicio DATE,
	tiposintomas VARCHAR(255), #Tener en cuenta la duracion.
	fkPaciente INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY (fkPaciente) REFERENCES paciente(idPaciente)
);

CREATE TABLE IF NOT EXISTS nivel_laboratorio(
	idNivellaboratorio INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	descripcion TEXT,
	estado CHAR(1) DEFAULT 1
);


INSERT INTO nivel_laboratorio VALUES(1, 'LABORATORIOS CLINICOS NIVEL I', 'Realizan bacilos copia, algunos inoculan muestras de esputo y remiten a otro nivel para el proceso de incubación.', 1);
INSERT INTO nivel_laboratorio VALUES(2, 'LABORATORIOS CLINICOS NIVEL II', 'Realizan baciloscopia, algunos inoculan la muestra de esputo y remiten a otro nivel para el proceso de incubación, aquellos que tienen área de microbiología hacen el proceso completo del cultivo.', 1);
INSERT INTO nivel_laboratorio VALUES(3, 'LABORATORIOS CLINICOS NIVEL III', 'Realizan baciloscopia y cultivo de muestras pulmonares y extrapulmonares, aquellos con capacidad e infraestructura realizan pruebas moleculares', 1);


CREATE TABLE IF NOT EXISTS medicamento(  
	idMedicamento INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	descripcion TEXT,
	estado CHAR(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS fase(
    idFase INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255),
    fkFase INT,
    estado CHAR(1) DEFAULT 1
);


CREATE TABLE IF NOT EXISTS dosis_medicamento(  
	idDosis INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	cantidad FLOAT, 
	fecha DATE,
	fkMedicamento INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY (fkMedicamento) REFERENCES medicamento(idMedicamento)
);

CREATE TABLE IF NOT EXISTS tratamiento(
	codigo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1)
);

CREATE TABLE IF NOT EXISTS tratamiento_paciente(
	idTrataPaciente INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fkDosisMedicamento INT,
	fkTratamiento INT,
	fkPaciente INT,
	fkFase INT,
	fecha DATE,
	estado CHAR(1),
	FOREIGN KEY (fkFase) REFERENCES fase(idFase),
	FOREIGN KEY (fkTratamiento) REFERENCES tratamiento(codigo),
	FOREIGN KEY (fkPaciente) REFERENCES paciente(idPaciente),
	FOREIGN KEY (fkDosisMedicamento) REFERENCES dosis_medicamento(idDosis)	
);



CREATE TABLE IF NOT EXISTS tuberculosis(
	idTuberculosis INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	descripcion TEXT,
	estado char(1) DEFAULT 1
);

INSERT INTO tuberculosis(nombre,  descripcion) VALUES('TUBERCULOSIS PULMONAR', 'lorem');
INSERT INTO tuberculosis(nombre,  descripcion) VALUES('TUBERCULOSIS EXTRAPULMONAR', 'lorem');

CREATE TABLE IF NOT EXISTS naturaleza_tuberculosis(
	idNatu_tuberculosis INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	descripcion TEXT
);

INSERT INTO naturaleza_tuberculosis(nombre,  descripcion) VALUES('TUBERCULOSIS RESISTENTE', 'lorem');
INSERT INTO naturaleza_tuberculosis(nombre,  descripcion) VALUES('TUBERCULOSIS SENSIBLE', 'lorem');

CREATE TABLE IF NOT EXISTS localizacion_extrapulmonar(
	idLocalizacion_extrapul INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

INSERT INTO localizacion_extrapulmonar VALUES (1, 'PLEURAL', 1);
INSERT INTO localizacion_extrapulmonar VALUES (2, 'MININGEA', 1);
INSERT INTO localizacion_extrapulmonar VALUES (3, 'PERITONEAL', 1);
INSERT INTO localizacion_extrapulmonar VALUES (4, 'GANGLIONAR', 1);
INSERT INTO localizacion_extrapulmonar VALUES (5, 'RENAL', 1);
INSERT INTO localizacion_extrapulmonar VALUES (6, 'INTESTINAL', 1);
INSERT INTO localizacion_extrapulmonar VALUES (7, 'OSTEOARTICULAR', 1);
INSERT INTO localizacion_extrapulmonar VALUES (8, 'GENITOURINARIA', 1);
INSERT INTO localizacion_extrapulmonar VALUES (9, 'PERICARDICA', 1);
INSERT INTO localizacion_extrapulmonar VALUES (10, 'CUTANEA', 1);
INSERT INTO localizacion_extrapulmonar VALUES (11, 'OTRO', 1);


CREATE TABLE IF NOT EXISTS detalle_extrapulmonar(
	idDetalle_extrapulmonar INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	descripcion TEXT,
	fkLocalizacion_extra INT,
	fkTuberculosis INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkLocalizacion_extra) 
	REFERENCES localizacion_extrapulmonar(idLocalizacion_extrapul),
	FOREIGN KEY(fkTuberculosis) REFERENCES tuberculosis(idTuberculosis)
);

CREATE TABLE IF NOT EXISTS muestra(
	idMuestra INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

#Tipos de muestras:
#(+) Para muestras de orina, líquido seminal, flujo menstrual, materia fecal y
#sangre, serán recolectadas según indicaciones del laboratorio
#(+) Pueden ser (líquidos: cefalorraquídeo, pleural, pericárdico, ascítico y sinovial, biopsias)

CREATE TABLE IF NOT EXISTS conservacionmuestra(  
	idtransporte INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	duracionhoras INT,
	temperatura INT,#grados Centigrados
	fkMuestra INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkMuestra) REFERENCES  muestra(idMuestra)
);



CREATE TABLE IF NOT EXISTS laboratorio(
	idLaboratorio INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	fecha DATE,
	fkNivel_laboratorio INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkNivel_laboratorio) REFERENCES nivel_laboratorio(idNivellaboratorio)
);




CREATE TABLE IF NOT EXISTS diagnostico_laboratorio(
	idDetalle_labo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fkPaciente INT,
	fkMedico INT,
	fkTuberculosis INT,
	fkNaturaleza_tuberculosis INT,
	fkLaboratorio INT,
	observaciones TEXT,
	estado CHAR(1),
	FOREIGN KEY (fkMedico) REFERENCES usuario(idUsuario),	
	FOREIGN KEY (fkPaciente) REFERENCES paciente(idPaciente),
	FOREIGN KEY (fkTuberculosis) REFERENCES tuberculosis(idTuberculosis),
	FOREIGN KEY (fkNaturaleza_tuberculosis) REFERENCES naturaleza_tuberculosis(idNatu_tuberculosis),
	FOREIGN KEY (fkLaboratorio) REFERENCES laboratorio(idLaboratorio)	
);



CREATE TABLE metodo_diagnostico(
	idMetodo_diagnostico INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	descripcion TEXT,
	estado CHAR(1) DEFAULT 1
);

CREATE TABLE detalle_laboratorio_metodo(
	fkLaboratorio INT,
	fkMetodo INT,
	estado CHAR(1) DEFAULT 1,
	PRIMARY KEY(fkLaboratorio, fkMetodo),
	FOREIGN KEY(fkLaboratorio) REFERENCES laboratorio(idLaboratorio),
	FOREIGN KEY(fkMetodo) REFERENCES metodo_diagnostico(idMetodo_diagnostico)
);



#===================================================================================
#			PRUEBAS LABORATORIO
#===================================================================================



CREATE TABLE IF NOT EXISTS resultado_bk(
	idResultado_bk INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1	
);

CREATE TABLE IF NOT EXISTS detalle_resultado_bk(
	idDetalle_resultado_bk INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha_resultado DATE,	
	fkMetodo INT,
	fkMuestra INT,
	fkResultado_bk INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkResultado_bk) REFERENCES resultado_bk(idResultado_bk),
	FOREIGN KEY(fkMetodo) REFERENCES metodo_diagnostico(idMetodo_diagnostico),
	FOREIGN KEY(fkMuestra) REFERENCES muestra(idMuestra)	
);

CREATE TABLE IF NOT EXISTS resultadoprueba_sensibilidad_farmaco(
	idResultado_pru_sensibilidad_farmaco INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1	
);

CREATE TABLE IF NOT EXISTS detalle_resultado_prueba_farmaco(
	idDetalle_resultado_farmaco INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha_resultado DATE,	
	fkMetodo INT,
	fkMuestra INT,
	fkResultado_farmaco INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkResultado_farmaco) REFERENCES resultadoprueba_sensibilidad_farmaco(idResultado_pru_sensibilidad_farmaco),
	FOREIGN KEY(fkMetodo) REFERENCES metodo_diagnostico(idMetodo_diagnostico),
	FOREIGN KEY(fkMuestra) REFERENCES muestra(idMuestra)	
);


CREATE TABLE IF NOT EXISTS resultado_basiloscopia(
	idResultado_basilo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1	
);

CREATE TABLE IF NOT EXISTS detalle_resultado_basiloscopia(
	idDetalle_resultado_basiloscopia INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha_resultado DATE,	
	fkMetodo INT,
	fkMuestra INT,
	fkResultado_basiloscopia INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkResultado_basiloscopia) REFERENCES resultado_basiloscopia(idResultado_basilo),
	FOREIGN KEY(fkMetodo) REFERENCES metodo_diagnostico(idMetodo_diagnostico),
	FOREIGN KEY(fkMuestra) REFERENCES muestra(idMuestra)	
);


CREATE TABLE IF NOT EXISTS resultado_reportecultivo(
	idReportecultivo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1	
);

INSERT INTO resultado_reportecultivo VALUES(1, 'Positivo entre 1-20 colonias BAAR', 1);
INSERT INTO resultado_reportecultivo VALUES(2, '(+) 21 a 100 colonias BAAR', 1);
INSERT INTO resultado_reportecultivo VALUES(3, '(++) Más de 100 colonias BAAR', 1);
INSERT INTO resultado_reportecultivo VALUES(4, '(+++) Colonias BAAR confluentes', 1);
INSERT INTO resultado_reportecultivo VALUES(5, 'Cultivo negativo', 1);
INSERT INTO resultado_reportecultivo VALUES(6, 'Contaminado', 1);
INSERT INTO resultado_reportecultivo VALUES(7, 'En proceso', 1);

CREATE TABLE IF NOT EXISTS especie(
	idEspecie INT  PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS detalle_resultado_cultivo(  
	idDetalle_resultado_cultivo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha_resultado DATE,
	fkMetodo INT,
	fkMuestra INT,
	fkEspecie INT,
	fkResultado_cultivo INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY (fkResultado_cultivo) REFERENCES resultado_reportecultivo(idReportecultivo),
	FOREIGN KEY (fkMuestra) REFERENCES muestra(idMuestra),
	FOREIGN KEY (fkEspecie) REFERENCES especie(idEspecie),
	FOREIGN KEY(fkMetodo) REFERENCES metodo_diagnostico(idMetodo_diagnostico)	
);


CREATE TABLE IF NOT EXISTS resultado_prueba_molecular(  
	idResultado_prueba_molecular INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS tipoprueba_molecular(  
	idTipo_pruebamolecular INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

INSERT INTO tipoprueba_molecular(idTipo_pruebamolecular, nombre, estado) VALUES(1, 'Sist. cerrado PCR tiempo real',1);
INSERT INTO tipoprueba_molecular(idTipo_pruebamolecular, nombre, estado) VALUES(2,'Amplificación e hibridación de sondas en línea',1);
INSERT INTO tipoprueba_molecular(idTipo_pruebamolecular, nombre, estado) VALUES(3, 'Amplificación e hibridación de sondas en línea',1);
INSERT INTO tipoprueba_molecular(idTipo_pruebamolecular, nombre, estado) VALUES(4, 'Otro', 1);


CREATE TABLE IF NOT EXISTS detalle_resultado_pruebamolecular(  
	idDetalle_resultado_molecular INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha_resultado DATE,
	fkMetodo INT,
	fkMuestra INT,
	fkTipo_prueba_molecular INT,
	fkResultado_molecular INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY(fkMetodo) REFERENCES metodo_diagnostico(idMetodo_diagnostico),		
	FOREIGN KEY (fkResultado_molecular) REFERENCES resultado_prueba_molecular(idResultado_prueba_molecular),
	FOREIGN KEY (fkMuestra) REFERENCES muestra(idMuestra),
	FOREIGN KEY (fkTipo_prueba_molecular) REFERENCES tipoprueba_molecular(idTipo_pruebamolecular)	
);

CREATE TABLE IF NOT EXISTS resultado_biopsia(  
	idResultado_biopsia INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255),
	estado CHAR(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS detalle_resultado_biopcia(  
	idDetalle_resultado_molecular INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha_resultado DATE,
	fkMetodo INT,
	fkMuestra INT,
	fkResultado_biopsia INT,
	estado CHAR(1) DEFAULT 1,
	FOREIGN KEY (fkResultado_biopsia) REFERENCES resultado_biopsia(idResultado_biopsia),
	FOREIGN KEY (fkMuestra) REFERENCES muestra(idMuestra),
	FOREIGN KEY(fkMetodo) REFERENCES metodo_diagnostico(idMetodo_diagnostico)		
);




























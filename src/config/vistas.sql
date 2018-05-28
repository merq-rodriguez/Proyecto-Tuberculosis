CREATE VIEW vista_personas AS 
SELECT per.doc_identificacion, per.nombres, per.apellidos, per.ocupacion,
per.telefono, per.fechanacimiento, reg.nombre AS regimen,
ips.nombre AS IPS, gpo.nombre AS grupo_poblacional, puin.nombre AS pueblo_indigeno, 
gre.nombre AS grupo_etnico, CONCAT(mu.nombre," - ",de.nombre)  AS lugar_nacimiento,
tidoc.nombre AS tipo_documento, ge.nombre AS genero
FROM persona AS per 
INNER JOIN regimen_salud  AS reg 
ON reg.idRegimen = per.fkregimen
INNER JOIN pueblo_indigeno AS puin 
ON puin.idPueblo_indigeno = per.fkPueblo_indigeno
INNER JOIN ips 
ON ips.idIps = per.fkIPS
INNER JOIN grupo_poblacional AS gpo
ON gpo.idPoblacional = per.fkGrupo_poblacional
INNER JOIN grupo_etnico AS gre 
ON gre.idEtnico = per.fkPertenencia_etnica
INNER JOIN municipio AS mu 
ON mu.idMunicipio = per.fkLugarnacimiento
INNER JOIN departamento AS de 
ON de.idDepartamento = mu.fkDepartamento
INNER JOIN tipodocumento AS tidoc 
ON tidoc.idTipodoc = per.fkTipodocumento
INNER JOIN genero AS ge 
ON ge.idGenero = per.fkGenero;

CREATE VIEW vista_respuestas AS
SELECT per.doc_identificacion, pre.idPregunta, cu.idCuestionario, cu.nombre AS cuestionario,
pre.nombre AS pregunta, precu.respuesta, tipre.nombre AS tipo_pregunta  
FROM cuestionario as cu 
JOIN pregunta_cuestionario AS precu 
ON precu.fkCuestionario = cu.idCuestionario
JOIN pregunta AS pre 
ON pre.idPregunta = precu.fkPregunta
JOIN tipo_pregunta As tipre
ON tipre.idTipo_pregunta = pre.fkTipo_pregunta
JOIN cuestionario_persona AS cuper 
ON cuper.fkCuestionario = precu.fkCuestionario
JOIN persona AS per 
ON per.doc_identificacion = cuper.fkPersona
WHERE  precu.respuesta IS NOT NULL;
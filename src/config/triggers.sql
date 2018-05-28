
#===============================================================================================
#            TRIGGER PARA CALCULAR LOS MESES DE GESTACION DE UNA EMBARAZADA
#            Y CONTROLAR QUE NO SE INGRESEN GENEROS DIFERENTES AL FEMENINO
#                               EN LA TABLA GESTACION                   
#===============================================================================================

DELIMITER @
CREATE TRIGGER TrigControlGestacionMujeres_insert BEFORE INSERT ON gestacion 
FOR EACH ROW
BEGIN
DECLARE genero VARCHAR(10);
SET genero = ( SELECT nombre FROM genero AS ge 
               JOIN persona AS per
               ON per.fkGenero = ge.idGenero
               WHERE per.doc_identificacion = NEW.fkPersona);
CASE genero
    WHEN 'FEMENINO' THEN
        SET NEW.semanas = ROUND( (SELECT DATEDIFF(CURRENT_DATE, NEW.fecha_inicio)) / 7);
    ELSE
        signal SQLSTATE '45000' SET MESSAGE_TEXT = 'La persona no tiene genero femenino.';
    END CASE;
END@
DELIMITER ;

DELIMITER @
CREATE TRIGGER TrigControlGestacionMujeres_update BEFORE UPDATE ON gestacion 
FOR EACH ROW
BEGIN
DECLARE genero VARCHAR(10);
SET genero = ( SELECT nombre FROM genero AS ge 
               JOIN persona AS per
               ON per.fkGenero = ge.idGenero
               WHERE per.doc_identificacion = NEW.fkPersona);
CASE genero
    WHEN 'FEMENINO' THEN
        SET NEW.semanas = ROUND( (SELECT DATEDIFF(CURRENT_DATE, NEW.fecha_inicio)) / 7);    
    ELSE
        signal SQLSTATE '45000' SET MESSAGE_TEXT = 'La persona no tiene genero femenino.';
    END CASE;
END@
DELIMITER ;



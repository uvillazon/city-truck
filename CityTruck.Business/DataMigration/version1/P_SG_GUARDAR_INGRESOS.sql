﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_INGRESOS(
p_id_ingreso SG_INGRESOS.ID_INGRESO%type,
p_fecha SG_INGRESOS.FECHA%type,
p_concepto  SG_INGRESOS.CONCEPTO%type,
p_id_caja SG_INGRESOS.ID_CAJA%type,
p_importe SG_INGRESOS.IMPORTE%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_ingreso  SG_INGRESOS.ID_INGRESO%type;
 v_nro  SG_INGRESOS.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_fecha IS NULL OR p_concepto IS NULL OR p_id_caja IS NULL OR p_importe IS NULL OR p_id_usr IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_ingreso = 0 THEN
         --creacion
        v_id_ingreso := Q_SG_INGRESOS.nextval;
        select MAx(NRO_COMP) INTO v_nro FROM SG_INGRESOS ;
       
        INSERT INTO SG_INGRESOS VALUES  (v_id_ingreso, v_nro + 1 , p_fecha, 'OTROS INGRESOS',p_concepto ,p_id_caja ,p_importe ,p_id_usr, sysdate );
        
        v_res := '0';
    --ELSE
        --editar
    END IF;
END IF;
    if v_res = 0 THEN
        v_res := '1';
     COMMIT;

    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Ingresos','P_SG_GUARDAR_INGRESOS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_COMPRAS(
p_id_compra SG_COMPRAS.ID_COMPRA%type,
p_fecha SG_COMPRAS.FECHA%type,
p_id_combustible SG_COMPRAS.ID_COMBUSTIBLE%type,  
p_id_caja SG_COMPRAS.ID_CAJA%type,
p_cantidad SG_COMPRAS.CANTIDAD%type,
p_nro_factura SG_COMPRAS.NRO_FACTURA %type,
p_tipo SG_COMPRAS.TIPO%type,
p_precio SG_COMPRAS.PRECIO%type,
p_importe SG_COMPRAS.IMPORTE%type,
p_formulario SG_COMPRAS.FORMULARIO%type,
p_total SG_COMPRAS.TOTAL%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_compra  SG_COMPRAS.ID_COMPRA%type;
 v_nro  SG_COMPRAS.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_fecha IS NULL OR p_id_combustible IS NULL OR p_id_caja IS NULL OR p_cantidad IS NULL 
    OR p_nro_factura IS NULL OR p_tipo IS NULL OR p_precio IS NULL OR p_importe IS NULL
    OR p_formulario IS NULL OR p_total IS NULL OR p_id_usr IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_compra = 0 THEN
         --creacion
        v_id_compra := Q_SG_COMPRAS.nextval;
        select MAx(NRO_COMP) INTO v_nro FROM SG_COMPRAS;
        
        IF v_nro IS NULL THEN
            v_nro:= 0;
        END IF;
        
        INSERT INTO SG_COMPRAS VALUES  (v_id_compra, v_nro + 1 , p_fecha, p_id_combustible,
         p_id_caja ,p_cantidad, p_nro_factura, p_tipo, p_precio, p_importe, p_formulario,
         p_total, p_id_usr, sysdate );
        
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
p_grabar_error_bd(v_errC,v_errD,'Modulo de Compras','P_SG_GUARDAR_COMPRAS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

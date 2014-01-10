﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_CAJAS(
p_id_caja SG_CAJAS.ID_CAJA %type,
p_nombre  SG_CAJAS.NOMBRE  %type,
p_nro_cuenta SG_CAJAS.NRO_CUENTA  %type,
p_moneda SG_CAJAS.MONEDA  %type,
p_descripcion SG_CAJAS.DESCRIPCION   %type,
p_saldo SG_CAJAS.SALDO   %type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_caja  SG_CAJAS.ID_CAJA %type;
 v_nro  SG_CAJAS.CODIGO %type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_id_caja IS NULL OR p_nombre IS NULL OR p_nro_cuenta IS NULL OR p_moneda IS NULL OR p_descripcion IS NULL
OR p_saldo IS NULL OR  p_id_usr IS NULL 
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_caja = 0 THEN
         --creacion
        v_id_caja := Q_SG_CAJAS.nextval;
        select MAx(CODIGO) INTO v_nro FROM SG_CAJAS;
       
        if v_nro is null then
            v_nro:= 0;
        end if;
        INSERT INTO SG_CAJAS  VALUES  (v_id_caja, v_nro + 1 , p_nombre, p_nro_cuenta,
        p_moneda ,p_descripcion ,p_saldo ,p_id_usr, sysdate );
        
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
p_grabar_error_bd(v_errC,v_errD,'Modulo de Efectivo','P_SG_GUARDAR_CAJAS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

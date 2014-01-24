﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_VENTA_CREDITO(
p_id_venta SG_VENTAS_CREDITO.ID_VENTA%type,
p_id_cliente SG_VENTAS_CREDITO.ID_CLIENTE%type,
p_id_combustible SG_VENTAS_CREDITO.ID_COMBUSTIBLE%type,
p_fecha SG_VENTAS_CREDITO.FECHA%type,
p_turno  SG_VENTAS_CREDITO.TURNO%type,
p_responsable SG_VENTAS_CREDITO.RESPONSABLE%type,
p_precio SG_VENTAS_CREDITO.PRECIO%type,
p_importe_bs SG_VENTAS_CREDITO.IMPORTE_BS%type,
p_importe_lts SG_VENTAS_CREDITO.IMPORTE_LTS%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_venta  SG_VENTAS_CREDITO.ID_VENTA%type;
 v_nro  SG_VENTAS_CREDITO.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
IF p_id_venta = 0 THEN
    IF p_fecha IS NULL OR p_id_cliente IS NULL OR p_id_combustible IS NULL OR p_turno IS NULL OR p_responsable IS NULL  
    THEN
        v_res := 'Faltan parametros.';
    END IF;
    IF v_res='0' THEN
    --vamos a crear nuestra secuencia
       if p_id_venta = 0 THEN
             --creacion
            v_id_venta := Q_SG_VENTAS_CREDITO .nextval;
            select MAx(NRO_COMP) INTO v_nro FROM SG_VENTAS_CREDITO  ;
           if v_nro is null then
                v_nro:= 0;
            end if;
            INSERT INTO SG_VENTAS_CREDITO (ID_VENTA, ID_COMBUSTIBLE ,ID_CLIENTE ,NRO_COMP,FECHA ,TURNO ,PRECIO ,IMPORTE_BS, IMPORTE_LTS ,RESPONSABLE, ID_USUARIO ,FECHA_REG )
            VALUES  (v_id_venta,  p_ID_COMBUSTIBLE , p_ID_CLIENTE , v_nro + 1, p_FECHA ,  p_TURNO ,  p_precio  , p_importe_lts *     p_precio ,p_importe_lts ,p_responsable, p_id_usr ,sysdate );
          
    --        v_res := '0';
    --         IF v_res = '0' THEN
    --            INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
    --             VALUES (Q_SG_KARDEX_EFECTIVO.nextval , p_id_caja , v_id_ingreso , 'INGRESO' ,p_fecha,'INGRESO  NRO: '||v_nro ||  '- '||p_concepto,p_importe,0,0,p_id_usr,sysdate );
    --        END IF;
        --ELSE
            --editar
        END IF;
    END IF;
ELSE 
    IF p_importe_lts IS NULL  
    THEN
        v_res := 'Faltan parametros.';
    END IF;
    IF v_res='0' THEN
        UPDATE SG_VENTAS_CREDITO SET IMPORTE_LTS = p_IMPORTE_LTS , IMPORTE_BS = p_IMPORTE_BS WHERE ID_VENTA =p_ID_VENTA ;
     END IF;
END IF;
    if v_res = '0' THEN
        v_res := '1';
        -- P_SG_ACT_KARDEX_EFECTIVO(p_id_caja,p_fecha,p_id_usr,v_res);
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

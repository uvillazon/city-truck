﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_INGRESOS(
p_id_ingreso SG_INGRESOS.ID_INGRESO%type,
p_fecha SG_INGRESOS.FECHA%type,
p_concepto  SG_INGRESOS.CONCEPTO%type,
p_id_caja SG_INGRESOS.ID_CAJA%type,
p_importe SG_INGRESOS.IMPORTE%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion 'Id' del regiratro y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_ingreso  SG_INGRESOS.ID_INGRESO%type;
 v_id_caja SG_INGRESOS.ID_CAJA%type;
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
       if v_nro is null then
            v_nro:= 1;
       ELSE 
                  v_nro:= v_nro +1;
        end if;
        INSERT INTO SG_INGRESOS VALUES  (v_id_ingreso, v_nro, p_fecha, 'OTROS INGRESOS',p_concepto ,p_id_caja ,p_importe ,p_id_usr, sysdate );
        
        v_res := '0';
        IF v_res = '0' THEN
            INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_EFECTIVO.nextval , p_id_caja , v_id_ingreso , 'INGRESO' ,p_fecha,'INGRESO  NRO: '||v_nro ||  '- '||p_concepto,p_importe,0,0,p_id_usr,sysdate );
        END IF;
    ELSE
        --editar
        SELECT NRO_COMP, ID_CAJA INTO v_nro, v_id_caja FROM SG_INGRESOS WHERE ID_INGRESO = p_id_ingreso;
        
        UPDATE SG_INGRESOS SET FECHA=p_fecha, 
                               CONCEPTO = p_concepto, 
                               ID_CAJA = p_id_caja, 
                               IMPORTE = p_importe
        WHERE ID_INGRESO = p_id_ingreso;
        
         
        UPDATE SG_KARDEX_EFECTIVO SET ID_CAJA =  p_id_caja,
                                      FECHA = p_fecha,
                                      DETALLE = 'INGRESO  NRO: '|| v_nro ||  '- '||p_concepto,
                                      INGRESO = p_importe
       WHERE ID_OPERACION = p_id_ingreso AND OPERACION = 'INGRESO';
       v_id_ingreso:= p_id_ingreso;
                                      
    END IF;
END IF;
    if v_res = 0 THEN
         P_SG_ACT_KARDEX_EFECTIVO(p_id_caja,p_fecha,p_id_usr,v_res);
         IF p_id_caja <> v_id_caja THEN
           P_SG_ACT_KARDEX_EFECTIVO(v_id_caja,p_fecha,p_id_usr,v_res); 
         END IF;
     COMMIT;
      v_res := TO_CHAR(v_id_ingreso);   
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
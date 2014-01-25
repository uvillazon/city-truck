﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_CLIENTES(
p_id_cliente SG_CLIENTES.ID_CLIENTE%type,
p_empresa SG_CLIENTES.EMPRESA%type,
p_nit SG_CLIENTES.NIT%type,
p_contacto SG_CLIENTES.CONTACTO%type,
p_telefono SG_CLIENTES.TELEFONO%type,
p_dir SG_CLIENTES.DIRECCION %type,
p_limite SG_CLIENTES.LIMITE %type,

p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_cliente SG_CLIENTES.ID_CLIENTE%type;
 v_consumo SG_CLIENTES.CONSUMO %type;
 v_saldo SG_CLIENTES.SALDO %type;
 v_nro  SG_CLIENTES.CODIGO %type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_id_cliente IS NULL OR p_empresa IS NULL OR p_nit IS NULL OR p_contacto IS NULL
OR p_telefono IS NULL OR  p_dir IS NULL OR p_limite IS NULL OR p_id_usr IS NULL
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
    v_consumo:= 0;
    v_saldo:= 0;
   if p_id_cliente = 0 THEN
         --creacion
        v_id_cliente := Q_SG_CLIENTES.nextval;
        select MAx(CODIGO) INTO v_nro FROM SG_CLIENTES;
       
        if v_nro is null then
            v_nro:= 0;
        end if;
        INSERT INTO SG_CLIENTES  VALUES  (v_id_cliente, v_nro + 1 , sysdate, p_empresa,
        p_nit,p_contacto ,p_telefono, p_dir, p_limite, v_consumo, v_saldo, p_id_usr, sysdate);
        
        v_res := '0';
        
    ELSE
        --editar
        UPDATE SG_CLIENTES SET EMPRESA = p_empresa,
                               NIT = p_nit,
                               CONTACTO = p_contacto,
                               TELEFONO = p_telefono,
                               DIRECCION = p_dir,
                               LIMITE  = p_limite WHERE ID_CLIENTE = p_id_cliente;
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
p_grabar_error_bd(v_errC,v_errD,'Modulo de Clientes','P_SG_GUARDAR_CLIENTES','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
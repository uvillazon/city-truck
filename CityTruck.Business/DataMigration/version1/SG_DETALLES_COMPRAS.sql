﻿ALTER TABLE CITYTRUCK.SG_DETALLES_COMPRAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE CITYTRUCK.SG_DETALLES_COMPRAS CASCADE CONSTRAINTS;

CREATE TABLE CITYTRUCK.SG_DETALLES_COMPRAS
(
  ID_DETALLE  NUMBER(7)                         NOT NULL,
  ID_COMPRA   NUMBER(7)                         NOT NULL,
  DETALLE     VARCHAR2(250 BYTE)                NOT NULL,
  PRECIO      NUMBER(15,5)                      NOT NULL,
  IMPORTE     NUMBER(15,5)                      NOT NULL,
  ID_USUARIO  NUMBER(5)                         NOT NULL,
  FECHA_REG   DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


CREATE UNIQUE INDEX CITYTRUCK.SG_DETALLES_COMPRAS_PK ON CITYTRUCK.SG_DETALLES_COMPRAS
(ID_DETALLE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


ALTER TABLE CITYTRUCK.SG_DETALLES_COMPRAS ADD (
  CONSTRAINT SG_DETALLES_COMPRAS_PK
 PRIMARY KEY
 (ID_DETALLE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

ALTER TABLE CITYTRUCK.SG_DETALLES_COMPRAS ADD (
  CONSTRAINT SG_DETALLES_COMPRAS_R01 
 FOREIGN KEY (ID_COMPRA) 
 REFERENCES CITYTRUCK.SG_COMPRAS (ID_COMPRA));
SET DEFINE OFF;
Insert into CITYTRUCK.SG_DETALLES_COMPRAS
   (ID_DETALLE, ID_COMPRA, DETALLE, PRECIO, IMPORTE, 
    ID_USUARIO, FECHA_REG)
 Values
   (10, 15, 'DETALLE', 32, 32, 
    2, TO_DATE('02/05/2014 21:26:53', 'MM/DD/YYYY HH24:MI:SS'));
COMMIT;

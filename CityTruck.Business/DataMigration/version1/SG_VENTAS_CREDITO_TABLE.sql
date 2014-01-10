﻿ALTER TABLE CITYTRUCK.SG_VENTAS_CREDITO
 DROP PRIMARY KEY CASCADE;

DROP TABLE CITYTRUCK.SG_VENTAS_CREDITO CASCADE CONSTRAINTS;

CREATE TABLE CITYTRUCK.SG_VENTAS_CREDITO
(
  ID_VENTA        NUMBER(7)                     NOT NULL,
  ID_COMBUSTIBLE  NUMBER(5)                     NOT NULL,
  ID_CLIENTE      NUMBER(5)                     NOT NULL,
  NRO_COMP        NUMBER(7)                     NOT NULL,
  FECHA           DATE                          NOT NULL,
  TURNO           VARCHAR2(40 BYTE)             NOT NULL,
  PRECIO          NUMBER(15,5)                  NOT NULL,
  IMPORTE_BS      NUMBER(15,5)                  NOT NULL,
  IMPORTE_LTS     NUMBER(15,5)                  NOT NULL,
  RESPONSABLE     VARCHAR2(250 BYTE),
  ID_USUARIO      NUMBER(5)                     NOT NULL,
  FECHA_REG       DATE
)
TABLESPACE USERS
RESULT_CACHE (MODE DEFAULT)
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MAXSIZE          UNLIMITED
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
            FLASH_CACHE      DEFAULT
            CELL_FLASH_CACHE DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


CREATE UNIQUE INDEX CITYTRUCK.SG_VENTAS_CREDITO_PK ON CITYTRUCK.SG_VENTAS_CREDITO
(ID_VENTA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MAXSIZE          UNLIMITED
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
            FLASH_CACHE      DEFAULT
            CELL_FLASH_CACHE DEFAULT
           )
NOPARALLEL;


ALTER TABLE CITYTRUCK.SG_VENTAS_CREDITO ADD (
  CONSTRAINT SG_VENTAS_CREDITO_PK
  PRIMARY KEY
  (ID_VENTA)
  USING INDEX CITYTRUCK.SG_VENTAS_CREDITO_PK
  ENABLE VALIDATE);

ALTER TABLE CITYTRUCK.SG_VENTAS_CREDITO ADD (
  CONSTRAINT SG_VENTAS_CREDITO_R01 
  FOREIGN KEY (ID_COMBUSTIBLE) 
  REFERENCES CITYTRUCK.SG_COMBUSTIBLES (ID_COMBUSTIBLE)
  ENABLE VALIDATE,
  CONSTRAINT SG_VENTAS_CREDITO_R02 
  FOREIGN KEY (ID_CLIENTE) 
  REFERENCES CITYTRUCK.SG_CLIENTES (ID_CLIENTE)
  ENABLE VALIDATE);

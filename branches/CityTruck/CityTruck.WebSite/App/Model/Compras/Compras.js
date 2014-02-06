﻿Ext.define('App.Model.Compras.Compras', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "CANTIDAD" },
            { type: "float", name: "IMPORTE" },
            { type: "float", name: "FORMULARIO" },
            { type: "float", name: "TOTAL" },
            { type: "float", name: "PRECIO" },
            { type: "int", name: "NRO_COMP" },
            { type: "int", name: "NRO_FACTURA" },
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "ID_COMPRA" },
            { type: "int", name: "ID_COMBUSTIBLE" },
            { type: "string", name: "TIPO" },
            { type: "string", name: "USUARIO" },
            { type: "string", name: "CUENTA" },
            { type: "string", name: "COMBUSTIBLE" }
        ]
});
﻿Ext.define('App.Model.Ingresos.Ingresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "NRO_COMP" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "REGISTRAR" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "USUARIO" },
            { type: "string", name: "CUENTA" }
        ]
});
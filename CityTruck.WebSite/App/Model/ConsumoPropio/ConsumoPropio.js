﻿Ext.define('App.Model.ConsumoPropio.ConsumoPropio', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "CODIGO" },
            { type: "string", name: "NOMBRE" },
            { type: "float", name: "CONSUMOLTS" },
            { type: "float", name: "CONSUMOIMP" }
        ]
});
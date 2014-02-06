﻿Ext.define('App.Model.Compras.DetallesCompra', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_COMPRA" },
            { type: "float", name: "IMPORTE" },
            { type: "float", name: "PRECIO" },
            { type: "string", name: "DETALLE" }
        ]
});

//PRODUCTO = x.SG_POS.CODIGO + " - " + x.SG_POS.SG_COMBUSTIBLES.NOMBRE,
//                ID_POS = x.ID_POS,
//                ID_POS_TURNO = x.ID_POS_TURNO,
//                ENT_LITTER = x.ENT_LITTER,
//                SAL_LITTER = x.SAL_LITTER,
//                TOTAL = x.ENT_LITTER - x.SAL_LITTER
﻿Ext.define('App.Store.Compras.Compras', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Compras.Compras',
    url: 'Compras/ObtenerComprasPaginado',
    sortProperty: 'FECHA'
});
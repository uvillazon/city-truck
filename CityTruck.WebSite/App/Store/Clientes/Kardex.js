﻿Ext.define('App.Store.Clientes.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Clientes.Kardex',
    url: 'Clientes/ObtenerKardexClientePaginado',
    sortProperty: 'FECHA_REG',
    sortDirection: 'ASC',
});
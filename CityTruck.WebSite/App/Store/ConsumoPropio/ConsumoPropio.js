﻿Ext.define('App.Store.ConsumoPropio.ConsumoPropio', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.ConsumoPropio.ConsumoPropio',
    url: 'Ingresos/ObtenerIngresosPaginado',
    sortProperty: 'FECHA'
});
﻿Ext.define("App.View.CuentasPC.GridKardexCliente", {
    extend: "Ext.grid.Panel",
    title: 'Kardex Cuentas por Cobrar',
    criterios: true,
    textBusqueda: 'Buscar Cuenta por Cobrar',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Cuentas Por Cobrar',
    win: null,
    formulario: null,
    imagenes: true,
    id_cliente: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridKardexCuentasPC") {
            me.CargarGridKardexCuentasPC();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridKardexCuentasPC: function () {
        var me = this;
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.Clientes.Kardex");
        me.store.setExtraParams({ID_CLIENTE : me.id_cliente});
        me.store.load();
        //me.CargarComponentes();


        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + "."

        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro <br>Comprobante", width: 80, sortable: false, dataIndex: "NRO_COMP" },
            { header: "Fecha", width: 100, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Detalle", width: 245, sortable: false, dataIndex: "DETALLE" },
            { header: "Consumo", width: 80, sortable: false, dataIndex: "CONSUMO", align: 'right' },
            { header: "Amortizaci\u00F3n", width: 80, sortable: false, dataIndex: "AMORTIZACION", align: 'right' },
            { header: "Saldo", width: 80, sortable: false, dataIndex: "SALDO", align: 'right'}

        ];

        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    }
});
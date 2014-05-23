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
            me.EventoKardex();
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

        me.date_fechaInicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Inicial',
            margin: '5',
            name: 'FECHA_INICIAL',
            opcion: 'blanco',
        });

        me.date_fechaFinal = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Final',
            name: 'FECHA_FINAL',
            margin: '5',
            opcion: 'blanco',
        });
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                me.date_fechaInicial,
                me.date_fechaFinal
            ]
        });
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + "."

        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
//            { header: "Nro <br>Comprobante", width: 80, sortable: false, dataIndex: "NRO_COMP" },
            {header: "Fecha", width: 100, sortable: false, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Detalle", width: 245, sortable: false, dataIndex: "DETALLE" },
            { header: "Consumo", width: 100, sortable: false, dataIndex: "CONSUMO", align: 'right' },
            { header: "Amortizaci\u00F3n", width: 100, sortable: false, dataIndex: "AMORTIZACION", align: 'right' },
            { header: "Saldo", width: 100, sortable: false, dataIndex: "SALDO", align: 'right'}

        ];

        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    },
    EventoKardex : function(){
        var me = this;
        me.date_fechaInicial.on('select',function(field, value, eOpts ){
//            alert(value);
            me.store.setExtraParams({FECHA_INICIAL : value});
            me.store.setExtraParams({FECHA_FINAL : me.date_fechaFinal.getValue()});
            me.store.load();
            
            
        });
        me.date_fechaFinal.on('select',function(field, value, eOpts ){
            me.store.setExtraParams({FECHA_INICIAL : me.date_fechaInicial.getValue()});
            me.store.setExtraParams({FECHA_FINAL : value});
            me.store.load();
            
        });
    },
    LimpiarGrid : function(){
        var me = this;
        me.store.limpiarParametros();
        me.date_fechaInicial.reset();
        me.date_fechaFinal.reset();
    }
});
﻿Ext.define("App.View.Tanques.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Tanques',
    accionGrabar: 'GrabarTanques',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();

        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.EventosTanques, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Imprimirsa', 'Imprimir S/A', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosTanques, me.toolbar, this);
        Funciones.CrearMenu('btn_AjustarTanque', 'Ajustar', Constantes.ICONO_CREAR, me.EventosTanques, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_RepAjustes', 'Reporte Ajustes', 'report', me.EventosTanques, me.toolbar, this);
        Funciones.CrearMenu('btn_reporte', 'Imprimir Reporte', 'printer', me.EventosTanques, me.toolbar, this);

        me.grid = Ext.create('App.View.Tanques.GridTanques', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridTanques',
            toolbar: me.toolbar
        });
        me.items = [me.grid];
        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.record = record;
        me.id = record.get('ID_VENTA');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_AjustarTanque', me.toolbar, disabled);
    },
    EventosTanques: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_AjustarTanque") {
            if (me.winAjustarTanque == null) {
                me.winAjustarTanque = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
                me.formAjustarTanque = Ext.create("App.View.Tanques.FormAjustarTanque", {
                    columns: 1,
                    title: 'Formulario de Ajuste de Tanques ',
                    botones: false
                })
                me.formAjustarTanque.cargarEdtiar(me.record);
                me.winAjustarTanque.add(me.formAjustarTanque);
                me.winAjustarTanque.show();
                me.winAjustarTanque.btn_guardar.on('click', me.guardarAjuste, this);
            } else {
                me.formAjustarTanque.getForm().reset();
                me.formAjustarTanque.cargarEdtiar(me.record);
                me.winAjustarTanque.show();
                me.winAjustarTanque.btn_guardar.on('click', me.guardarAjuste, this);
            }
        }
        else if (btn.getItemId() == "btn_RepAjustes") {
            var win = Ext.create("App.Config.Abstract.Window");
            var grid = Ext.create('App.View.Tanques.Grids', { opcion: 'GridAjustes', height: 350, width: 550 });
            win.add(grid);
            grid.getStore().load();
            win.show();
        }
        else if (btn.getItemId() == "btn_reporte") {
            window.open(Constantes.HOST + 'Reportes/ReporteTanque?ANIO=' + me.grid.cbx_anio.getValue() + '&MES=' + me.grid.cbx_mes.getValue());
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    guardarAjuste: function () {
        var me = this;
        Funciones.AjaxRequestWin('Combustibles', 'GuardarAjusteTanque', me.winAjustarTanque, me.formAjustarTanque, me.grid, 'Esta Seguro de Guardar Ajuste?', null, me.winAjustarTanque);
    }

});

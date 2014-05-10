﻿Ext.define("App.View.Ventas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Ventas',
    accionGrabar: 'GrabarVentas',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearVenta', 'Crear Venta', Constantes.ICONO_CREAR, me.EventosVenta, me.toolbar, this);
        //        Funciones.CrearMenu('btn_CrearVentaMN', 'Crear Venta MN', Constantes.ICONO_CREAR, me.EventosVenta, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', Constantes.ICONO_IMPRIMIR, me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', Constantes.ICONO_VER, me.EventosVenta, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Reporte', 'Comprobanbte', Constantes.ICONO_IMPRIMIR, me.EventosVenta, me.toolbar, this, null, true);


        me.grid = Ext.create('App.View.Ventas.GridVentas', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridVentas',
            toolbar: me.toolbar
        });
        me.items = [me.grid
        ];
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
        if (!disabled) {
            var campo = selModel.nextSelection.columnHeader.dataIndex;

            if (campo == "VENTA_DIA") { me.turno = "DIA"; }
            else if (campo == "VENTA_TARDE") { me.turno = "TARDE"; }
            else if (campo == "VENTA_NOCHE") { me.turno = "NOCHE"; }
            else { me.turno = ""; }
            //            alert(me.turno);
        }
        else { me.turno == ""; }
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Reporte', me.toolbar, disabled);
    },
    EventosVenta: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearVenta") {
            if (me.winCrearVenta == null) {
                me.winCrearVenta = Ext.create("App.Config.Abstract.Window");
                me.panelVentas = Ext.create("App.View.Ventas.FormCrearVenta", {
                    columns: 4,
                    title: 'Formulario de Registro de Ventas ',
                    botones: false
                });
                me.panelVentas.CargarFecha();
                me.winCrearVenta.add(me.panelVentas);
                me.winCrearVenta.show();
            } else {
                me.panelVentas.getForm().reset();
                me.panelVentas.CargarStoreFecha();
                me.panelVentas.gridVenta.getStore().removeAll();
                me.panelVentas.gridVentaCredito.getStore().removeAll();
                me.panelVentas.gridVentaConsumo.getStore().removeAll();
                me.panelVentas.CargarFecha(me.grid.getStore());
                me.winCrearVenta.show();
            }
        }
        else if (btn.getItemId() == "btn_CrearVentaMN") {
            me.CrearVentaMN();
        }
        else if (btn.getItemId() == "btn_Detalle") {
            //            alert(me.turno);
            if (me.turno == "") {
                Ext.Msg.alert("Aviso", "Seleccione DIA , TARDE , NOCHE ");
                return false;
            }
            if (me.winEditarVenta == null) {
                me.winEditarVenta = Ext.create("App.Config.Abstract.Window");
                me.panelVentasEditar = Ext.create("App.View.Ventas.FormCrearVenta", {
                    columns: 4,
                    title: 'Formulario de Registro de Ventas ',
                    botones: false,
                    editar: true
                });
                me.panelVentasEditar.CargarEditarVenta(me.record, me.turno);
                me.winEditarVenta.add(me.panelVentasEditar);
                me.winEditarVenta.show();
            } else {
                me.panelVentasEditar.getForm().reset();
                me.panelVentasEditar.CargarEditarVenta(me.record, me.turno);
                me.panelVentasEditar.gridVenta.getStore().removeAll();
                me.panelVentasEditar.gridVentaCredito.getStore().removeAll();
                me.panelVentasEditar.gridVentaConsumo.getStore().removeAll();
                me.winEditarVenta.show();
            }
        }
        else if (btn.getItemId() == "btn_Reporte") {
            if (me.turno == "") {
                Ext.Msg.alert("Error", "Seleccione un TURNO")
            }
            else {
                window.open(Constantes.HOST + 'Reportes/ReporteVentaDiaria?FECHA=' + me.record.get('FECHA') + '&TURNO=' + me.turno);
            }
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    CrearVentaMN: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Registro a MN' });
    }
});

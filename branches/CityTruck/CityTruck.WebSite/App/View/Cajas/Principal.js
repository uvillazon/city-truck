﻿Ext.define("App.View.Cajas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Ventas',
    accionGrabar: 'GrarbarCaja',
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
        me.id_caja = 0;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearCaja', 'Crear Caja', Constantes.ICONO_CREAR, me.EventosCaja, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'folder_database', me.EventosCaja, me.toolbar, this, null, true);
       // Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCaja, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCaja, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCaja, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Cajas.GridCajas', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridCajas',
            toolbar: me.toolbar
        });

        me.items = [me.grid];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.id_caja = record.get('ID_CAJA');
        me.recordSelected = record;
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        //Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Kardex', me.toolbar, disabled);
    },
    EventosCaja: function (btn) {

        var me = this;
        switch (btn.getItemId()) {
            case "btn_CrearCaja":
                me.MostrarForm(true);
                break;
            case "btn_Editar":
                me.MostrarForm(false, false);
                break;
            case "btn_Detalle":
                me.MostrarForm(false, true);
                break;
            case "btn_Eliminar":
                me.EliminarRegistro();
                break;
            case "btn_Kardex":
                me.CrearVentanaKardex();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }

    }, MostrarForm: function (isNew, block) {
        var me = this;

        if (me.winCrearCaja == null) {
            me.winCrearCaja = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
            me.formCrearCaja = Ext.create("App.View.Cajas.FormCaja", {
                title: 'Registro de Cajas ',
                botones: false
            });
            me.winCrearCaja.add(me.formCrearCaja);
            me.winCrearCaja.btn_guardar.on('click', me.GuardarCajas, this);

        } else {
            me.formCrearCaja.getForm().reset();
        }

        if (!isNew && !Funciones.isEmpty(me.recordSelected)) {
            me.formCrearCaja.ocultarSaldos(false);
            me.formCrearCaja.CargarDatos(me.recordSelected);
        } else
            me.formCrearCaja.ocultarSaldos(true);
        me.winCrearCaja.show();
    },
    GuardarCajas: function () {
        var me = this;
        Funciones.AjaxRequestWin('Cajas', 'GuardarCaja', me.winCrearCaja, me.formCrearCaja, me.grid, 'Esta Seguro de Guardar la Caja?', null, me.winCrearCaja);
    }, CrearVentanaKardex: function () {
        var me = this;
        var buttonGroup = [{
            xtype: 'button',
            text: 'Nuevo',
            iconCls: 'add',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                me.CrearFormMovimientoKardex(me.id_caja);
            }

        }, {
            xtype: 'button',
            text: 'Imprimir',
            iconCls: 'printer',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                me.ImprimirReporteCustomGrid(me.gridKardexCaja);
            }

        }, {
            xtype: 'button',
            text: 'Cerrar',
            iconCls: 'cross',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                this.up('window').hide();
            }

        }];

        if (me.winKardexCaja == null) {
            me.winKardexCaja = Ext.create("App.Config.Abstract.Window", { botones: false, buttons: buttonGroup });
            me.gridKardexCaja = Ext.create("App.View.Cajas.GridKardexCaja", {
                region: 'center',
                width: 700,
                height: 350,
                imagenes: false,
                opcion: 'GridKardexCaja',
                id_caja: me.id_caja
            });
            me.winKardexCaja.add(me.gridKardexCaja);
            me.winKardexCaja.show();
        } else {
            me.gridKardexCaja.store.setExtraParams({ ID_CAJA: me.id_caja });
            me.gridKardexCaja.store.load();
            me.winKardexCaja.show();
        }
    }, CrearFormMovimientoKardex: function (id_caja) {
        var me = this;
        if (me.winNuevoMovimiento == null) {
            me.winNuevoMovimiento = Ext.create("App.Config.Abstract.Window", { botones: true });
            me.formNuevoMovimiento = Ext.create("App.View.Cajas.FormMovimiento", {
                columns: 1,
                title: 'Nuevo Movimiento',
                botones: false
            });
            me.winNuevoMovimiento.add(me.formNuevoMovimiento);
            me.winNuevoMovimiento.btn_guardar.on('click', me.GuardarMovimiento, this);
            //me.formNuevoMovimiento.cbx_cuenta.setValue(id_caja);
            me.winNuevoMovimiento.show();
        } else {
            //me.formNuevoMovimiento.cbx_cuenta.setValue(id_caja);
            //me.formNuevoMovimiento.reset();
            me.winNuevoMovimiento.show();
        }

        if (me.id_caja >= 0)
            me.formNuevoMovimiento.cargarCaja(me.id_caja);

    }, GuardarMovimiento: function () {
        var me = this;
        if (me.formNuevoMovimiento.cbx_registrar.getValue() == 'OTROS INGRESOS') {
            Funciones.AjaxRequestWin('Ingresos', 'GuardarIngreso', me.winNuevoMovimiento,
             me.formNuevoMovimiento, me.gridKardexCaja, 'Esta Seguro de Guardar el Movimiento?', null, me.winNuevoMovimiento);
        } else if (me.formNuevoMovimiento.cbx_registrar.getValue() == 'OTROS EGRESOS') {
            Funciones.AjaxRequestWin('Egresos', 'GuardarEgreso', me.winNuevoMovimiento,
             me.formNuevoMovimiento, me.gridKardexCaja, 'Esta Seguro de Guardar el Movimiento?', null, me.winNuevoMovimiento);
        }

    }, EliminarRegistro: function () {
        var me = this;
        Funciones.AjaxRequestGrid("Cajas", "EliminarCaja", me, "Esta Seguro de Eliminar este Registro", { ID_CAJA: me.id_caja }, me.grid, null);

    }
});

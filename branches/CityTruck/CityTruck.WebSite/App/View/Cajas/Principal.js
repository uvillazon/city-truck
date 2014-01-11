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
        me.grid = Ext.create('App.View.Cajas.GridCajas', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridCajas'
        });

        me.items = [me.grid
        ];
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearCaja', 'Crear Caja', Constantes.ICONO_CREAR, me.EventosCaja, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.EventosCaja, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCaja, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCaja, me.toolbar, this);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCaja, me.toolbar, this);
        //        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        me.grid.on('itemclick', function (view, record, item, index, e) {
            me.id_caja = record.get('ID_CAJA');
        }, this);

    },
    EventosCaja: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearCaja") {
            if (me.winCrearCaja == null) {
                me.winCrearCaja = Ext.create("App.Config.Abstract.Window", { botones: true });
                me.formCrearCaja = Ext.create("App.View.Cajas.FormCaja", {
                    columns: 1,
                    title: 'Registro de Cajas ',
                    botones: false
                });
                me.winCrearCaja.add(me.formCrearCaja);
                me.winCrearCaja.btn_guardar.on('click', me.GuardarCajas, this);
                me.winCrearCaja.show();
            } else {
                me.winCrearCaja.show();
            }
        } else if (btn.getItemId() == 'btn_Kardex') {
            me.CrearVentanaKardex();
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }

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
            text: 'Detalle',
            iconCls: 'report',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                alert('Evento Detalle');
            }

        }, {
            xtype: 'button',
            text: 'Imprimir',
            iconCls: 'printer',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                alert('Evento Imprimir');
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
            me.formNuevoMovimiento.reset();
            me.winNuevoMovimiento.show();
        }

    }, GuardarMovimiento: function () {
        var me = this;
        if (me.formNuevoMovimiento.cbx_registrar.getValue() == 'OTROS INGRESOS') {
            Funciones.AjaxRequestWin('Ingresos', 'GuardarIngreso', me.winNuevoMovimiento,
             me.formNuevoMovimiento, me.gridKardexCaja, 'Esta Seguro de Guardar el Movimiento?', null, me.winNuevoMovimiento);
        } else if (me.formNuevoMovimiento.cbx_registrar.getValue() == 'OTROS EGRESOS') {
            Funciones.AjaxRequestWin('Egresos', 'GuardarEgreso', me.winNuevoMovimiento,
             me.formNuevoMovimiento, me.gridKardexCaja, 'Esta Seguro de Guardar el Movimiento?', null, me.winNuevoMovimiento);
        }

    }
});

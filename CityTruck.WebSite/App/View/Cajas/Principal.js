﻿var id_caja = 0;
Ext.define("App.View.Cajas.Principal", {
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
            console.log(record.get('ID_CAJA'));
            id_caja = record.get('ID_CAJA');
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
                alert('Evento Nuevo');
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
                id_caja: id_caja
            });
            me.winKardexCaja.add(me.gridKardexCaja);
            me.winKardexCaja.show();
        } else {
            me.gridKardexCaja.store.setExtraParams({ ID_CAJA: id_caja });
            me.gridKardexCaja.store.load();
            me.winKardexCaja.show();
        }
    }
});

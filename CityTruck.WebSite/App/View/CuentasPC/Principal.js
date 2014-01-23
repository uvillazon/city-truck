﻿Ext.define("App.View.CuentasPC.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'CuentasPC',
    accionGrabar: 'GrabarCuentasPC',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.id_cliente = 0;
       
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearCuentaPC', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCuentaPC, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'folder_database', me.EventosCuentaPC, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosIngreso, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosIngreso, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosIngreso, me.toolbar, this, null, true);
        //        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        //me.grid.addDocked(me.toolbar, 1);
        me.grid = Ext.create('App.View.CuentasPC.GridCuentasPC', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridCuentasPC',
            toolbar: me.toolbar
        });
        me.items = [me.grid
        ];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);
    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.id_cliente = record.get('ID_CLIENTE');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Kardex', me.toolbar, disabled);
    },
    EventosCuentaPC: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearCuentaPC") {
            if (me.winCrearCliente == null) {
                me.winCrearCliente = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
                me.formCliente = Ext.create("App.View.CuentasPC.FormCuentaPC", {
                    title: 'Registro de Cliente ',
                    botones: false
                });

                me.winCrearCliente.add(me.formCliente);
                me.winCrearCliente.btn_guardar.on('click', me.GuardarCliente, this);
                me.winCrearCliente.show();
            } else {
                me.formCliente.getForm().reset();
                me.winCrearCliente.show();
            }
        } else if (btn.getItemId() == 'btn_Kardex') {
            var buttonGroup = [{
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
                text: 'Amortizaci\u00F3n',
                iconCls: 'add',
                minHeight: 27,
                minWidth: 80,
                handler: function () {
                    me.CrearFormAmortizacionKardex(me.id_caja);
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
            if (me.gridKardexCaja == null) {
                me.winKardexCaja = Ext.create("App.Config.Abstract.Window", { botones: false, buttons: buttonGroup });
                me.gridKardexCaja = Ext.create("App.View.CuentasPC.GridKardexCliente", {
                    region: 'center',
                    width: 700,
                    height: 350,
                    imagenes: false,
                    id_cliente: me.id_cliente,
                    opcion: 'GridKardexCuentasPC'
                });
                me.winKardexCaja.add(me.gridKardexCaja);
                me.winKardexCaja.show();
            } else {
                me.gridKardexCaja.store.setExtraParams({ ID_CLIENTE: me.id_cliente });
                me.gridKardexCaja.store.load();
                me.winKardexCaja.show();
            }
        } else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }, CrearFormAmortizacionKardex: function (id_caja) {
        var me = this;
        if (me.winNuevoMovimiento == null) {
            me.winNuevoMovimiento = Ext.create("App.Config.Abstract.Window", { botones: true });
            me.formNuevoMovimiento = Ext.create("App.View.Clientes.FormMovimiento", {
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
            me.formNuevoMovimiento.getForm().reset();
            me.winNuevoMovimiento.show();
        }

    }, GuardarMovimiento: function () {
        var me = this;
        Funciones.AjaxRequestWin('Clientes', 'GuardarAmortizacion', me.winNuevoMovimiento,
             me.formNuevoMovimiento, me.gridKardexCaja, 'Esta Seguro de Guardar el Movimiento?', null, me.winNuevoMovimiento);
    }, GuardarCliente: function () {
        var me = this;
        Funciones.AjaxRequestWin('Clientes', 'GuardarCliente', me.winCrearCliente,
             me.formCliente, me.grid, 'Esta Seguro de Guardar el Cliente?', null, me.winCrearCliente);
    }
});

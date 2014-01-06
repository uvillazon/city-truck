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
        me.grid = Ext.create('App.View.CuentasPC.GridCuentasPC', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridCuentasPC'
        });
        me.items = [me.grid
        ];
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearCuentaPC', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCuentaPC, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'folder_database', me.EventosCuentaPC, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.EventosCuentaPC, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCuentaPC, me.toolbar, this);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCuentaPC, me.toolbar, this);
        //        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        //        me.grid.on('cellclick', me.CargarDatos, this);

    },
    EventosCuentaPC: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearCuentaPC") {
            if (me.winCrearCuentaPC == null) {
                me.winCrearCuentaPC = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
                me.formCuentaPC = Ext.create("App.View.CuentasPC.FormCuentaPC", {
                    title: 'Formulario de Registro de Cuentas por Cobrar ',
                    botones: false
                });

                me.winCrearCuentaPC.add(me.formCuentaPC);
                me.winCrearCuentaPC.show();
            } else {
                me.formCuentaPC.getForm().reset();
                me.winCrearCuentaPC.show();
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
                    alert('Evento Amortizaci\u00F3n');
                }

            },{
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
            if (me.winKardexCuentaPC == null) {
                me.winKardexCuentaPC = Ext.create("App.Config.Abstract.Window", { botones: false, buttons: buttonGroup });
                me.gridKardexCuentaPC = Ext.create("App.View.CuentasPC.GridKardexCuentaPC", {
                    region: 'center',
                    width: 700,
                    height: 350,
                    imagenes: false,
                    opcion: 'GridKardexCuentasPC'
                });
                me.winKardexCuentaPC.add(me.gridKardexCuentaPC);
                me.winKardexCuentaPC.show();
            } else {
                me.winKardexCuentaPC.show();
            }
        } else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }

});

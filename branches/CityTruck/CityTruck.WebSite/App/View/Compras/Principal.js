﻿Ext.define("App.View.Compras.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Ingresos',
    accionGrabar: 'GrabarIngresos',
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
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCompras, me.toolbar, this);

        me.grid = Ext.create('App.View.Compras.GridCompras', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridCompras',
            toolbar: me.toolbar
        });

        me.items = [me.grid];

    },
    EventosCompras: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Crear") {
            if (me.winCrearCompra == null) {
                me.winCrearCompra = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Nuevo Compra' });
                me.formCompra = Ext.create("App.View.Compras.FormCompra", {
                    columns: 2,
                    title: 'Formulario de Registro de Compras ',
                    botones: false
                })

                me.winCrearCompra.add(me.formCompra);
                me.winCrearCompra.btn_guardar.on('click', me.GuardarCompras, this);
                me.winCrearCompra.show();
            } else {
                me.formCompra.getForm().reset();
                me.winCrearCompra.show();
            }
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }, GuardarCompras: function () {
        var me = this;
        Funciones.AjaxRequestWin('Compras', 'GuardarCompra', me.winCrearCompra, me.formCompra, me.grid, 'Esta Seguro de Guardar la Compra?', null, me.winCrearCompra);
    } 
});

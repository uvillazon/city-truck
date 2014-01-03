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
        me.grid = Ext.create('App.View.Compras.GridCompras', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridCompras'
        });
        me.items = [me.grid
        ];
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCompras, me.toolbar, this);
        //        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        //        me.grid.on('cellclick', me.CargarDatos, this);

    },
    EventosCompras: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Crear") {
            if (me.winCrearIngreso == null) {
                me.winCrearIngreso = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Nuevo Compra' });
                me.formIngreso = Ext.create("App.View.Compras.FormCompra", {
                    columns: 2,
                    title: 'Formulario de Registro de Compras ',
                    botones: false
                })

                me.winCrearIngreso.add(me.formIngreso);
                me.winCrearIngreso.show();
            } else {
                me.formIngreso.getForm().reset();
                me.winCrearIngreso.show();
            }
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
    //    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
    //        var me = this;
    //        me.formulario.CargarDatos(record);
    //        me.panelImagen.setTitle("Visor de Imagenes - "+record.get('COD_ALTERNATIVO'));
    //        me.ViewImagen.store.setExtraParams({ TABLA: me.Tabla, ID_TABLA: record.get(me.idTabla) });
    //        me.ViewImagen.store.load();

    //    },
    //    EventosBoton: function (btn) {
    //        var me = this;

    //        if (btn.getItemId() == '') {

    //        }
    //        else {
    //            alert("No se Selecciono ningun botton");
    //        }
    //    },
    //    EventoConfiguracion: function (btn) {
    //        me = this;
    //        if (btn.getItemId() == 'btn_configuracionUC') {
    //            if (me.winConfig == null) {
    //                me.winConfig = Ext.create("App.Config.Abstract.Window");
    //                me.formConfig = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionCodSol', title: 'Formulario de Configuracion Codigo Solucion y Materiales' });
    //                me.winConfig.add(me.formConfig);
    //                me.winConfig.show();
    //            }
    //            else {
    //                me.formConfig.getForm().reset();
    //                me.winConfig.show();
    //            }
    //        }
    //        else if (btn.getItemId() == 'btn_configuracionCodMat') {
    //            if (me.winConfigMat == null) {
    //                me.winConfigMat = Ext.create("App.Config.Abstract.Window");
    //                me.formConfigMat = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionCodMan', title: 'Formulario de Configuracion Codigo Materiales y Cod. Soluciones' });
    //                me.winConfigMat.add(me.formConfigMat);
    //                me.winConfigMat.show();
    //            }
    //            else {
    //                me.formConfigMat.getForm().reset();
    //                me.winConfigMat.show();
    //            }
    //        }
    //        else { alert("Selecione uina opcion") }
    //    }
});

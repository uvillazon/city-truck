﻿Ext.define("App.View.Usuarios.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormPerfil") {
            //            me.title = "Subtotales";
            me.CargarFormPerfil();
            me.eventosFormPerfil();
        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        this.callParent(arguments);
    },
    CargarFormPerfil: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearPerfil', 'Crear', Constantes.ICONO_CREAR, me.EventosPerfil, me.toolbar, this);
        Funciones.CrearMenu('btn_EliminarPerfil', 'Eliminar', Constantes.ICONO_Baja, me.EventosPerfil, me.toolbar, this, null, true);

        me.gridPerfiles = Ext.create("App.View.Usuarios.Grids", {
            width: 360,
            opcion: 'GridPerfiles',
            height: 400
        });
        me.gridMenu = Ext.create("App.View.Usuarios.Grids", {
            width: 360,
            opcion: 'GridMenuOpciones',
            height: 400
        });
        me.items = [
           me.gridPerfiles,
        //           me.txt_diesel,
           me.gridMenu
        ];
    },
    eventosFormPerfil: function () {
        var me = this;
        me.gridPerfiles.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            if (disabled) {
                me.gridMenu.getStore().removeAll();
            }
            else {
                me.gridMenu.getStore().setExtraParams({ ID_PERFIL: selections[0].get('ID_PERFIL') });
                me.gridMenu.getStore().load();
            }
        });
    }
});

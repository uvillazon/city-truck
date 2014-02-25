﻿Ext.define("App.View.VentasMN.Principal", {
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

        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_CrearRegistro', 'Crear Registro', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this);

        me.grid = Ext.create('App.View.VentasMN.GridVentas', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridVentas',
            toolbar: me.toolbar
        });
        me.items = [me.grid];

    },
    EventosPrincipal: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearRegistro") {
            var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta MN' });
            var form = Ext.create("App.View.VentasMN.FormRegistro");
            win.add(form);
            win.show();
        }

        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }

});

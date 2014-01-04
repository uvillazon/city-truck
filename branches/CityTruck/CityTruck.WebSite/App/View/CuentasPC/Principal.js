Ext.define("App.View.CuentasPC.Principal", {
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
        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'folder_database', me.EventosCuentaPC, me.toolbar, this);
        Funciones.CrearMenu('btn_CrearCuentaPC', 'Crear Cuenta por Cobrar', Constantes.ICONO_CREAR, me.EventosCuentaPC, me.toolbar, this);
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
                me.winCrearCuentaPC = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Nueva Cuenta por Cobrar' });
                me.formCuentaPC = Ext.create("App.View.CuentasPC.FormCuentaPC", {
                    columns: 1,
                    title: 'Formulario de Registro de Cuentas por Cobrar ',
                    botones: false
                })

                me.winCrearCuentaPC.add(me.formCuentaPC);
                me.winCrearCuentaPC.show();
            } else {
                me.formCuentaPC.getForm().reset();
                me.winCrearCuentaPC.show();
            }
        } else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }

});

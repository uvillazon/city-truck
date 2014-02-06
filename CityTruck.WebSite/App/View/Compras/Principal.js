﻿Ext.define("App.View.Compras.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Compras',
    accionGrabar: 'GrabarCompras',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        me.CargarEventos();
        me.grid.getStore().load();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCompras, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCompras, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCompras, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Compras.GridCompras', {
            region: 'west',
            width : '70%',
            height: 350,
            imagenes: false,
            opcion: 'GridCompras',
            toolbar: me.toolbar
        });
       
        me.form = Ext.create('App.View.Compras.Forms', {
            opcion: 'formResumen',
            columns : 2,
            width : '30%',
            region: 'center',

        });
        Funciones.BloquearFormularioReadOnly(me.form);
        me.items = [me.grid,me.form];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.id_compra = record.get('ID_COMPRA');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
    },
    CargarEventos : function(){
        var me = this;
        me.grid.getStore().on('load',function(str,records,success){
            if(!success){
                str.removeAll();
                Ext.Msg.alert("Error","Ocurrio algun Error");
            }else{
                me.CargarTotales();
            }
        });
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
                me.formCompra.gridDetalle.getStore().removeAll();
                me.winCrearCompra.show();
            }
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    GuardarCompras: function () {
        var me = this;
        Funciones.AjaxRequestWin('Compras', 'GuardarCompra', me.winCrearCompra, me.formCompra, me.grid, 'Esta Seguro de Guardar la Compra?', { detalles: Funciones.convertirJson(me.formCompra.gridDetalle) }, me.winCrearCompra);
    },
    CargarTotales : function(){
        var me = this;
        var cantidadGasolina = 0;
        var cantidadDiesel = 0;
        var cantidadAdicionalGasolina = 0;
        var cantidadAdicionalDiesel = 0;
        var ImporteGasolina = 0;
        var ImporteDiesel = 0;
        me.grid.getStore().each(function(record){
//            alert(record.get('TOTAL'));
            if(record.get('TIPO') == "ASIGNACION"){
                if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                    cantidadGasolina= cantidadGasolina +  record.get('CANTIDAD');
                    ImporteGasolina= ImporteGasolina +  record.get('TOTAL');
                
                }
                else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                    cantidadDiesel= cantidadDiesel +  record.get('CANTIDAD');
                    ImporteDiesel= ImporteDiesel +  record.get('TOTAL');
                }
                else{
                    alert('No existe Codigo falta Implementar');
                }
            }
            else{
                if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                    cantidadAdicionalGasolina= cantidadAdicionalGasolina +  record.get('CANTIDAD');
                
                }
                else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                    cantidadAdicionalDiesel= cantidadAdicionalDiesel +  record.get('CANTIDAD');
                }
                else{
                    alert('No existe Codigo falta Implementar');
                }
            }

        });
        me.form.txt_cantidad.setValue(cantidadDiesel);
        me.form.txt_cant_diesel.setValue(cantidadGasolina);
        me.form.txt_importe.setValue(ImporteDiesel);
        me.form.txt_imp_diesel.setValue(ImporteGasolina);

        me.form.txt_asignacion.setValue(cantidadDiesel);
        me.form.txt_asignacion_gas.setValue(cantidadGasolina);
        me.form.txt_adicional.setValue(cantidadAdicionalDiesel);
        me.form.txt_adicional_diesel.setValue(cantidadAdicionalGasolina);

        me.form.txt_total.setValue(cantidadDiesel + cantidadAdicionalDiesel);
        me.form.txt_total_diesel.setValue(cantidadGasolina +cantidadAdicionalGasolina );
//        me.formSubTotales.txt_diesel.setValue(totalDiesel);
//        me.formSubTotales.txt_gasolina.setValue(totalGasolina);

//        me.formSubTotales.txt_diesel_bs.setValue(totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS);
//        me.formSubTotales.txt_gasolina_bs.setValue(totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS);

//        me.formSubTotales.txt_diesel_bs_costo.setValue(totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS);
//        me.formSubTotales.txt_gasolina_bs_costo.setValue(totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS);

//        me.formSubTotales.txt_total.setValue(totalDiesel + totalGasolina);
//        me.formSubTotales.txt_total_Bs.setValue(totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS + totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS);
//        me.formSubTotales.txt_total_Bs_costo.setValue(totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS + totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS);

//         me.formSubTotales.txt_utilidad.setValue((totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS + totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS) - (totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS + totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS) );
//        

    }
});

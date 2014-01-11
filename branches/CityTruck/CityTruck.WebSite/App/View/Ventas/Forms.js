﻿Ext.define("App.View.Ventas.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "formSubTotales") {
            me.title = "Subtotales";
            me.columns = 3,
            me.CargarFormSubTotales();

        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        else if(me.opcion == "formVentaCredito"){
//            me.columns = 1;
             me.title = "Registro Ventas a Credito";
            me.CargarFormVentaCredito();
            me.EventosFormVentaCredito();
        }
        this.callParent(arguments);
    },
    CargarFormSubTotales: function () {
        var me = this;
        var label1 = Ext.create("Ext.form.Label", {
            text: 'Sub. Total Litros',
            cls : 'resaltarAzulRight',
            
        });
        var label2 = Ext.create("Ext.form.Label", {
            text: 'Precio-Venta',
            cls : 'resaltarAzul',
        });
        var label3 = Ext.create("Ext.form.Label", {
            text: 'Precio-Costo',
            cls : 'resaltarAzul',
        });
        me.txt_diesel = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subtotal Diesel",
            name: "SUB_DIESEL",
//            width: 200,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_bs = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "SUB_DIESEL_BS",
//            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_bs_costo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "SUB_DIESEL_BS_COSTO",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subtotal Gasolina",
            name: "SUB_GASOLINA",
//            width: 200,
            emptyText: '',
            colspan: 1
        });
        me.txt_gasolina_bs = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "SUB_GASOLINA_BS",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina_bs_costo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "SUB_GASOLINA_BS_COSTO",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total Lts / Bs",
            name: "TOTAL",
            colspan: 1,
            emptyText: ''
        });
        me.txt_total_Bs = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "TOTAL_BS",
            colspan: 1,
            emptyText: ''
        });
        me.txt_total_Bs_costo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "TOTAL_BS_COSTO",
            colspan: 1,
            emptyText: ''
        });

        me.items = [
        label1,
        label2,
        label3,
        me.txt_diesel,
        me.txt_diesel_bs,
        me.txt_diesel_bs_costo,
        me.txt_gasolina,
        me.txt_gasolina_bs,
        me.txt_gasolina_bs_costo,
        me.txt_total,
        me.txt_total_Bs,
        me.txt_total_Bs_costo
        ];
    },
    CargarFormResumen: function () {
        var me = this;
        var label1 = Ext.create("Ext.form.Label", {
            text: 'LITROS',
            cls : 'resaltarAzulRight',

        });
        var label2 = Ext.create("Ext.form.Label", {
            text: 'P-COSTO',
            cls : 'resaltarAzul',
        });
        var label3 = Ext.create("Ext.form.Label", {
            text: 'P-VENTA',
            cls : 'resaltarAzul',
        });
        me.txt_diesel = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Diesel",
            name: "COD_POSTE",
            width: 180,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_costo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "COD_POSTE",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_venta = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "COD_POSTE",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Gasolina",
            name: "AREA_UBIC",
            width: 180,
            emptyText: '',
            colspan: 1
        });
        me.txt_gasolina_costo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "AREA_UBIC",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina_venta = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "AREA_UBIC",
            width: 70,
            colspan: 1,
            emptyText: ''
        });

        me.items = [
        label1,
        label2,
        label3,
        me.txt_diesel,
        me.txt_diesel_costo,
        me.txt_diesel_venta,
        me.txt_gasolina,
        me.txt_gasolina_costo,
        me.txt_gasolina_venta
        ];
    },
    CargarFormVentaCredito : function(){
        var me = this;
        me.store_cliente = Ext.create('App.Store.Clientes.Clientes');
        me.cbx_cliente = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Cliente",
            name: "ID_CLIENTE",
            displayField: 'EMPRESA',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {EMPRESA} NIT : {NIT}" },
            store: me.store_cliente,
        });
        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Combustible",
            name: "ID_COMBUSTIBLE",
            displayField: 'NOMBRE',
            valueField : 'ID_COMBUSTIBLE',
            store: me.store_combustible,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
         me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "CANTIDAD",
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.items = [
            me.cbx_cliente,
            me.cbx_combustible,
            me.num_litros,
            me.num_importe

        ];
    },
    EventosFormVentaCredito : function(){
        var me = this;
        me.num_litros.on('change',function(num,newvalue,oldvalue){
            var sum =  Constantes.CONFIG_PRECIO_VENTA* newvalue;
            me.num_importe.setValue(sum);
        });
    }
});

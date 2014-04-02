﻿Ext.define("App.View.Tanques.FormAjustarTanque", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },

    CargarComponentes: function () {
        var me = this;
        me.gridAjuste = Ext.create('App.View.Tanques.Grids', {
            opcion: 'GridAjustesPos',
            width: 250,
            height: 250
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total",
            readOnly: true,
            name: "TOTAL"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            readOnly: true,
        });
        //        me.gridAjuste.getStore().load();
        me.items = [me.date_fecha,me.gridAjuste, me.txt_total];
        //        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
        //            fieldLabel: "Nro Ajuste",
        //            readOnly: true,
        //            name: "NRO_AJUSTE"

        //        });

        //        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        //        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
        //            fieldLabel: "Combustible",
        //            name: "ID_COMBUSTIBLE",
        //            displayField: 'NOMBRE',
        //            valueField: 'ID_COMBUSTIBLE',
        //            store: me.store_combustible,
        //            colspan: 2,
        //            afterLabelTextTpl: Constantes.REQUERIDO,
        //            allowBlank: false,
        //            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        //        });

        //        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
        //            fieldLabel: "Fecha",
        //            name: "FECHA",
        //            afterLabelTextTpl: Constantes.REQUERIDO,
        //            allowBlank: false
        //        });

        //        me.num_saldo_actual = Ext.create("App.Config.Componente.NumberFieldBase", {
        //            fieldLabel: "Saldo Actual",
        //            name: "SALDO",
        //            readOnly: true,
        //            allowDecimals: true,
        //            maxValue: 999999999
        //        });

        //        me.num_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
        //            fieldLabel: "Cantidad",
        //            name: "CANTIDAD",
        //            allowDecimals: false,
        //            allowNegative: true,
        //            minValue: -99999999,
        //            maxValue: 999999999
        //        });

        //        me.num_nuevo_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
        //            fieldLabel: "Nuevo Saldo",
        //            name: "NUEVO_SALDO",
        //            readOnly: true,
        //            allowDecimals: true,
        //            maxValue: 999999999
        //        });

        //        me.txt_obs = Ext.create("App.Config.Componente.TextAreaBase", {
        //            fieldLabel: "Observaciones",
        //            width: '90%',
        //            name: "OBSERVACION"

        //        });

        //        me.items = [
        //            me.txt_nro_cmp,
        //            me.cbx_combustible,
        //            me.date_fecha,
        //            me.num_saldo_actual,
        //            me.num_cantidad,
        //            me.num_nuevo_saldo,
        //            me.txt_obs
        //        ];



    },
    cargarEdtiar: function (venta) {
        var me = this;
        me.date_fecha.setValue(venta.get('FECHA'));
        me.date_fecha.setReadOnly(true);
        me.venta = venta;
    },
    cargarEventos: function () {
        var me = this;
        //        me.gridAjuste.
        me.gridAjuste.getStore().on('load', function (str, records, success) {
            //            alert("entro Credito");
            if (!success) {
                str.removeAll();
                Ext.Msg.alert("Error", "Ocurrio algun Error Informar a TI.");
            }
            else {
                me.CargarTotales();
            }
        });
        me.gridAjuste.on('edit', function (editor, e) {

            if (e.field == "AJUSTE") {
                me.CargarTotales();
            }
        });
    },
    CargarTotales: function () {
        var me = this;
        var total = 0;
        me.gridAjuste.getStore().each(function (record) {
            total = total + record.get('AJUSTE');
        });
        me.txt_total.setValue(total);
    }
});

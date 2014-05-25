﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CityTruck.Model;

namespace CityTruck.WebSite.Models
{
    public class MovimientoProductoModel
    {
        public string PRODUCTO { get; set; }
        public string ANIO { get; set; }
        public string MES { get; set; }
        public string PROVEEDOR { get; set; }
        public string TELEFONO { get; set; }
        public string DIA { get; set; }
        public decimal SALDO_ANTERIOR { get; set; }
        public decimal NRO_FACTURA { get; set; }
        public decimal COMPRA { get; set; }
        public decimal VENTA { get; set; }
        public decimal SALDO_ACTUAL { get; set; }
        public decimal MANGUERA1 { get; set; }
        public decimal MANGUERA2 { get; set; }
        public decimal MANGUERA3 { get; set; }
        public decimal MANGUERA4 { get; set; }
        public decimal MANGUERA5 { get; set; }
        public decimal MANGUERA6 { get; set; }
        public DateTime FECHA { get; set; }


    }
    public class EstadoResultadoModel
    {
        public string MES { get; set; }
        public decimal UTILIDA_BRUTA_NETA { get; set; }
        public DateTime FECHA { get; set; }
        public string DETALLE { get; set; }
        public decimal TOTAL { get; set; }

    }
    public class UtilidadVentaBruta
    {
        public decimal ING_DIESEL_VALORADO { get; set; }
        public decimal ING_GASOLINA_VALORADO { get; set; }
        public decimal EGR_DIESEL_VALORADO { get; set; }
        public decimal EGR_GASOLINA_VALORADO { get; set; }
        public decimal EXC_DIESEL_VALORADO { get; set; }
        public decimal EXC_GASOLINA_VALORADO { get; set; }
        public decimal PER_DIESEL_VALORADO { get; set; }
        public decimal PER_GASOLINA_VALORADO { get; set; }

        public decimal ING_DIESEL_FISICO { get; set; }
        public decimal ING_GASOLINA_FISICO { get; set; }
        public decimal EGR_DIESEL_FISICO { get; set; }
        public decimal EGR_GASOLINA_FISICO { get; set; }
        public decimal EXC_DIESEL_FISICO { get; set; }
        public decimal EXC_GASOLINA_FISICO { get; set; }
        public decimal PER_DIESEL_FISICO { get; set; }
        public decimal PER_GASOLINA_FISICO { get; set; }

    }
    public class UtilidadVentaEstimada
    {
        public decimal ING_DIESEL_VALORADO { get; set; }
        public decimal ING_GASOLINA_VALORADO { get; set; }
        public decimal EGR_DIESEL_VALORADO { get; set; }
        public decimal EGR_GASOLINA_VALORADO { get; set; }
        public decimal EXC_DIESEL_VALORADO { get; set; }
        public decimal EXC_GASOLINA_VALORADO { get; set; }
        public decimal PER_DIESEL_VALORADO { get; set; }
        public decimal PER_GASOLINA_VALORADO { get; set; }
        public decimal TOTAL_INGRESO { get; set; }
        public decimal TOTAL_EGRESO { get; set; }
    }
    public class UtilidadBrutaReal
    {
        public decimal ING_INV_INI_VAL_GAS { get; set; }
        public decimal ING_VEN_TOT_VAL_GAS { get; set; }
        public decimal ING_INV_INI_VAL_DIE { get; set; }
        public decimal ING_VEN_TOT_VAL_DIE { get; set; }
        public decimal ING_INV_INI_FIS_GAS { get; set; }
        public decimal ING_VEN_TOT_FIS_GAS { get; set; }
        public decimal ING_INV_INI_FIS_DIE { get; set; }
        public decimal ING_VEN_TOT_FIS_DIE { get; set; }

        public decimal EGR_INV_INI_VAL_GAS { get; set; }
        public decimal EGR_VEN_TOT_VAL_GAS { get; set; }
        public decimal EGR_INV_INI_VAL_DIE { get; set; }
        public decimal EGR_VEN_TOT_VAL_DIE { get; set; }
        public decimal EGR_INV_INI_FIS_GAS { get; set; }
        public decimal EGR_VEN_TOT_FIS_GAS { get; set; }
        public decimal EGR_INV_INI_FIS_DIE { get; set; }
        public decimal EGR_VEN_TOT_FIS_DIE { get; set; }


        public decimal EXC_DIESEL_FISICO { get; set; }
        public decimal EXC_GASOLINA_FISICO { get; set; }
        public decimal PER_DIESEL_FISICO { get; set; }
        public decimal PER_GASOLINA_FISICO { get; set; }
        public decimal EXC_DIESEL_VALORADO { get; set; }
        public decimal EXC_GASOLINA_VALORADO { get; set; }
        public decimal PER_DIESEL_VALORADO { get; set; }
        public decimal PER_GASOLINA_VALORADO { get; set; }

    }
    public class IngresosEgresosModel
    {
        public string MES { get; set; }
        public string CAJA { get; set; }
        public DateTime FECHA { get; set; }
        public string DETALLE { get; set; }
        public decimal TOTAL { get; set; }
        public string TOTAL_LITERAL { get; set; }
        public string USUARIO { get; set; }
        public int NRO_COMPROBANTE { get; set; }

    }
    public class VentaDiaria
    {
        public string TIPO { get; set; }
        public string DETALLE { get; set; }
        public decimal PARCIAL { get; set; }
        public DateTime FECHA { get; set; }
        public string TURNO { get; set; }
        public string USUARIO { get; set; }


    }
    public class DetalleMangueraModel
    {
        public string MANGUERA { get; set; }
        public string COMBUSTIBLE { get; set; }
        public DateTime FECHA { get; set; }
        public string TURNO { get; set; }
        public string RESPONSABLE { get; set; }
        public string USUARIO { get; set; }
        public decimal ENT_LITTER { get; set; }
        public decimal SAL_LITTER { get; set; }

    }
    public class VentaCreditoConsumo
    {
        public string CLIENTE { get; set; }
        public decimal GASOLINA { get; set; }
        public decimal DIESEL { get; set; }
        


    }
    public class VentaCreditoConsumoTotal
    {
        public decimal TOTAL_VENTA_GAS { get; set; }
        public decimal TOTAL_VENTA_DIE { get; set; }
        public decimal CREDITO_DIE { get; set; }
        public decimal CREDITO_GAS { get; set; }
        public decimal CONSUMO_DIE { get; set; }
        public decimal CONSUMO_GAS { get; set; }
        public decimal TOTAL_LITROS_GAS { get; set; }
        public decimal TOTAL_LITROS_DIE { get; set; }
        public decimal PRECIO_VENTA_DIE { get; set; }
        public decimal PRECIO_VENTA_GAS { get; set; }
        public decimal PRECIO_COMPRA_DIE { get; set; }
        public decimal PRECIO_COMPRA_GAS { get; set; }



    }

}

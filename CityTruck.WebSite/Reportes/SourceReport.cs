﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CityTruck.Model;
using CityTruck.Services;
using CityTruck.Services.Interfaces;
using CityTruck.WebSite.Models;

namespace CityTruck.WebSite.Reportes
{
    public class SourceReport
    {
        public IEnumerable<SG_KARDEX_EFECTIVO> ReporteKardexEfectivo()
        {

            IEnumerable<SG_KARDEX_EFECTIVO> result = null;
            var servicio = new KardexEfectivoServices();
            result = servicio.ObtenerKardexEfectivo(x => x.ID_CAJA == 1);
            return result;
        }
        public IEnumerable<MovimientoProductoModel> ReporteSustanciasControladas(string ANIO = null, string MES = null,int ID_COMBUSTIBLE = 0)
        {
            List<MovimientoProductoModel> result = new List<MovimientoProductoModel>();
            MovimientoProductoModel mov = new MovimientoProductoModel()
            {
                ANIO = ANIO,
                SALDO_ACTUAL = 20090,
                SALDO_ANTERIOR=2323,
                COMPRA = 23,
                VENTA = 2323
            };
            result.Add(mov);
            MovimientoProductoModel mov1 = new MovimientoProductoModel()
            {
                ANIO = ANIO,
                SALDO_ACTUAL = 20090,
                SALDO_ANTERIOR = 2323,
                COMPRA = 23,
                VENTA = 2323
            };
            result.Add(mov1);
            return result;
        }
        public IEnumerable<EstadoResultadoModel> ReporteEstadoResultado(string ANIO = null, string MES = null) {
            List<EstadoResultadoModel> result = new List<EstadoResultadoModel>();
            var servicio = new IngresosServices();
            var egresos = servicio.ObtenerEgresosPaginado(null, ANIO, MES);

            foreach (var item in egresos.OrderBy(x=>x.FECHA))
            {
                EstadoResultadoModel egre = new EstadoResultadoModel()
                {
                     FECHA = item.FECHA,
                     DETALLE = item.CONCEPTO,
                     MES = MES,
                     TOTAL = item.IMPORTE,
                     UTILIDA_BRUTA_NETA = 10000
                };
                result.Add(egre);
            }
            return result;
        }
        public IEnumerable<UtilidadVentaBruta> ReporteUtilidadVentaBruta(string ANIO = null, string MES = null)
        {
            List<UtilidadVentaBruta> result = new List<UtilidadVentaBruta>();
            UtilidadVentaBruta result1 = new UtilidadVentaBruta()
            { 
                ING_DIESEL_VALORADO = 1284385.28m,
                ING_GASOLINA_VALORADO = 605709.08m,
                EGR_DIESEL_VALORADO = 1222237.60m,
                EGR_GASOLINA_VALORADO = 570079.14m,
                EXC_DIESEL_VALORADO = 3613.35m,
                EXC_GASOLINA_VALORADO = 0,
                PER_DIESEL_VALORADO  = 0,
                PER_GASOLINA_VALORADO = 0,
                ING_DIESEL_FISICO = 345264.86m,
                ING_GASOLINA_FISICO = 161954.30m,
                EGR_DIESEL_FISICO = 345264.86m,
                EGR_GASOLINA_FISICO  =161954.30m,   
                EXC_DIESEL_FISICO = 971.33m,
                EXC_GASOLINA_FISICO = 0,
                PER_DIESEL_FISICO = 0,
                PER_GASOLINA_FISICO = 0
               
            };
            result.Add(result1);
            return result;
        }
        public IEnumerable<UtilidadVentaEstimada> ReporteUtilidadVentaEstimada(string ANIO = null, string MES = null)
        {
            List<UtilidadVentaEstimada> result = new List<UtilidadVentaEstimada>();
            UtilidadVentaEstimada result1 = new UtilidadVentaEstimada()
            {
                ING_DIESEL_VALORADO = 47616.00m,
                ING_GASOLINA_VALORADO = 13104.96m,
                EGR_DIESEL_VALORADO = 0,
                EGR_GASOLINA_VALORADO =0,
                EXC_DIESEL_VALORADO = 0,
                EXC_GASOLINA_VALORADO = 0,
                PER_DIESEL_VALORADO = 0,
                PER_GASOLINA_VALORADO = 0,
                TOTAL_INGRESO = 16304,
                TOTAL_EGRESO = 0
            };
            result.Add(result1);
            return result;
        }
        public IEnumerable<UtilidadBrutaReal> ReporteUtilidadBrutaReal(string ANIO = null, string MES = null)
        {
            List<UtilidadBrutaReal> result = new List<UtilidadBrutaReal>();
            UtilidadBrutaReal result1 = new UtilidadBrutaReal()
            {
                ING_DIESEL_VALORADO = 1284385.28m,
                ING_GASOLINA_VALORADO = 605709.08m,
                EGR_DIESEL_VALORADO = 1222237.60m,
                EGR_GASOLINA_VALORADO = 570079.14m,
                EXC_DIESEL_VALORADO = 3613.35m,
                EXC_GASOLINA_VALORADO = 0,
                PER_DIESEL_VALORADO = 0,
                PER_GASOLINA_VALORADO = 0,
                ING_DIESEL_FISICO = 345264.86m,
                ING_GASOLINA_FISICO = 161954.30m,
                EGR_DIESEL_FISICO = 345264.86m,
                EGR_GASOLINA_FISICO = 161954.30m,
                EXC_DIESEL_FISICO = 971.33m,
                EXC_GASOLINA_FISICO = 0,
                PER_DIESEL_FISICO = 0,
                PER_GASOLINA_FISICO = 0

            };
            result.Add(result1);
            return result;
        }
    }
}
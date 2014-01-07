﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CityTruck.Services.Interfaces;
using CityTruck.Common;
using System.Web.Script.Serialization;
using System.Collections;
using CityTruck.WebSite.Models;
using CityTruck.Services.Model;

namespace CityTruck.WebSite.Controllers
{
    public class VentasController : Controller
    {
        private IVentasDiariasServices _serVen;
        private IPosTurnosServices _serPos;
        public VentasController(IVentasDiariasServices serVen,IPosTurnosServices serPos)
        {
            _serVen = serVen;
            _serPos = serPos;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerVentasDiarias(PagingInfo paginacion, string ANIO = null, string MES = null)
        {
            DateTime fecha = DateTime.Now;
            var mes = DateTime.Now.ToString("MMMMMMMMMMMMM");
            var result = _serVen.ObtenerVentasDiariasPaginado(paginacion, ANIO, MES).GroupBy(y => new { y.FECHA }).Select(z => new
            {
                FECHA = z.Key.FECHA,
                TOTAL = z.Sum(x => x.TOTAL)
            });
            List<VentasDiariasModel> listas = new List<VentasDiariasModel>();
            foreach (var item in result)
            {
                VentasDiariasModel venDia = new VentasDiariasModel
                {
                    FECHA = item.FECHA,
                    VENTA_TOTAL = item.TOTAL
                };
                var ventadiaria = _serVen.ObtenerVentasDiariasPorCriterio(x => x.FECHA == item.FECHA);
                foreach (var diario in ventadiaria)
                {
                    if (diario.TURNO == "DIA") {
                        venDia.VENTA_DIA = diario.TOTAL;
                        
                    }
                    else if (diario.TURNO == "TARDE")
                    {
                        venDia.VENTA_TARDE = diario.TOTAL;

                    }
                    else {
                        venDia.VENTA_NOCHE = diario.TOTAL;
                    }
                }
                listas.Add(venDia);

            }
            //var formattData = result.Select(x => new
            //{
            //    VENTA_TOTAL = x.TOTAL,
            //    VENTA_DIA = x.TOTAL - 100,
            //    VENTA_TARDE = x.TOTAL - 200,
            //    VENTA_NOCHE = x.TOTAL - 300,
            //    FECHA = x.FECHA
            //});
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = listas, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        [HttpGet]
        public ActionResult ObtenerPosTurnos(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros, PosTurnosModel posTurnos)
        {
            filtros.Entidad = posTurnos;
            var result = _serPos.ObtenerPosTurnos(paginacion, filtros);
            bool nuevo = false;
            if (paginacion.total == 0)
            {
                try
                {
                    var spPos = _serPos.SP_GenerarPosTurnos(posTurnos.FECHA, posTurnos.TURNO, Convert.ToInt32(User.Identity.Name.Split('-')[3]));
                    result = _serPos.ObtenerPosTurnos(paginacion, filtros);
                    nuevo = true;
                }
                catch (Exception)
                {
                    
                    throw;
                }
                
            }
            var formattData = result.Select(x => new
            {
                PRODUCTO = x.SG_POS.CODIGO+" - "+x.SG_POS.SG_COMBUSTIBLES.NOMBRE,
                ID_POS = x.ID_POS,
                ID_POS_TURNO = x.ID_POS_TURNO,
                ENT_LITTER = x.ENT_LITTER,
                SAL_LITTER = nuevo== true?x.ENT_LITTER : x.SAL_LITTER,
                TOTAL = x.ENT_LITTER - x.SAL_LITTER
            
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Total = paginacion.total, Rows = formattData }) + ");";
            //string callback1 = info.callback + "(" + json + ");";


            return JavaScript(callback1);

        }
    }
}

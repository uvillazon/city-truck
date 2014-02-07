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
using CityTruck.Model;

namespace CityTruck.WebSite.Controllers
{
    public class EgresosController : Controller
    {
        private IIngresosServices _serIng;
        public EgresosController(IIngresosServices serIng)
        {
            _serIng = serIng;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerEgresosPaginado(PagingInfo paginacion, string ANIO = null, string MES = null)
        {
            var cajas = _serIng.ObtenerEgresosPaginado(paginacion, ANIO, MES);
            var formatData = cajas.Select(x => new
            {
                ID_CAJA = x.ID_CAJA,
                IMPORTE = x.IMPORTE,
                ID_EGRESO = x.ID_EGRESO,
                REGISTRAR = x.REGISTRAR,
                NRO_COMP = x.NRO_COMP,
                LOGIN = x.ID_USUARIO,
                FECHA = x.FECHA,
                CONCEPTO = x.CONCEPTO,
                CAJA = x.SG_CAJAS.NOMBRE,
                SALDO = x.SG_CAJAS.SALDO,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarEgreso(SG_EGRESOS egr) {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serIng.SP_GrabarEgreso(egr,id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarEgreso(int ID_EGRESO)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serIng.SP_EliminarIngreso(ID_EGRESO, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

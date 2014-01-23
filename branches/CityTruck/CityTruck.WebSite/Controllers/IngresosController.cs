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
    public class IngresosController : Controller
    {
        private IIngresosServices _serIng;
        public IngresosController(IIngresosServices serIng)
        {
            _serIng = serIng;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerIngresosPaginado(PagingInfo paginacion)
        {
            var cajas = _serIng.ObtenerIngresosPaginado(paginacion);
            var formatData = cajas.Select(x => new
            {
                ID_CAJA = x.ID_CAJA,
                IMPORTE = x.IMPORTE,
                ID_INGRESO = x.ID_INGRESO,
                NRO_COMP = x.NRO_COMP,
                LOGIN = x.ID_USUARIO,
                FECHA = x.FECHA,
                CONCEPTO = x.CONCEPTO,
                CAJA = x.SG_CAJAS.NOMBRE,
                REGISTRAR = x.REGISTRAR,
                SALDO = x.SG_CAJAS.SALDO,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarIngreso(SG_INGRESOS ing) {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serIng.SP_GrabarIngreso(ing,id_usr);
            return Json(respuestaSP);
        }
    }
}

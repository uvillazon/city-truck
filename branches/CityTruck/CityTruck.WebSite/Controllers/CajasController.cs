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
    public class CajasController : Controller
    {
        private ICajasServices _serCaj;
        public CajasController(ICajasServices serCaj)
        {
            _serCaj = serCaj;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerCajasPaginado(PagingInfo paginacion)
        {
            var cajas = _serCaj.ObtenerCajasPaginado(paginacion);
            var formatData = cajas.Select(x => new
            {
                ID_CAJA = x.ID_CAJA,
                NOMBRE = x.NOMBRE,
                CODIGO = x.CODIGO,
                DESCRIPCION = x.DESCRIPCION,
                NRO_CUENTA = x.NRO_CUENTA,
                MONEDA = x.MONEDA,
                SALDO = x.SALDO,
                COMPRAS = x.SG_COMPRAS.Count(),
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCaja(SG_CAJAS caj)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCaj.SP_GrabarCaja(caj, id_usr);
            return Json(respuestaSP);
        }
    }
}

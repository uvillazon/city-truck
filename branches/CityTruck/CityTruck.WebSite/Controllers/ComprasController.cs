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
    public class ComprasController : Controller
    {
        private IComprasServices _serCmp;
        public ComprasController(IComprasServices serCmp)
        {
            _serCmp = serCmp;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerComprasPaginado(PagingInfo paginacion)
        {
            var compras = _serCmp.ObtenerComprasPaginado(paginacion,null,null);

            var formatData = compras.Select(x => new
            {
               FECHA = x.FECHA,
                CANTIDAD = x.CANTIDAD,
                IMPORTE = x.IMPORTE,
                FORMULARIO = x.FORMULARIO,
                TOTAL = x.TOTAL,
                PRECIO = x.PRECIO,
                NRO_COMP = x.NRO_COMP,
                NRO_FACTURA = x.NRO_FACTURA,
                ID_CAJA = x.ID_CAJA,
                ID_COMBUSTIBLE = x.ID_COMBUSTIBLE,
                TIPO = x.TIPO,
                USUARIO = x.ID_USUARIO,
                CUENTA = x.SG_CAJAS.DESCRIPCION,
                COMBUSTIBLE = x.SG_COMBUSTIBLES.DESCRIPCION,
            });

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCompra(SG_COMPRAS comp)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCmp.SP_GrabarCompra(comp, id_usr);
            return Json(respuestaSP);
        }
    }
}
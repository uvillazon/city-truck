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
    public class CombustiblesController : Controller
    {
        private ICombustiblesServices _serCom;
        public CombustiblesController(ICombustiblesServices serCom)
        {
            _serCom = serCom;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerCombustiblesPaginado(PagingInfo paginacion)
        {
            var cajas = _serCom.ObtenerCombustiblesPaginado(paginacion);
            var formattData = cajas.Select(x => new
            {
                ID_COMBUSTIBLE = x.ID_COMBUSTIBLE,
                NOMBRE = x.NOMBRE,
                DESCRIPCION = x.DESCRIPCION,
                CANT_DISPONIBLE = x.CANT_DISPONIBLE,
                PRECIO_VENTA = x.PRECIO_VENTA,
                PRECIO_COMPRA = x.PRECIO_COMPRA
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
    }
}

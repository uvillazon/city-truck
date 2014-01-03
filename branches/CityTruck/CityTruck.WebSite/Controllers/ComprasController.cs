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
    public class ComprasController : Controller
    {
        private IComprasServices _serCmp;
        public ComprasController(IComprasServices serCmp)
        {
            _serCmp = serCmp;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObteneComprasPaginado(PagingInfo paginacion)
        {
            var cajas = _serCmp.ObtenerComprasPaginado(paginacion,null,null);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = cajas, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
    }
}

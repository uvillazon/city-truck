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
    public class ClientesController : Controller
    {
        private IClientesServices _serCli;
        public ClientesController(IClientesServices serCli)
        {
            _serCli = serCli;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerClientesPaginado(PagingInfo paginacion)
        {
            var cajas = _serCli.ObtenerClientesPaginado(paginacion);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = cajas, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
    }
}

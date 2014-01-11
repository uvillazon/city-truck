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
        private IKardexClienteServices _serKar;

        public ClientesController(IClientesServices serCli, IKardexClienteServices serKar)
        {
            _serCli = serCli;
            _serKar = serKar;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerClientesPaginado(PagingInfo paginacion)
        {
            var clientes = _serCli.ObtenerClientesPaginado(paginacion);
            var formatData = clientes.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                CODIGO = x.CODIGO,
                EMPRESA = x.EMPRESA,
                SALDO = x.SALDO,
                CONSUMO = x.CONSUMO,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexClientePaginado(PagingInfo paginacion, FiltrosModel<KardexClienteModel> filtros, KardexClienteModel Kardex)
        {
            filtros.Entidad = Kardex;
            var kardexd = _serKar.ObtenerKardexCliente(paginacion, filtros);
            var formatData = kardexd.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                ID_KARDEX = x.ID_KARDEX,
                FECHA = x.FECHA,
                CONSUMO = x.CONSUMO,
                AMORTIZACION = x.AMORTIZACION,
                SALDO = x.SALDO,
                DETALLE = x.DETALLE,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
    }
}
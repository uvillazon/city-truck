﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using System.Linq.Expressions;

namespace CityTruck.Services.Interfaces
{
    public interface IVentasDiariasServices
    {
        IEnumerable<SG_VENTAS_DIARIAS> ObtenerVentasDiariasPaginado(PagingInfo paginacion ,string ANIO,string MES);
        IEnumerable<SG_VENTAS_DIARIAS> ObtenerVentasDiariasPorCriterio(Expression<Func<SG_VENTAS_DIARIAS, bool>> criterio);
        //SG_USUARIOS
    }
}

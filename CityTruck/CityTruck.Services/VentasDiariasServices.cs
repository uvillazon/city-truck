﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Services.Interfaces;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using CityTruck.Business.Interfaces;
using System.Linq.Dynamic;
using LinqKit;
using CityTruck.Business;

namespace CityTruck.Services
{
    public class VentasDiariasServices : BaseService, IVentasDiariasServices
    {
        //private ISG_LISTASManager _manListas;

        public VentasDiariasServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_VENTAS_DIARIAS> ObtenerVentasDiariasPaginado(PagingInfo paginacion, string ANIO , string MES)
        {
            IQueryable<SG_VENTAS_DIARIAS> result = null;
            ExecuteManager(uow =>
            {
                var managerVentas = new SG_VENTAS_DIARIASManager(uow);
                result = managerVentas.ObtenerVentasPorMesyAnio(ANIO,MES);

                paginacion.total = result.Count();
                result = managerVentas.QueryPaged(result,paginacion.limit,paginacion.start,paginacion.sort,paginacion.dir);
                
                //var manager = new SG_LISTASManager(uow);
                //result = manager.QueryPaged(manager.Query(), paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                //resultado.Rows = result.ToList();
                //resultado.Total = manager.Query().Count();
                //resultado.success = true;

            });
            return result;
        }


        public IEnumerable<SG_VENTAS_DIARIAS> ObtenerVentasDiariasPorCriterio(System.Linq.Expressions.Expression<Func<SG_VENTAS_DIARIAS, bool>> criterio)
        {
            IQueryable<SG_VENTAS_DIARIAS> result = null;
            ExecuteManager(uow =>
            {
                var managerVentas = new SG_VENTAS_DIARIASManager(uow);
                result = managerVentas.BuscarTodos(criterio);

            });
            return result;
        }
    }
}

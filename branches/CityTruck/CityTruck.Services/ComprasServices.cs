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
    public class ComprasServices : BaseService, IComprasServices
    {
        //private ISG_LISTASManager _manListas;

        public ComprasServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }

        public IEnumerable<SG_COMPRAS> ObtenerComprasPaginado(PagingInfo paginacion, string ANIO, string MES)
        {
            IQueryable<SG_COMPRAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_COMPRASManager(uow);
                result = manager.BuscarTodos();
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

             

            });
            return result;
        }

        public IEnumerable<SG_COMPRAS> ObtenerComprasPorCriterio(System.Linq.Expressions.Expression<Func<SG_COMPRAS, bool>> criterio)
        {
            IQueryable<SG_COMPRAS> result = null;
            ExecuteManager(uow =>
            {
                var managerVentas = new SG_COMPRASManager(uow);
                result = managerVentas.BuscarTodos(criterio);

            });
            return result;
        }
    }
}

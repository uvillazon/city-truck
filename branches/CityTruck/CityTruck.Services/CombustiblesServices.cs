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
    public class CombustiblesServices : BaseService, ICombustiblesServices
    {
        //private ISG_LISTASManager _manListas;

        public CombustiblesServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }

        public IEnumerable<SG_COMBUSTIBLES> ObtenerCombustiblesPaginado(PagingInfo paginacion)
        {
            IQueryable<SG_COMBUSTIBLES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_COMBUSTIBLESManager(uow);
                result = manager.BuscarTodos();

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
    }
}

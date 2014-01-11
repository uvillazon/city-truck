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
using System.Data.Objects;

namespace CityTruck.Services
{
    public class KardexClienteServices : BaseService, IKardexClienteServices
    {
        //private ISG_LISTASManager _manListas;

        public KardexClienteServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        
        public IEnumerable<SG_KARDEX_CLIENTE> ObtenerKardexCliente(PagingInfo paginacion, FiltrosModel<KardexClienteModel> filtros)
        {
            IQueryable<SG_KARDEX_CLIENTE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_KARDEX_CLIENTEManager(uow);
                //obtener todos los registros
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
    }
}

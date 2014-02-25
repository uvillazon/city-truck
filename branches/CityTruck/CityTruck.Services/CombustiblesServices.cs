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


        public CombustiblesModel ObtenerCombustible(System.Linq.Expressions.Expression<Func<SG_COMBUSTIBLES, bool>> criterio = null)
        {
            CombustiblesModel result = new CombustiblesModel();
            ExecuteManager(uow =>
            {
                var manager = new SG_COMBUSTIBLESManager(uow);
                var result1 = manager.BuscarTodos(criterio).FirstOrDefault();
                result.ID_COMBUSTIBLE = result1.ID_COMBUSTIBLE;
                result.COMBUSTIBLE = result1.NOMBRE;
                result.PRECIO_COMPRA = result1.PRECIO_COMPRA;
                result.PRECIO_VENTA = result1.PRECIO_VENTA;
            });
            return result;
        }



        public IEnumerable<SG_AJUSTES_TANQUE> ObtenerAjustesPorAnioYMes(string ANIO, string MES)
        {
            IQueryable<SG_AJUSTES_TANQUE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_AJUSTES_TANQUEManager(uow);
                result = manager.ObtenerAjustesPorMesyAnio(ANIO, MES);
            });
            return result;
        }


        public IEnumerable<SG_AJUSTES_TANQUE> ObtenerAjustesPaginados(PagingInfo paginacion, System.Linq.Expressions.Expression<Func<SG_AJUSTES_TANQUE, bool>> criterio = null)
        {
            IQueryable<SG_AJUSTES_TANQUE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_AJUSTES_TANQUEManager(uow);
                result = manager.BuscarTodos(criterio);
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            });
            return result;
        }
    }
}

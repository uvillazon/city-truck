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


        public RespuestaSP SP_GrabarCompra(SG_COMPRAS comp, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                //var manager = new SG_INGRESOSManager(uow);
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_COMPRAS(comp.ID_COMPRA, comp.FECHA, comp.ID_COMBUSTIBLE, comp.ID_CAJA, comp.CANTIDAD,
                    comp.NRO_FACTURA, comp.TIPO, comp.PRECIO, comp.IMPORTE, comp.FORMULARIO, comp.TOTAL, ID_USR, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });
            return result;
        }
    }
}
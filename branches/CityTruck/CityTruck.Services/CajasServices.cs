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
    public class CajasServices : BaseService, ICajasServices
    {
        //private ISG_LISTASManager _manListas;

        public CajasServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_CAJAS> ObtenerCajasPaginado(PagingInfo paginacion)
        {
            IQueryable<SG_CAJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CAJASManager(uow);
                result = manager.BuscarTodos();

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GrabarCaja(SG_CAJAS caja, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_CAJAS(caja.ID_CAJA, caja.NOMBRE, caja.NRO_CUENTA, caja.MONEDA, caja.DESCRIPCION, caja.SALDO, ID_USR, p_res);
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

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
    public class AjustePosServices : BaseService, IAjustePosServices
    {
        //private ISG_LISTASManager _manListas;

        public AjustePosServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_AJUSTE_POS> ObtenerAjustePos(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros)
        {
            IQueryable<SG_AJUSTE_POS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_AJUSTE_POSManager(uow);
                result = manager.BuscarTodos();
                //result = manager.BuscarTodos(x=>x.FECHA == filtros.Entidad.FECHA);
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GenerarAjustePos(DateTime? FECHA, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GENERAR_AJUSTE_POS(FECHA, ID_USR, p_res);
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


        public RespuestaSP SP_GuardarAjustePos(SG_AJUSTE_POS ajuste, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_AJUSTE_POS(ajuste.ID_AJUSTE,ajuste.ID_POS,ajuste.FECHA,ajuste.AJUSTE, ID_USR, p_res);
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


        public IEnumerable<SG_AJUSTE_POS> ObtenerAjustePosPorFecha(string ANIO, string MES)
        {
            IQueryable<SG_AJUSTE_POS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_AJUSTE_POSManager(uow);
                result = manager.ObtenerAjustePorMesyAnio(ANIO, MES);

            });
            return result;
        }
    }
}

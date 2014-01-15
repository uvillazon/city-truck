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
    public class ClientesServices : BaseService, IClientesServices
    {
        //private ISG_LISTASManager _manListas;

        public ClientesServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
       

        public IEnumerable<SG_CLIENTES> ObtenerClientesPaginado(PagingInfo paginacion)
        {
            IQueryable<SG_CLIENTES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CLIENTESManager(uow);
                result = manager.BuscarTodos();

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GrabarCliente(SG_CLIENTES cli, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_CLIENTES(cli.ID_CLIENTE, cli.EMPRESA, cli.NIT, cli.CONTACTO, cli.TELEFONO, cli.DIRECCION, cli.LIMITE, ID_USR, p_res);
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


        public RespuestaSP SP_GrabarAmortizacion(SG_AMORTIZACIONES a, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_AMORTIZACION(a.ID_AMORTIZACION, a.ID_CLIENTE, a.ID_CAJA, a.FECHA, a.CONCEPTO, a.IMPORTE_BS, ID_USR, p_res);
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

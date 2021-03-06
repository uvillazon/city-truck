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
using System.Linq.Expressions;

namespace CityTruck.Services
{
    public class UsuariosServices : BaseService, IUsuariosServices
    {
        //private ISG_LISTASManager _manListas;

        public UsuariosServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }


        public IEnumerable<SG_USUARIOS> ObtenerUsuariosPorCriterio(Expression<Func<SG_USUARIOS, bool>> criterio)
        {
            IQueryable<SG_USUARIOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_USUARIOSManager(uow);
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }
    }
}

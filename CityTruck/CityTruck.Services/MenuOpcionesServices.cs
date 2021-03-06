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
    public class MenuOpcionesServices : BaseService, IMenuOpcionesServices
    {
        //private ISG_LISTASManager _manListas;

        public MenuOpcionesServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_MENU_OPCIONES> ObtenerMenuOpciones(Expression<Func<SG_MENU_OPCIONES, bool>> criterio)
        {
            IQueryable<SG_MENU_OPCIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_MENU_OPCIONESManager(uow);
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }
    }
}

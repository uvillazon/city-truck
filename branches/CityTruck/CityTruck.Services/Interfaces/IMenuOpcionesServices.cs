﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using System.Linq.Expressions;

namespace CityTruck.Services.Interfaces
{
    public interface IMenuOpcionesServices
    {
        IEnumerable<SG_MENU_OPCIONES> ObtenerMenuOpciones(Expression<Func<SG_MENU_OPCIONES, bool>> criterio);
    }
}

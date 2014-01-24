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
    public interface ICombustiblesServices
    {
        IEnumerable<SG_COMBUSTIBLES> ObtenerCombustiblesPaginado(PagingInfo paginacion);
        CombustiblesModel ObtenerCombustible(Expression<Func<SG_COMBUSTIBLES, bool>> criterio = null);

        //RespuestaSP SP_GrabarIngreso(SG_CAJAS caja);

    }
}

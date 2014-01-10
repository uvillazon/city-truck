﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface IKardexEfectivoServices
    {
        IEnumerable<SG_KARDEX_EFECTIVO> ObtenerKardexEfectivo(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros);
      

    }
}

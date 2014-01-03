﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface IIngresosServices
    {
        IEnumerable<SG_INGRESOS> ObtenerIngresosPaginado(PagingInfo paginacion);
        RespuestaSP SP_GrabarIngreso(SG_CAJAS caja);

    }
}

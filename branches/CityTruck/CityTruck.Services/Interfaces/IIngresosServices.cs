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
        RespuestaSP SP_GrabarIngreso(SG_INGRESOS ing,int ID_USR);

        IEnumerable<SG_EGRESOS> ObtenerEgresosPaginado(PagingInfo paginacion);
        RespuestaSP SP_GrabarEgreso(SG_EGRESOS egr, int ID_USR);


    }
}
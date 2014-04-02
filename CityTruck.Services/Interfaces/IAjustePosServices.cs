﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface IAjustePosServices
    {
        IEnumerable<SG_AJUSTE_POS> ObtenerAjustePos(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros);
        IEnumerable<SG_AJUSTE_POS> ObtenerAjustePosPorFecha(string ANIO, string MES);

        RespuestaSP SP_GenerarAjustePos(DateTime? FECHA,int ID_USR);
        RespuestaSP SP_GuardarAjustePos(SG_AJUSTE_POS ajuste, int ID_USR);
     
    }
}

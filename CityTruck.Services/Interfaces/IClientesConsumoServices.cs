﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface IClientesConsumoServices
    {
        IEnumerable<SG_CLIENTES_CONSUMO> ObtenerClientesPaginado(PagingInfo paginacion);
        RespuestaSP SP_GrabarCliente(SG_CLIENTES_CONSUMO cli, int ID_USR);
        RespuestaSP SP_EliminarCliente(int ID_CLIENTE, int ID_USR);

    }
}

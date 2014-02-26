﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Common.Data;
using CityTruck.Model;
using CityTruck.Common.Data.Interfaces;
using System.Data.Objects;

namespace CityTruck.Business
{
    public class SG_KARDEX_COMBUSTIBLEManager : Repository<SG_KARDEX_COMBUSTIBLE>
    {


        public SG_KARDEX_COMBUSTIBLEManager(IUnitOfWork uow) : base(uow) { }

        public IQueryable<SG_KARDEX_COMBUSTIBLE> ObtenerKardexPorMesyAnio(string ANIO, string MES)
        {
            var context = (CityTruckContext)Context;
            int anio = Convert.ToInt32(ANIO);
            int mes = Convert.ToInt32(MES);

            var query = context.SG_KARDEX_COMBUSTIBLE.Where(x => x.FECHA.Year == anio && x.FECHA.Month == mes);
            //var query = context.SG_CAJAS.Where(x => x.FECHA_REG.Valu);
            return query;
        }


        
    }
}

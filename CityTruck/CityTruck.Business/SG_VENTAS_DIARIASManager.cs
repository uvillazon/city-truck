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
    public class SG_VENTAS_DIARIASManager : Repository<SG_VENTAS_DIARIAS>
    {


        public SG_VENTAS_DIARIASManager(IUnitOfWork uow) : base(uow) { }

        public IQueryable<SG_VENTAS_DIARIAS> ObtenerVentasPorMesyAnio(string ANIO, string MES){
            var context = (CityTruckContext)Context;
            var query = context.SG_VENTAS_DIARIAS.Where(x => x.FECHA.Month == 10 && x.FECHA.Year == 2013);
            //var query = from c in context.sg
            //            join r in _dbContext.MN_OT_POSTES_INTERV on c.ID_POSTE equals r.ID_POSTE
            //            where r.ID_OT == ID_OT
            //            select c;
            
            return query;
        }
        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockBusinessLogic.Models
{
    public class FetchStockHistoryViewModel
    {
        public List<long> t { get; set; }
        public List<double> c { get; set; }
        public List<double> h { get; set; }
        public List<double> l { get; set; }
        public List<double> o { get; set; }
        public List<double> v { get; set; }
        public string s { get; set; }

    }
}

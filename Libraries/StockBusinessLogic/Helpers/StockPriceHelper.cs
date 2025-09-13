using StockBusinessLogic.IHelpers;
using StockBusinessLogic.Models;
using StockDataAccess;
using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockBusinessLogic.Helpers
{
    public class StockPriceHelper : IStockPriceHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public StockPriceHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> FetchData(string symbol)
        {
            symbol = symbol.Trim().ToUpper();
            var company = await _unitOfWork.CompanyRepository.GetCompanyBySymbolAsync(symbol);

            if (company == null)
                return false;

            var lastPrice =  await _unitOfWork.StockPriceRepository.GetLastPriceAsync(company.Id);
            if( lastPrice != null && lastPrice.Date >= new DateTimeOffset(company.IPODate).ToUnixTimeSeconds())
                return false;

            long fromUnixTime = new DateTimeOffset(company.IPODate).ToUnixTimeSeconds();
            long toUnixTime = new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds();

            var stock = await _unitOfWork.StockPriceRepository.GetAllAsync(filter: s => s.Date >= fromUnixTime * 1000 && s.CompanyId == company.Id);
            if (stock.Count() > 0)
                return false;

            FetchDataAPI fetchData = new FetchDataAPI();
            var data = await fetchData.FetchData(company.Symbol, fromUnixTime.ToString(), toUnixTime.ToString());
            if (data == null)
                return false;
            int length = data.t.Count;
            for (int i = 0; i < length; i++)
            {
                StockPriceDTO stockHistoryDTO = new StockPriceDTO
                {
                    CompanyId = company.Id,
                    Close = data.c[i],
                    High = data.h[i],
                    Low = data.l[i],
                    Open = data.o[i],
                    Date = data.t[i] * 1000,
                    Volume = data.v[i]
                };
                _unitOfWork.StockPriceRepository.Create(stockHistoryDTO);
            }
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
        public async Task<IEnumerable<StockPriceDTO>> GetAllAsync(string symbol)
        {
            symbol = symbol.Trim().ToUpper();
            var company = await _unitOfWork.CompanyRepository.GetCompanyBySymbolAsync(symbol);
            if (company == null)
                return null;
            return await _unitOfWork.StockPriceRepository.GetAllAsync(filter: s => s.CompanyId == company.Id);
        }
    }

}

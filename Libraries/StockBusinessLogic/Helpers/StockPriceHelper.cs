using Microsoft.EntityFrameworkCore;
using StockBusinessLogic.IHelpers;
using StockDataAccess;
using StockDataAccess.DTOs;
using System.Data;

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


            long fromUnixTime = new DateTimeOffset(company.IPODate).ToUnixTimeSeconds();
            long toUnixTime = new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds();
            var lastPrice = await _unitOfWork.StockPriceRepository.GetLastPriceAsync(company.Id);
            if (lastPrice != null)
            {
                //convert datetimeoffset to datetime
                DateTime lastDate = DateTimeOffset.FromUnixTimeMilliseconds(lastPrice.Date).DateTime;

                fromUnixTime = new DateTimeOffset(lastDate.AddDays(1)).ToUnixTimeSeconds();
            }

            var numberOfDays = await _unitOfWork.StockPriceRepository.Query(filter: s => s.Date >= fromUnixTime * 1000 && s.CompanyId == company.Id).CountAsync();
            if (numberOfDays > 0)
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
        public async Task<IEnumerable<StockPriceDTO>?> GetAllAsync(string symbol)
        {
            symbol = symbol.Trim().ToUpper();
            var company = await _unitOfWork.CompanyRepository.GetCompanyBySymbolAsync(symbol);
            if (company == null)
                return null;
            DateTime currentDate = DateTime.Now;
            long fromUnixTime = new DateTimeOffset(currentDate.AddYears(-1)).ToUnixTimeSeconds() * 1000;

            return await _unitOfWork.StockPriceRepository.Query(filter: s => s.CompanyId == company.Id && s.Date >= fromUnixTime).AsNoTracking().ToListAsync();
        }
    }

}

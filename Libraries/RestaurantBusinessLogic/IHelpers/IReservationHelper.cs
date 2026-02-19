using Restaurant.BLL.Models;
using Restaurant.DAL.DTOs;
using System.Share.Models;

namespace Restaurant.BLL.IHelpers
{
    public interface IReservationHelper
    {
        //public Task<Pagination<ReservationDTO>> GetAllAsync(int pageIndex, int pageSize);
        //public Task<Pagination<ReservationDTO>> GetAllDeletedAsync(int pageIndex, int pageSize);
        public Task<ReservationDTO?> GetByIdAsync(int id);
        public Task<bool> CreateAsync(ReservationDTO model, string? userName = null);
        public string Booking(ReservationDTO model);
        public Task<bool> CheckInAsync(CheckInModel model, string? userName = null);
        public Task<bool> CheckOutAsync(int Id, string? userName = null);
        public Task<bool> CancelAsync(ReservationDTO model, string? userName = null);
        //public Task<bool> UpdateAsync(ReservationDTO model, string? userName = null);
        //public Task<bool> SoftDeleteAsync(int id, string? userName = null);
        //public Task<bool> RestoreAsync(int id, string? userName = null);
        //public Task<bool> DeleteAsync(int id);
        public Task<Pagination<ReservationDTO>> GetByFilterAsync(ReservationFilterModel model);
    }
}

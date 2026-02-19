using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Restaurant.BLL.IHelpers;
using Restaurant.BLL.Models;
using Restaurant.DAL;
using Restaurant.DAL.DTOs;
using System.Share.Models;

namespace Restaurant.BLL.Helpers
{
    public class ReservationHelper : IReservationHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<BookingHub> _bookingHub;
        public ReservationHelper(IUnitOfWork unitOfWork, IHubContext<BookingHub> bookingHub)
        {
            _unitOfWork = unitOfWork;
            _bookingHub = bookingHub;
        }

        //public async Task<Pagination<ReservationDTO>> GetAllAsync(int pageIndex, int pageSize)
        //{
        //    var allItems = await _unitOfWork.ReservationRepository.GetAllAsync();
        //    int totalItems = allItems.Count();
        //    int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //    if (pageIndex > totalPages)
        //        pageIndex = totalPages > 0 ? totalPages : 1;
        //    var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        //    return new Pagination<ReservationDTO>
        //    {
        //        PageIndex = pageIndex,
        //        PageSize = pageSize,
        //        CurrentPage = pageIndex,
        //        TotalItems = totalItems,
        //        TotalPages = totalPages,
        //        Items = items
        //    };
        //}
        public async Task<Pagination<ReservationDTO>> GetByFilterAsync(ReservationFilterModel model)
        {
            var allItems = _unitOfWork.ReservationRepository.Query(x => !x.IsCancelled, orderBy: p => p.OrderByDescending(s => s.CreatedAt));
            if (model.TableId > 0)
            {
                allItems = allItems.Where(x => x.TableId == model.TableId);
            }
            if (!string.IsNullOrEmpty(model.SearchText))
            {
                allItems = allItems.Where(x => x.FullName.Contains(model.SearchText.Trim()));
                allItems = allItems.Where(x => x.PhoneNumber.Contains(model.SearchText.Trim()));
            }
            if (model.StatusId > 0)
            {
                switch (model.StatusId)
                {
                    case 1: // new
                        allItems = allItems.Where(x => !x.HasCheckedOut && !x.HasCheckedIn);
                        break;
                    case 2: // CheckIn
                        allItems = allItems.Where(x => x.HasCheckedIn);
                        break;
                    case 3: // checkOut
                        allItems = allItems.Where(x => x.HasCheckedOut && x.HasCheckedIn);
                        break;
                }
            }
            int totalItems = await allItems.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)model.PageSize);
            if (model.PageIndex > totalPages)
                model.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = await allItems.Skip((model.PageIndex - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
            return new Pagination<ReservationDTO>
            {
                PageIndex = model.PageIndex,
                PageSize = model.PageSize,
                CurrentPage = model.PageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
        }

        //public async Task<Pagination<ReservationDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        //{
        //    var allItems = await _unitOfWork.ReservationRepository.GetAllAsync();
        //    int totalItems = allItems.Count();
        //    int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        //    if (pageIndex > totalPages)
        //        pageIndex = totalPages > 0 ? totalPages : 1;
        //    var items = allItems.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        //    return new Pagination<ReservationDTO>
        //    {
        //        PageIndex = pageIndex,
        //        PageSize = pageSize,
        //        CurrentPage = pageIndex,
        //        TotalItems = totalItems,
        //        TotalPages = totalPages,
        //        Items = items
        //    };
        //}

        public async Task<ReservationDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.ReservationRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(ReservationDTO model, string? userName = null)
        {
            try
            {
                model.Create(userName);
                model.FullName = model.FullName.Trim();
                model.PhoneNumber = model.PhoneNumber.Trim();
                model.Note = model.Note?.Trim();
                await _unitOfWork.ReservationRepository.CreateAsync(model);
                await _unitOfWork.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public string Booking(ReservationDTO model)
        {
            DateTime today = DateTime.Today;
            int count = _unitOfWork.ReservationRepository.Query(x => x.CreatedAt > today).Count();

            model.Create("ClientSite");
            count++;
            model.Code = count.ToString("D4");
            model.FullName = model.FullName.Trim();
            model.PhoneNumber = model.PhoneNumber.Trim();
            model.Note = model.Note?.Trim();
            _unitOfWork.ReservationRepository.Create(model);
            _unitOfWork.SaveChanges();
            _bookingHub.Clients.All.SendAsync("GuestArrived");
            return model.Code;
        }


        public async Task<bool> CheckInAsync(CheckInModel model, string? userName = null)
        {
            var data = await _unitOfWork.ReservationRepository.GetByIdAsync(model.Id);
            if (data == null) return false;
            data.Update(userName);
            data.HasCheckedIn = true;
            data.TableId = model.TableId;
            await _unitOfWork.SaveChangesAsync();
            var table = await _unitOfWork.TableRepository.GetByIdAsync(model.TableId);
            string jsonData = JsonConvert.SerializeObject(new
            {
                useCode = data.Code,
                fullName = data.FullName,
                table = table?.NameVN
            });
            await _bookingHub.Clients.All.SendAsync("ReceiveMessage", jsonData);
            return true;
        }

        public async Task<bool> CheckOutAsync(int Id, string? userName = null)
        {
            var data = await _unitOfWork.ReservationRepository.GetByIdAsync(Id);
            if (data == null) return false;
            data.Update(userName);
            data.HasCheckedOut = true;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CancelAsync(ReservationDTO model, string? userName = null)
        {
            var data = await _unitOfWork.ReservationRepository.GetByIdAsync(model.Id);
            if (data == null) return false;
            data.Update(userName);
            data.IsCancelled = true;
            data.CancellationReason = model.CancellationReason;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        //public async Task<bool> UpdateAsync(ReservationDTO model, string? userName = null)
        //{
        //    try
        //    {
        //        var data = await _unitOfWork.ReservationRepository.GetByIdAsync(model.Id);
        //        if (data == null) return false;
        //        data.Update(userName);
        //        data.FullName = model.FullName.Trim();
        //        data.PhoneNumber = model.PhoneNumber?.Trim();
        //        data.Note = model.Note?.Trim();
        //        data.NumberOfGuests = model.NumberOfGuests;
        //        //data.ReservationDate = model.ReservationDate;
        //        data.TableId = model.TableId;
        //        //data.IsConfirmed = model.IsConfirmed;
        //        data.HasCheckedOut = model.HasCheckedOut;
        //        await _unitOfWork.SaveChangesAsync();
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}

        //public async Task<bool> SoftDeleteAsync(int id, string? userName = null)
        //{
        //    var entity = await _unitOfWork.ReservationRepository.GetByIdAsync(id);
        //    if (entity == null) return false;
        //    //entity.SoftDelete(userName);
        //    await _unitOfWork.SaveChangesAsync();
        //    return true;
        //}

        //public async Task<bool> RestoreAsync(int id, string? userName = null)
        //{
        //    var entity = await _unitOfWork.ReservationRepository.GetByIdAsync(id);
        //    if (entity == null) return false;
        //    //entity.Restore(userName);
        //    await _unitOfWork.SaveChangesAsync();
        //    return true;
        //}

        //public async Task<bool> DeleteAsync(int id)
        //{
        //    try
        //    {
        //        bool deleteResult = await _unitOfWork.ReservationRepository.DeleteAsync(id);
        //        if (deleteResult)
        //        {
        //            await _unitOfWork.SaveChangesAsync();
        //        }
        //        return deleteResult;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
    }
}
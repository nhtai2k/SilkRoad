using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.DTOs;
using Restaurant.DAL.IRepositories;

namespace Restaurant.DAL.Repositories
{
    public class ReservationRepository : GenericRepository<ReservationDTO>, IReservationRepository
    {
        private DbSet<ReservationDTO> _reservations;

        public ReservationRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _reservations = dbContext.Set<ReservationDTO>();
        }
    }
}

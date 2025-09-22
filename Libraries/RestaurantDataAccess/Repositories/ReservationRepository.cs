using Microsoft.EntityFrameworkCore;
using RestaurantDataAccess.DTOs;
using RestaurantDataAccess.IRepositories;

namespace RestaurantDataAccess.Repositories
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

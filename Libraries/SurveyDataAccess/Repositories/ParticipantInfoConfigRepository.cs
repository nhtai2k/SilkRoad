using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class ParticipantInfoConfigRepository : GenericRepository<ParticipantInfoConfigDTO>, IParticipantInfoConfigRepository
    {
        public ParticipantInfoConfigRepository(ApplicationContext context) : base(context)
        {
        }
    }
}

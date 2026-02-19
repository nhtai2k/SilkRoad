using Survey.DAL.DTOs;
using Survey.DAL.IRepositories;

namespace Survey.DAL.Repositories
{
    public class ParticipantInfoRepository : GenericRepository<ParticipantInfoDTO>, IParticipantInfoRepository
    {
        public ParticipantInfoRepository(ApplicationContext context) : base(context)
        {
        }

    }
}

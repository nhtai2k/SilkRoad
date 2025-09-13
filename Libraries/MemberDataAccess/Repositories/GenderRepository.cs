using MemberDataAccess.DTOs;
using MemberDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberDataAccess.Repositories
{
    public class GenderRepository : GenericRepository<GenderDTO>, IGenderRepository
    {
        public GenderRepository(ApplicationContext context) : base(context)
        {
        }
    }
}

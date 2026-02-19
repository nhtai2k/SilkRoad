using PersonalFinance.DAL.DTOs;
using PersonalFinance.DAL.IRepositories;

namespace PersonalFinance.DAL.Repositories
{
    public class ExpenseRepository : GenericRepository<ExpenseDTO>, IExpenseRepository
    {
        public ExpenseRepository(ApplicationContext context) : base(context)
        {
        }
    }
}

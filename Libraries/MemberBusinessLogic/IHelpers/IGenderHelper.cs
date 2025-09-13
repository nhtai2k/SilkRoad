using Common.ViewModels.LipstickClientViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberBusinessLogic.IHelpers
{
    public interface IGenderHelper
    {
        public IEnumerable<GenderClientViewModel> GetAll(string language);
    }
}

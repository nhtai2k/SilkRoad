using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.Models
{
    public class ParticipantFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int SurveyFormId { get; set; }
        public string? SearchText { get; set; }
    }
}

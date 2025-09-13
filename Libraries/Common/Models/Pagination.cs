using Common.ViewModels.LipstickViewModels;

namespace Common.Models
{
    public class Pagination<T> : PageInformation where T : class
    {
        public IEnumerable<T> Items { get; set; }
        public Pagination()
        {
            Items = new List<T>();
        }

        public static implicit operator Pagination<T>(Pagination<PageIntroViewModel> v)
        {
            throw new NotImplementedException();
        }
    }
}

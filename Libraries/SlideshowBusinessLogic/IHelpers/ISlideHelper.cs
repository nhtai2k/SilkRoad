using System.Share.ViewModels.SlideshowViewModels;

namespace Slideshow.BLL.IHelpers
{
    public interface ISlideHelper : IBaseAsyncHelper<SlideViewModel>
    {
        public Task<IEnumerable<SlideViewModel>> GetSlidesByThemeIdAsync(int slideThemeId);
    }
}

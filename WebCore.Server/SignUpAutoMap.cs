using AutoMapper;
using Lipstick.DAL.DTOs;
using LipstickDataAccess.MemberContext;
using System.DAL.DTOs;
using System.Share.ViewModels.LipstickViewModels;
using System.Share.ViewModels.SystemViewModels;

namespace WebCore.Server
{
    public class SignUpAutoMap : Profile
    {
        public SignUpAutoMap()
        {
            #region Lipstick
            //Lipstick
            CreateMap<CategoryDTO, CategoryViewModel>().ReverseMap();
            CreateMap<BrandDTO, BrandViewModel>().ReverseMap();
            //CreateMap<UnitDTO, UnitViewModel>().ReverseMap();
            CreateMap<TopicDTO, TopicViewModel>().ReverseMap();
            CreateMap<SubCategoryDTO, SubCategoryViewModel>().ReverseMap();
            CreateMap<ProductDTO, ProductViewModel>().ReverseMap();
            CreateMap<PageContentDTO, PageContentViewModel>().ReverseMap();
            CreateMap<HomeBannerDTO, HomeBannerViewModel>().ReverseMap();
            CreateMap<BlogDTO, BlogViewModel>().ReverseMap();
            CreateMap<PageTypeViewModel, PageTypeViewModel>().ReverseMap();
            CreateMap<SizeDTO, SizeViewModel>().ReverseMap();
            CreateMap<ColorDTO, ColorViewModel>().ReverseMap();
            CreateMap<PageTypeDTO, PageTypeViewModel>().ReverseMap();
            CreateMap<TableUser, MemberViewModel>();
            CreateMap<PageIntroDTO, PageIntroViewModel>().ReverseMap();
            CreateMap<OrderDTO, OrderViewModel>().ReverseMap();
            CreateMap<OrderDetailDTO, OrderDetailViewModel>().ReverseMap();
            CreateMap<PaymentDTO, PaymentViewModel>().ReverseMap();
            #endregion
            #region System
            CreateMap<RoleDTO, RoleViewModel>().ReverseMap();
            CreateMap<UserDTO, UserViewModel>().ReverseMap();
            CreateMap<ModuleDTO, ModuleViewModel>().ReverseMap();
            CreateMap<ControllerDTO, ControllerViewModel>().ReverseMap();
            CreateMap<ControllerActionDTO, ControllerActionViewModel>().ReverseMap();
            CreateMap<ActionDTO, ActionViewModel>().ReverseMap();
            #endregion
        }
    }
}

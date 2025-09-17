using AutoMapper;
using Common.ViewModels.LipstickViewModels;
using Common.ViewModels.SystemViewModels;
using DataAccess.DTOs;
using LipstickDataAccess.DTOs;
using LipstickDataAccess.MemberContext;

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
            #region Survey
            //CreateMap<SurveyFormDTO, SurveyFormViewModel>().ReverseMap();
            //CreateMap<QuestionGroupLibraryDTO, QuestionGroupViewModel>().ReverseMap();
            //CreateMap<QuestionLibraryDTO, QuestionViewModel>().ReverseMap();
            //CreateMap<PredefinedAnswerLibraryDTO, PredefinedAnswerViewModel>().ReverseMap();
            //CreateMap<ParticipantDTO, ParticipantViewModel>().ReverseMap();
            //CreateMap<SurveyFormDTO, SurveyFormViewModel>().ReverseMap();
            //CreateMap<QuestionTypeDTO, QuestionTypeViewModel>().ReverseMap();
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

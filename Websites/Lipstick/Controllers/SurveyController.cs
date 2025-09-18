//using System.Threading.Tasks;
//using Common.ViewModels.SurveyViewModels;
//using Lipstick._Convergence.Services;
//using Microsoft.AspNetCore.Mvc;

//namespace Lipstick.Controllers
//{
//    public class SurveyController : Controller
//    {
//        private readonly SurveyFormService _surveyService;
//        private readonly ParticipantService _participantService;
//        public SurveyController(SurveyFormService surveyService, ParticipantService participantService)
//        {
//            _surveyService = surveyService;
//            _participantService = participantService;
//        }
//        public async Task<IActionResult> Index(int surveyFormId)
//        {
//            var survey = await _surveyService.GetById(surveyFormId);
//            if (survey == null)
//            {
//                return NotFound();
//            }
//            return View(survey);
//        }
//        [HttpPost]
//        public async Task<IActionResult> Index(SurveyUIViewModel model)
//        {
//            if (!ModelState.IsValid)
//            { 
//                return View(model);
//            }
//            await _participantService.CreateAsync(model);
//            return RedirectToAction("ThankYou");
//        }
//        [HttpGet]
//        public IActionResult ThankYou()
//        {
//            return View();
//        }
//    }
//}

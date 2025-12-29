//using BusinessLogic.BOMHelpers;
//using Microsoft.AspNetCore.Mvc;

//namespace WebCore.Server.Controllers.BOMControllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class InitialDBController : ControllerBase
//    {
//        private readonly InitialDB _initialDB;
//        public InitialDBController(InitialDB initialDB)
//        {
//            _initialDB = initialDB;
//        }

//        /// <summary>
//        /// Initializes the database with default values.
//        /// </summary>
//        /// <returns>A string indicating the result of the operation.</returns>
//        [HttpGet("InitializeDB")]
//        public IActionResult InitializeDB()
//        {
//            _initialDB.InitializeAsync();
//            return Ok("Database initialized with default values. Please check the logs for details.");
//        }
//    }
//}

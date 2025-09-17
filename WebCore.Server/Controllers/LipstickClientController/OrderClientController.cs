using Common;
using Common.Custom.ApiKey;
using Common.Models;
using Common.ViewModels.LipstickClientViewModels;
using LipstickBusinessLogic.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiKey]
    public class OrderClientController : ControllerBase
    {
        private readonly IOrderClientHelper _orderHistoryClientHelper;
        public OrderClientController(IOrderClientHelper orderHistoryClientHelper)
        {
            _orderHistoryClientHelper = orderHistoryClientHelper;
        }

        [HttpGet("GetAllByUserId/{userId}/{pageIndex}/{pageSize}")]
        public IActionResult GetAllByUserId(int userId, int pageIndex, int pageSize)
        {
            //string language = Request.Headers[Constants.Language].ToString();

            var data = _orderHistoryClientHelper.GetAllByUserId(pageIndex, pageSize, userId);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpGet("GetAllByPhoneNumber/{phoneNumber}/{pageIndex}/{pageSize}")]
        public IActionResult GetAllByPhoneNumber(string phoneNumber, int pageIndex, int pageSize)
        {
            //string language = Request.Headers[Constants.Language].ToString();

            var data = _orderHistoryClientHelper.GetAllByPhoneNumber(pageIndex, pageSize, phoneNumber);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpGet("GetEagerOrderById/{id}")]
        public IActionResult GetEagerOrderById(int id)
        {
            string language = Request.Headers[Constants.Language].ToString();

            var data = _orderHistoryClientHelper.GetEagerOrderById(id, language);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] OrderClientViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            string? code = await _orderHistoryClientHelper.CreateAsync(model);
            if (string.IsNullOrEmpty(code))
                return BadRequest();
            DataObjectResult result = new DataObjectResult()
            {
                OK = true,
                Data = code
            };

            return Ok(result);
        }

        [HttpPut]
        [Route("updateStatus/{id}/{statusId}")]
        public async Task<IActionResult> UpdateStatus(int id, int statusId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _orderHistoryClientHelper.UpdateStatusAsync(id, statusId);
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPut]
        [Route("updateReceiveDate/{id}")]
        public async Task<IActionResult> UpdateReceiveDate(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _orderHistoryClientHelper.UpdateReceiveDateAsync(id);
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }

        //[HttpPost("getOrderHistoryItemList")]
        //public async Task<IActionResult> GetOrderHistoryItemList([FromBody] List<CartItemModel> items)
        //{
        //    string language = Request.Headers[Constants.Language].ToString();
        //    var result = await _orderHistoryClientHelper.GetItemListAsync(language, items);
        //    return Ok(result);
        //}
    }
}

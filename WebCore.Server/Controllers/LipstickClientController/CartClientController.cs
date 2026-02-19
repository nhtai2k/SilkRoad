using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;
using System.Share.ViewModels.LipstickClientViewModels;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    public class CartClientController : ControllerBase
    {
        private readonly ICartClientHelper _cartHelper;
        public CartClientController(ICartClientHelper cartHelper)
        {
            _cartHelper = cartHelper;
        }
        [HttpPost("getCart")]
        public async Task<IActionResult> GetCart([FromBody] List<CartItemModel> items)
        {
            string language = Request.Headers[Constants.Language].ToString();
            var result = await _cartHelper.GetCartAsync(language, items);
            return Ok(result);
        }
    }
}

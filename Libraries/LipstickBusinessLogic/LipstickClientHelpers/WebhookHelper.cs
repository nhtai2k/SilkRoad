using Lipstick.BLL.ILipstickClientHelpers;
using Lipstick.DAL;
using Lipstick.DAL.DTOs;
using Newtonsoft.Json;
using System.Share;
using System.Share.Models;
using System.Text;

namespace Lipstick.BLL.LipstickClientHelpers
{
    public class WebhookHelper : IWebhookHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ServerAppConfig _serverAppConfig;
        public WebhookHelper(IUnitOfWork unitOfWork, ServerAppConfig serverAppConfig)
        {
            _unitOfWork = unitOfWork;
            _serverAppConfig = serverAppConfig;
        }
        /// <summary>
        /// Create a new payment record based on the SepayModel received from the webhook.
        /// Content is Code of the Order, which is used to update the payment status of the order.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<bool> CreateAsync(SepayModel model)
        {
            try
            {
                // Validate the model before proceeding
                PaymentDTO data = new PaymentDTO()
                {
                    PaymentTypeId = (int)EPaymentTypes.BankTransfer,
                    StatusId = (int)EPaymentStatus.Success,
                    Amount = (double)model.TransferAmount,
                    SepayObject = JsonConvert.SerializeObject(model),
                };
                //Get the order by code
                if (!string.IsNullOrEmpty(model.Content))
                {
                    // Assuming Content is the Order Code
                    OrderDTO? orderDTO = await _unitOfWork.OrderRepository.GetByCodeAsync(model.Content);
                    // If the order exists, update its payment status
                    if (orderDTO != null)
                    {
                        orderDTO.PaymentStatusId = (int)EPaymentStatus.Success;
                    }
                }
                // Create the payment record
                await _unitOfWork.PaymentRepository.CreateAsync(data);
                await _unitOfWork.SaveChangesAsync();

                //Send Endpoint
                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri(_serverAppConfig.ClientUrl);
                    HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
                    await httpClient.PostAsync(_serverAppConfig.WebhookEndpointUrl, httpContent);
                }

                return true;
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here if needed
                return false;
            }
        }
    }
}

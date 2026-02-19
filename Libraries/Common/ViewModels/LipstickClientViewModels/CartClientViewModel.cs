namespace System.Share.ViewModels.LipstickClientViewModels
{
    public class CartClientViewModel
    {
        public double TotalPrice { get; set; }
        public int TotalQuantity { get; set; }
        public List<CartItemClientViewModel> CartItems { get; set; }
        public CartClientViewModel()
        {
            TotalPrice = 0;
            TotalQuantity = 0;
            CartItems = new List<CartItemClientViewModel>();
        }
    }


}

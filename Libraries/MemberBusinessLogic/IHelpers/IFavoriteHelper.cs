namespace Member.BLL.IHelpers
{
    public interface IFavoriteHelper
    {
        // Return true if the product was favorited, false if it was removed from favorites
        public bool HandleFavoriteProduct(int productId, int userId);
    }
}

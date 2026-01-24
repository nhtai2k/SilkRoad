using Member.BLL.IHelpers;
using Member.DAL;
using Member.DAL.DTOs;

namespace Member.BLL.Helpers
{
    public class FavoriteHelper : IFavoriteHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public FavoriteHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        /// <summary>
        /// Handles the favorite product action for a user.
        /// If the product is already favorited, it will be removed from favorites.
        /// If the product is not favorited, it will be added to favorites.
        /// Return true if the product was favorited, false if it was removed from favorites
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool HandleFavoriteProduct(int productId, int userId)
        {
            // Check if the product is already favorited by the user
            var favoritedProduct = _unitOfWork.FavoriteRepository.GetFavoriteProduct(productId, userId);
            if (favoritedProduct != null)
            {
                // If favorited, remove it from favorites
                _unitOfWork.FavoriteRepository.Delete(favoritedProduct);
            }
            else
            {
                // If not favorited, add it to favorites
                _unitOfWork.FavoriteRepository.Create(new FavoriteDTO
                {
                    ProductId = productId,
                    UserId = userId
                });
            }

            // Save changes to the database
            _unitOfWork.SaveChanges();
            // Return true if the product was favorited, false if it was removed from favorites
            return favoritedProduct == null;
        }
    }
}

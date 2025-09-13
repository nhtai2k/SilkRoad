using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberBusinessLogic.IHelpers
{
    public interface IFavoriteHelper
    {
        // Return true if the product was favorited, false if it was removed from favorites
        public bool HandleFavoriteProduct(int productId,int userId);
    }
}

namespace RestaurantBusinessLogic.Models
{
    public class DishFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int CategoryId { get; set; }
        public int TypeId { get; set; } // -1: All, 0: Single Dish, 1: Group Dish
        public string? Name { get; set; }
    }
}

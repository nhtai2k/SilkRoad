//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace DataAccess.BOMConfigurations
//{
//    public class RentalConfiguration : IEntityTypeConfiguration<RentalDTO>
//    {
//        public void Configure(EntityTypeBuilder<RentalDTO> builder)
//        {
//            builder.ToTable("Table_Rentals");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id).ValueGeneratedOnAdd();
//            builder.Property(s => s.MallId).IsRequired();
//            builder.Property(s => s.LocationId).IsRequired();
//        }
//    }
//}

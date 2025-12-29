//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace DataAccess.BOMConfigurations
//{
//    public class LocationConfiguration : IEntityTypeConfiguration<LocationDTO>
//    {
//        public void Configure(EntityTypeBuilder<LocationDTO> builder)
//        {
//            builder.ToTable("Table_Locations");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id).ValueGeneratedOnAdd();
//            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
//            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
//            builder.Property(s => s.ImagePath).HasMaxLength(255);
//            builder.Property(s => s.Note).HasMaxLength(500);
//            // Mall has many Locations
//            builder
//                .HasOne(s => s.Mall)
//                .WithMany(m => m.Locations)
//                .HasForeignKey(s => s.MallId)
//                .OnDelete(DeleteBehavior.Restrict);


//        }
//    }
//}

//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace DataAccess.BOMConfigurations
//{
//    public class AreaConfiguration : IEntityTypeConfiguration<AreaDTO>
//    {
//        public void Configure(EntityTypeBuilder<AreaDTO> builder)
//        {
//            builder.ToTable("Table_Areas");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id).ValueGeneratedOnAdd();
//            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
//            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
//            builder.Property(s => s.ImagePath).HasMaxLength(255);
//            builder.Property(s => s.Note).HasMaxLength(500);
//            builder
//               .HasOne(s => s.Location)
//               .WithMany(m => m.Areas)
//               .HasForeignKey(s => s.LocationId)
//               .OnDelete(DeleteBehavior.Restrict);
//        }
//    }
//}

//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace DataAccess.BOMConfigurations
//{
//    public class MallConfiguration : IEntityTypeConfiguration<MallDTO>
//    {
//        public void Configure(EntityTypeBuilder<MallDTO> builder)
//        {
//            builder.ToTable("Table_Malls");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id).ValueGeneratedOnAdd();
//            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
//            builder.HasIndex(s => s.Code).IsUnique();
//            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
//            builder.Property(s => s.ImagePath).HasMaxLength(255);
//            builder.Property(s => s.Note).HasMaxLength(500);
//        }
//    }
//}

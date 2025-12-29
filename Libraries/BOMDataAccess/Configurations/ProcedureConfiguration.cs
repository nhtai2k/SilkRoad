//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace DataAccess.BOMConfigurations
//{
//    public class ProcedureConfiguration : IEntityTypeConfiguration<ProcedureDTO>
//    {
//        public void Configure(EntityTypeBuilder<ProcedureDTO> builder)
//        {
//            builder.ToTable("Table_Procedures");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id).ValueGeneratedOnAdd();
//            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
//            builder.HasIndex(s => s.Code).IsUnique();
//            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
//            builder.Property(s => s.Note).HasMaxLength(500);
//        }
//    }
//}

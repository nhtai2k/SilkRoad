//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace DataAccess.BOMConfigurations
//{
//    public class BOMProcedureLinkConfiguration : IEntityTypeConfiguration<BOMProcedureLinkDTO>
//    {
//        public void Configure(EntityTypeBuilder<BOMProcedureLinkDTO> builder)
//        {
//            builder.ToTable("Table_BOMProcedureLinks");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id)
//                .HasDefaultValueSql("NEWSEQUENTIALID()")
//                .ValueGeneratedOnAdd();
//            builder.Property(s => s.BOMCategoryLinkId).IsRequired();
//            builder.Property(s => s.ProcedureId).IsRequired();
//            builder.HasOne(s => s.BOMCategoryLink)
//                   .WithMany(s => s.BOMProcedureLinks)
//                   .HasForeignKey(s => s.BOMCategoryLinkId)
//                   .OnDelete(DeleteBehavior.Cascade);
//        }
//    }
//}

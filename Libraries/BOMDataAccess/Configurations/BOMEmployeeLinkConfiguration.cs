//using DataAccess.BOMDTOs;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace DataAccess.BOMConfigurations
//{
//    public class BOMEmployeeLinkConfiguration : IEntityTypeConfiguration<BOMEmployeeLinkDTO>
//    {
//        public void Configure(EntityTypeBuilder<BOMEmployeeLinkDTO> builder)
//        {
//            builder.ToTable("Table_BOMEmployeeLinks");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id)
//                .HasDefaultValueSql("NEWSEQUENTIALID()")
//                .ValueGeneratedOnAdd();
//            builder.Property(s => s.EmployeeId).IsRequired();
//            builder.HasOne(s => s.BOMCategory)
//                   .WithMany(s => s.BOMEmployeeLinks)
//                   .HasForeignKey(s => s.BOMCategoryId)
//                   .OnDelete(DeleteBehavior.Cascade);
//        }
//    }
//}

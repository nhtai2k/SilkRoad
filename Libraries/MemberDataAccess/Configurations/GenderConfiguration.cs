using MemberDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberDataAccess.Configurations
{
    public class GenderConfiguration : IEntityTypeConfiguration<GenderDTO>
    {
        public void Configure(EntityTypeBuilder<GenderDTO> builder)
        {
            builder.ToTable("Table_Genders");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.NameEN).IsRequired().HasColumnType("nvarchar(10)");
            builder.Property(s => s.NameVN).IsRequired().HasColumnType("nvarchar(10)");
            builder.HasData([
                new GenderDTO(){Id = 1, NameEN = "Male", NameVN = "Nam"},
                new GenderDTO(){Id = 2, NameEN = "Female", NameVN = "Nữ"},
                ]);
        }
    }
}

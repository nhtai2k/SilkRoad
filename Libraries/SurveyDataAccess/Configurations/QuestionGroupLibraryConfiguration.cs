using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Survey.DAL.DTOs;

namespace Survey.DAL.Configurations
{
    public class QuestionGroupLibraryConfiguration : IEntityTypeConfiguration<QuestionGroupLibraryDTO>
    {
        public void Configure(EntityTypeBuilder<QuestionGroupLibraryDTO> builder)
        {
            builder.ToTable("QuestionGroupLibraries");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.NameEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.NameVN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.Note).HasColumnType("nvarchar(500)");
            builder.Property(s => s.CreatedBy).HasColumnType("varchar(100)");
            builder.Property(s => s.ModifiedBy).HasColumnType("varchar(100)");
        }
    }
}

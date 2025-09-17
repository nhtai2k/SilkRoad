using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.Configurations
{
    public class QuestionLibraryConfiguration : IEntityTypeConfiguration<QuestionLibraryDTO>
    {
        public void Configure(EntityTypeBuilder<QuestionLibraryDTO> builder)
        {
            builder.ToTable("Table_QuestionLibraries");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.QuestionGroupId).IsRequired();
            builder.Property(s => s.QuestionTypeId).IsRequired();
            builder.Property(s => s.NameEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.NameVN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.Note).HasColumnType("nvarchar(500)");
            builder.Property(s => s.CreatedBy).HasColumnType("varchar(100)");
            builder.Property(s => s.ModifiedBy).HasColumnType("varchar(100)");
            builder.HasOne<QuestionGroupLibraryDTO>(s => s.QuestionGroupLibrary).WithMany(g => g.QuestionLibraries).HasForeignKey(s => s.QuestionGroupId);
            builder.HasOne<QuestionTypeDTO>(s => s.QuestionType).WithMany(g => g.Questions).HasForeignKey(s => s.QuestionTypeId);
        }
    }
}

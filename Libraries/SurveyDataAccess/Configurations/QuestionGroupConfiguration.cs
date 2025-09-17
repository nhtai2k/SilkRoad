using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.Configurations
{
    public class QuestionGroupConfiguration : IEntityTypeConfiguration<QuestionGroupDTO>
    {
        public void Configure(EntityTypeBuilder<QuestionGroupDTO> builder)
        {
            builder.ToTable("Table_QuestionGroups");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.NameEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.NameVN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.Priority).HasColumnType("tinyint");
            builder.HasOne<SurveyFormDTO>(s => s.SurveyForm).WithMany(g => g.QuestionGroups).HasForeignKey(s => s.SurveyFormId);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.Configurations
{
    public class QuestionConfiguration : IEntityTypeConfiguration<QuestionDTO>
    {
        public void Configure(EntityTypeBuilder<QuestionDTO> builder)
        {
            builder.ToTable("Table_Questions");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.QuestionTypeId).IsRequired();
            builder.Property(s => s.NameEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.NameVN).HasColumnType("nvarchar(255)");
            builder.HasOne<QuestionGroupDTO>(s => s.QuestionGroup).WithMany(g => g.Questions).HasForeignKey(s => s.QuestionGroupId);
            builder.HasOne<QuestionTypeDTO>(s => s.QuestionType)
                .WithMany()
                .HasForeignKey(s => s.QuestionTypeId)
                .OnDelete(DeleteBehavior.NoAction);
            // If you have a SurveyForm relationship, add it here with the correct FK
        }
    }
}

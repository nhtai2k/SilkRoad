using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Survey.DAL.DTOs;

namespace Survey.DAL.Configurations
{
    public class PredefinedAnswerConfiguration : IEntityTypeConfiguration<PredefinedAnswerDTO>
    {
        public void Configure(EntityTypeBuilder<PredefinedAnswerDTO> builder)
        {
            builder.ToTable("PredefinedAnswers");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.NameEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.NameVN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.Priority).HasColumnType("tinyint");
            builder.HasOne<QuestionDTO>(s => s.Question)
                .WithMany(g => g.PredefinedAnswers)
                .HasForeignKey(s => s.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

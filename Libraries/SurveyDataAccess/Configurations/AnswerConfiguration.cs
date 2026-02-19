using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Survey.DAL.DTOs;

namespace Survey.DAL.Configurations
{
    public class AnswerConfiguration : IEntityTypeConfiguration<AnswerDTO>
    {
        public void Configure(EntityTypeBuilder<AnswerDTO> builder)
        {
            builder.ToTable("Answers");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.QuestionGroupId).IsRequired();
            builder.Property(s => s.QuestionId).IsRequired();
            builder.Property(s => s.Rating).HasColumnType("tinyint");
            builder.HasOne<ParticipantDTO>(s => s.Participant).WithMany(g => g.Answers).HasForeignKey(s => s.ParticipantId);
        }
    }
}

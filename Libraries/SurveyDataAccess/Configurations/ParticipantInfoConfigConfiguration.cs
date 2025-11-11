using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.Configurations
{
    public class ParticipantInfoConfigConfiguration : IEntityTypeConfiguration<ParticipantInfoConfigDTO>
    {
        public void Configure(EntityTypeBuilder<ParticipantInfoConfigDTO> builder)
        {
            builder.ToTable("ParticipantInfoConfigs");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.FieldNameEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.PlaceholderEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.FieldNameVN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.PlaceholderVN).HasColumnType("nvarchar(255)");
            builder.HasOne<SurveyFormDTO>(s => s.SurveyForm).WithMany(g => g.ParticipantInfoConfigs).HasForeignKey(s => s.SurveyFormId);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Survey.DAL.DTOs;

namespace Survey.DAL.Configurations
{
    public class ParticipantInfoConfiguration : IEntityTypeConfiguration<ParticipantInfoDTO>
    {
        public void Configure(EntityTypeBuilder<ParticipantInfoDTO> builder)
        {
            builder.ToTable("ParticipantInfos");
            // set composite primary key
            builder.HasKey(s => new { s.ParticipantInfoConfigId, s.ParticipantId });
            builder.Property(s => s.TextValue).HasColumnType("nvarchar(1000)");
            builder.HasOne<ParticipantDTO>(s => s.Participant).WithMany(g => g.ParticipantInfos).HasForeignKey(s => s.ParticipantId);
        }
    }
}

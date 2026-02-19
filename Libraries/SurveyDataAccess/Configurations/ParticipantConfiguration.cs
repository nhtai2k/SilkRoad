using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Survey.DAL.DTOs;

namespace Survey.DAL.Configurations
{
    public class ParticipantConfiguration : IEntityTypeConfiguration<ParticipantDTO>
    {
        public void Configure(EntityTypeBuilder<ParticipantDTO> builder)
        {
            builder.ToTable("Participants");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWID()")
                .ValueGeneratedOnAdd();
            //builder.Property(s => s.FullName).HasColumnType("nvarchar(255)");
            //builder.Property(s => s.PhoneNumber).HasColumnType("varchar(10)");
            //builder.Property(s => s.Email).HasColumnType("varchar(255)");
            //builder.Property(s => s.Note).HasColumnType("nvarchar(500)");
            builder.Property(s => s.CreatedBy).HasColumnType("varchar(100)");
            builder.HasOne<SurveyFormDTO>(s => s.SurveyForm).WithMany(g => g.Participants).HasForeignKey(s => s.SurveyFormId);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VOC.DAL.DTOs;

namespace VOC.DAL.Configurations
{
    public class ForwardFeedbackConfiguration : IEntityTypeConfiguration<ForwardFeedbackDTO>
    {
        public void Configure(EntityTypeBuilder<ForwardFeedbackDTO> builder)
        {
            builder.ToTable("Table_ForwardFeedbacks");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}

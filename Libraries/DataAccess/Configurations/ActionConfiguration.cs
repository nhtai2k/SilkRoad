using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class ActionConfiguration : IEntityTypeConfiguration<ActionDTO>
    {
        public void Configure(EntityTypeBuilder<ActionDTO> builder)
        {
            builder.ToTable("Actions");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Name).IsRequired();
        }
    }
}

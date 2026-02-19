using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class ModuleConfiguration : IEntityTypeConfiguration<ModuleDTO>
    {
        public void Configure(EntityTypeBuilder<ModuleDTO> builder)
        {
            builder.ToTable("Modules");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}

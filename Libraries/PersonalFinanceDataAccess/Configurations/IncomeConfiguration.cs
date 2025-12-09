using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceDataAccess.Configurations
{
    public class IncomeConfiguration : IEntityTypeConfiguration<IncomeDTO>
    {
        public void Configure(EntityTypeBuilder<IncomeDTO> builder)
        {
            builder.ToTable("Incomes");
            builder.HasKey(i => i.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(i => i.Source)
                   .IsRequired()
                   .HasMaxLength(100);
            builder.Property(i => i.Amount)
                     .IsRequired()
                     .HasColumnType("decimal(18,2)");
            builder.Property(i => i.Date)
                        .IsRequired();
            builder.Property(i => i.Note)
                           .HasMaxLength(500);

        }
    }
}

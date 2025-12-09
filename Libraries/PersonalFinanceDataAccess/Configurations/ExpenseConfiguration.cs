using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceDataAccess.Configurations
{
    public class ExpenseConfiguration : IEntityTypeConfiguration<ExpenseDTO>
    {
        public void Configure(EntityTypeBuilder<ExpenseDTO> builder)
        {
            builder.ToTable("Expenses");
            builder.HasKey(e => e.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            builder.Property(e => e.Note).HasMaxLength(500);
        }
    }
}

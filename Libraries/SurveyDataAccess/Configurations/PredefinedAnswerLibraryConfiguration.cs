using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyDataAccess.Configurations
{
    public class PredefinedAnswerLibraryConfiguration : IEntityTypeConfiguration<PredefinedAnswerLibraryDTO>
    {
        public void Configure(EntityTypeBuilder<PredefinedAnswerLibraryDTO> builder)
        {
            builder.ToTable("Table_PredefinedAnswerLibraries");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.NameEN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.NameVN).HasColumnType("nvarchar(255)");
            builder.Property(s => s.Priority).HasColumnType("tinyint");
            builder.HasOne<QuestionLibraryDTO>(s => s.Question)
                .WithMany(g => g.PredefinedAnswerLibraries)
                .HasForeignKey(s => s.QuestionLibraryId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using SurveyDataAccess.DTOs;

//namespace SurveyDataAccess.Configurations
//{
//    public class SurveyQuestionConfiguration : IEntityTypeConfiguration<SelectedQuestionDTO>
//    {
//        public void Configure(EntityTypeBuilder<SelectedQuestionDTO> builder)
//        {
//            builder.ToTable("Table_SurveyQuestions");
//            builder.HasKey(s => s.Id);
//            builder.Property(s => s.Id).ValueGeneratedOnAdd();
//            builder.Property(s => s.Priority).HasColumnType("tinyint");
//            builder.HasOne<QuestionLibraryDTO>(s => s.Question).WithMany(g => g.SurveyQuestions).HasForeignKey(s => s.QuestionId);
//            builder.HasOne<SurveyFormDTO>(s => s.SurveyFrom).WithMany(g => g.SurveyQuestions).HasForeignKey(s => s.SurveyFormId);
//        }
//    }
//}

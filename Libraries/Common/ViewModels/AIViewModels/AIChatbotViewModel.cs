namespace System.Share.ViewModels.AIViewModels
{
    public class AIChatbotViewModel
    {
        public string Model { get; set; }
        public string Prompt { get; set; }
        public string Message { get; set; }
        public IList<long>? Context { get; set; }
        public AIChatbotViewModel()
        {
            Model = string.Empty;
            Prompt = string.Empty;
            Message = string.Empty;
            Context = null;
        }
    }
}

using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace System.Share.Custom.ExtensionMethods
{
    public static class EnumExtensions
    {
        public static string GetDisplayName(this Enum value)
        {
            var memberInfo = value.GetType().GetMember(value.ToString()).FirstOrDefault();
            var displayAttribute = memberInfo?.GetCustomAttribute<DisplayAttribute>();
            return displayAttribute?.Name ?? value.ToString();
        }
    }
}

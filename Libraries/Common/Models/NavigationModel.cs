using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System.Share.Models
{
    public class NavigationModel
    {
        public required string Name { get; set; }
        public required int Priority { get; set; }
        public required ICollection<NavItemModel> NavItems { get; set; }
    }
    public class NavItemModel
    {
        // Corresponds to INavData from TypeScript
        public string? Name { get; set; }
        // Can be a string or an array in TS, so keep it as object in C#
        public object? Url { get; set; }
        public string? Href { get; set; }
        public string? Icon { get; set; }
        public IconComponentModel? IconComponent { get; set; }
        public NavBadgeModel? Badge { get; set; }
        public bool? Title { get; set; }
        public NavItemModel[]? Children { get; set; }
        public string? Variant { get; set; }
        public Dictionary<string, object>? Attributes { get; set; }
        public bool? Divider { get; set; }
        // 'class' in TS -> use PascalCase 'Class' in C#
        public string? Class { get; set; }
        public NavLabelModel? Label { get; set; }
        public NavWrapperModel? Wrapper { get; set; }
        public NavLinkPropsModel? LinkProps { get; set; }
    }

    public class IconComponentModel
    {
        public required string Name { get; set; }
    }

    public class NavBadgeModel
    {
        public string? Text { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public string? Class { get; set; }
    }

    public class NavLabelModel
    {
        public string? Class { get; set; }
        public string? Variant { get; set; }
    }

    public class NavWrapperModel
    {
        public Dictionary<string, object>? Attributes { get; set; }
        public string? Element { get; set; }
    }

    public class NavLinkPropsModel
    {
        public Dictionary<string, object>? QueryParams { get; set; }
        public string? Fragment { get; set; }
        // "merge" | "preserve" | "" | null
        public string? QueryParamsHandling { get; set; }
        public bool? PreserveFragment { get; set; }
        public bool? SkipLocationChange { get; set; }
        public bool? ReplaceUrl { get; set; }
        public Dictionary<string, object>? State { get; set; }
        public RouterLinkActiveOptions? RouterLinkActiveOptions { get; set; }
        public string[]? RouterLinkActive { get; set; }
        // Could be string or boolean in TS, so keep as object
        public object? AriaCurrentWhenActive { get; set; }
    }

    public class RouterLinkActiveOptions
    {
        public bool Exact { get; set; }
    }
}

export const baseUrl = "https://dev.thiso.vn/#/";

export const chatbotHubUrl = baseUrl + "chat";
export const ollamaUrl = baseUrl + "api/Ollama/GetResponse";
export const streamOllamaUrl = baseUrl + "api/Ollama/GetStreamingResponse";
export const chatGPTUrl = baseUrl + "api/ChatGPT/GetResponse";

export enum EPageTypes
{
    AboutUs,
    Contact,
    ReturnPolicy,
    TermsAndConditions,
    PrivacyPolicy,
}

export enum EBannerTypes
{
    MainBanner,
    SubBanner
}

export enum EColors {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    dark = 'dark',
    light = 'light'
}

export enum EActions{
    View = 'View',
    ViewDetails = 'ViewDetails',
    Create = 'Create',
    Update = 'Update',
    SoftDelete = 'SoftDelete',
    Restore = 'Restore',
    Delete = 'Delete',
    Export = 'Export',
    Import = 'Import',
    LogIn = 'LogIn',
    LogOut = 'LogOut',
}

export enum EControllers{
    Blog = 'Blog',
    Brand = 'Brand',
    Category = 'Category',
    Color = 'Color',
    HomeBanner = 'HomeBanner',
    PageContent = 'PageContent',
    PageType = 'PageType',
    product = 'Product',
    Size = 'Size',
    SubCategory = 'SubCategory',
    Topic = 'Topic',
    MyAccount = 'MyAccount',
}

export enum EPaymentTypes
{
    CashOnDelivery = 1,
    BankTransfer = 2
    // ZaloPay = 3,
    // MoMo = 4,
    // VNPay = 5,
    // PayPal = 6,
    // Stripe = 7
}

export enum EOrderStatus
{
    New = 1,
    Processing = 2,
    Shipping = 3,
    Completed = 4,
    Canceled = 5,
    Refunded = 6,
    Failed = 7
}

export enum EPaymentStatus
{
    Pending = 1,
    Success = 2,
    Failed = 3,
    Cancelled = 4,
    Refunded = 5
}

export enum EQuestionTypes
{
    ClosedEndedQuestion = 1,
    OpenEndedQuestion = 2,
    HybridQuestion = 3,
    MultipleChoiceQuestion = 4,
    RatingQuestion = 5
}

export enum EFieldTypes
{
    Text = 1,
    TextArea = 2,
    Number = 3,
    Date = 4,
    Email = 5,
    PhoneNumber = 6,
    Datetime = 7
    // Dropdown = 8,
    // RadioButton = 9,
    // Checkbox = 10
}

export enum EFormStyles{
    DefaultForm = -1,
    GoldForm = 1,
    SilverForm = 2
}

export enum ELanguages
{
    English = 'EN',
    Vietnamese = 'VN'
}

export function numberEnumToArray(enumObj: any): { key: string, value: number }[] {
    return Object.keys(enumObj)
        .filter(k => !isNaN(Number(enumObj[k])))
        .map(k => ({
            key: k,
            value: enumObj[k]
    }));
}

export function stringEnumToArray(enumObj: any): { key: string, value: string }[] {
    return Object.keys(enumObj).map(key => ({
        key,
        value: enumObj[key]
    }));
}
  
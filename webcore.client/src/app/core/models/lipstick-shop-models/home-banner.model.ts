export interface HomeBannerViewModel{
    id: number;
    bannerTypeId: number;
    animation: string;
    imageName:string;
    subjectEN: string;
    subjectVN: string;
    descriptionEN: string;
    descriptionVN: string;
    redirectUrl: string;
    priority: number;
    isActive: boolean;
    tagENs: string;
    tagVNs: string;
}
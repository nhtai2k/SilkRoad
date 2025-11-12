import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-no-internet-icon',
    template: `
<svg [attr.width]="size + 'px'" [attr.height]="size + 'px'" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M3 15.976a13.015 13.015 0 0 1 13-13 12.884 12.884 0 0 1 12.955 14.082 1 1 0 1 1-1.994-.164A11.2 11.2 0 0 0 16 4.976a11.012 11.012 0 0 0-11 11 11.2 11.2 0 0 0 11.917 10.961 1.01 1.01 0 0 1 1.083.916 1.029 1.029 0 0 1-.915 1.079C11.9 29.736 3 25.309 3 15.976z" [attr.fill]="color" opacity="1" [attr.data-original]="color" class=""></path><path d="M16 28.976c-3.421 0-6-5.589-6-13s2.579-13 6-13c3.658 0 5.779 6.019 5.982 11.965a1 1 0 0 1-.965 1.034.981.981 0 0 1-1.033-.965C19.779 9.1 17.721 4.976 16 4.976c-1.888 0-4 4.7-4 11s2.112 11 4 11a1 1 0 0 1 0 2z" [attr.fill]="color" opacity="1" [attr.data-original]="color" class=""></path><path d="M27 12.976H5a1 1 0 1 1 0-2h22a1 1 0 0 1 0 2zM16 20.976H5a1 1 0 1 1 0-2h11a1 1 0 0 1 0 2zM23 28.976a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" [attr.fill]="color" opacity="1" [attr.data-original]="color" class=""></path><path d="M19.293 20.707a1 1 0 0 1 1.414-1.414l6 6a1 1 0 0 1-1.414 1.414z" [attr.fill]="color" opacity="1" [attr.data-original]="color" class=""></path></g></svg>
    `
})
export class NoInternetIconComponent {
    @Input() size: number = 25;
    @Input() color: string = '#ffffff';
}

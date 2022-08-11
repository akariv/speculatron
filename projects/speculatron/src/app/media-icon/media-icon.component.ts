import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-media-icon',
  templateUrl: './media-icon.component.html',
  styleUrls: ['./media-icon.component.less']
})
export class MediaIconComponent implements OnInit, OnChanges {

  @Input() type: string;
  @Input() color: string;
  svg: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.update();
  }

  public static getCodeForType(type: string, color: string, breathe: boolean = false) {
    let content: any = {
      wikipedia: `d="M12.081 12.932C11.301 14.543 10.232 16.724 9.702 17.708C9.189 18.604 8.762 18.484 8.424 17.732C7.252 14.962 4.844 10.107 3.712 7.38499C3.503 6.88299 3.345 6.56199 3.196 6.43499C3.045 6.30999 2.734 6.23499 2.26 6.20799C2.086 6.18899 2 6.14699 2 6.07699V5.69799L2.043 5.65999C2.814 5.65599 6.546 5.65999 6.546 5.65999L6.588 5.69799V6.05999C6.588 6.15999 6.525 6.20699 6.4 6.20699L5.93 6.23099C5.527 6.25699 5.325 6.36799 5.325 6.59599C5.325 6.70799 5.369 6.87099 5.464 7.09699C6.366 9.30299 9.481 15.869 9.481 15.869L9.595 15.908L11.605 11.896L11.203 11.006L9.82 8.28499C9.82 8.28499 9.555 7.73999 9.463 7.55799C8.856 6.35499 8.87 6.29299 8.257 6.21099C8.084 6.19099 7.996 6.16899 7.996 6.08599V5.69599L8.046 5.65899H11.624L11.719 5.68899V6.06499C11.719 6.15299 11.656 6.18999 11.53 6.18999L11.273 6.22899C10.613 6.27999 10.722 6.54699 11.16 7.41499L12.479 10.127L13.944 7.20499C14.188 6.67199 14.138 6.53699 14.037 6.41599C13.979 6.34599 13.782 6.23099 13.36 6.21599L13.192 6.19799C13.1479 6.19805 13.1052 6.18286 13.071 6.15499C13.0534 6.14334 13.039 6.12741 13.0292 6.1087C13.0194 6.08999 13.0145 6.0691 13.015 6.04799V5.69099L13.066 5.65399C14.106 5.64699 16.437 5.65399 16.437 5.65399L16.487 5.69099V6.05499C16.487 6.15599 16.437 6.20299 16.326 6.20299C15.787 6.22699 15.674 6.28199 15.472 6.56899C15.372 6.72299 15.159 7.05899 14.934 7.43399L13.015 10.997L12.961 11.109L15.289 15.872L15.431 15.913L19.096 7.20899C19.225 6.85699 19.203 6.60699 19.043 6.46299C18.878 6.31899 18.754 6.23499 18.327 6.21699L17.977 6.20299C17.9318 6.20459 17.8873 6.19162 17.85 6.16599C17.8328 6.15527 17.8184 6.14061 17.8079 6.12322C17.7975 6.10583 17.7914 6.08622 17.79 6.06599V5.70499L17.839 5.66699H21.976L22.01 5.70499V6.06899C22.01 6.16899 21.948 6.21899 21.836 6.21899C21.295 6.24299 20.896 6.36899 20.633 6.56999C20.37 6.78299 20.168 7.08399 20.019 7.45999C20.019 7.45999 16.648 15.18 15.495 17.749C15.057 18.589 14.617 18.514 14.242 17.723C13.765 16.746 12.764 14.567 12.036 12.962L12.081 12.932Z"`,
      audio: `fill-rule="evenodd" clip-rule="evenodd" d="M20 10.2928V11.9998C21.103 11.9998 22 12.8968 22 13.9998V17.9998C22 19.1028 21.103 19.9998 20 19.9998H18V10.2928C18 6.92082 15.392 4.09882 12.184 4.00282C11.3804 3.97674 10.5798 4.11306 9.83014 4.40362C9.08047 4.69417 8.39712 5.133 7.821 5.69382C7.24245 6.25141 6.78282 6.92041 6.46985 7.66047C6.15688 8.40053 5.99705 9.19631 6 9.99982V19.9998H4C2.897 19.9998 2 19.1028 2 17.9998V13.9998C2 12.8968 2.897 11.9998 4 11.9998V9.99982C3.99623 8.92846 4.2095 7.86743 4.62697 6.88074C5.04444 5.89405 5.65744 5.00214 6.429 4.25882C7.994 2.73882 10.041 1.95182 12.245 2.00282C16.521 2.13182 20 5.85082 20 10.2928ZM9 12H7V20H9V12ZM17 12H15V20H17V12Z"`,
      image: `d="M5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21ZM8 14L10.363 16.363L14 11L19 18H5L8 14Z"`,
      instagram: `fill-rule="evenodd" clip-rule="evenodd" d="M20.5271 6.08896C20.7942 6.79773 20.936 7.54758 20.9461 8.30496C21.0018 9.25754 21.0021 9.56909 21.0041 11.9803L21.0041 12.014C21.0041 14.457 20.9911 14.762 20.9481 15.724C20.9331 16.473 20.7921 17.211 20.5291 17.911C20.2972 18.5086 19.9433 19.0515 19.4899 19.5048C19.0366 19.9581 18.4938 20.312 17.8961 20.544C17.1965 20.8066 16.4572 20.9482 15.7101 20.963C14.7551 21.019 14.4421 21.019 12.0001 21.019C9.55809 21.019 9.25309 21.006 8.29009 20.963C7.54147 20.9383 6.80253 20.7862 6.10509 20.513C5.50716 20.2815 4.96407 19.9279 4.51053 19.4747C4.05699 19.0215 3.70297 18.4787 3.47109 17.881C3.20809 17.18 3.06709 16.442 3.05209 15.694C2.99609 14.738 2.99609 14.426 2.99609 11.984C2.99609 9.54196 3.00909 9.23696 3.05209 8.27396C3.06622 7.52707 3.20792 6.78809 3.47109 6.08896C3.70258 5.49102 4.05634 4.94798 4.50973 4.49459C4.96311 4.0412 5.50615 3.68745 6.10409 3.45596C6.80344 3.19343 7.54225 3.05141 8.28909 3.03596C9.24409 2.98096 9.55709 2.98096 11.9991 2.98096C14.4411 2.98096 14.7461 2.99296 15.7081 3.03596C16.4553 3.0513 17.1944 3.19331 17.8941 3.45596C18.4919 3.68761 19.0349 4.04142 19.4883 4.49479C19.9416 4.94816 20.2954 5.49111 20.5271 6.08896ZM7.37009 11.979C7.37009 14.533 9.43909 16.602 11.9931 16.602C13.2192 16.602 14.3951 16.1149 15.262 15.2479C16.129 14.3809 16.6161 13.2051 16.6161 11.979C16.6161 10.7529 16.129 9.57698 15.262 8.71C14.3951 7.84302 13.2192 7.35596 11.9931 7.35596C9.43909 7.35596 7.37009 9.42496 7.37009 11.979ZM15.7221 7.18496C15.7221 7.78096 16.2031 8.26296 16.8001 8.26296C17.3951 8.26296 17.8771 7.78096 17.8771 7.18496C17.8771 7.04346 17.8492 6.90334 17.7951 6.77262C17.7409 6.64189 17.6616 6.5231 17.5615 6.42305C17.4614 6.32299 17.3427 6.24363 17.2119 6.18948C17.0812 6.13533 16.9411 6.10746 16.7996 6.10746C16.6581 6.10746 16.518 6.13533 16.3873 6.18948C16.2565 6.24363 16.1377 6.32299 16.0377 6.42305C15.9376 6.5231 15.8583 6.64189 15.8041 6.77262C15.75 6.90334 15.7221 7.04346 15.7221 7.18496ZM14.9962 11.9791C14.9962 13.6376 13.6517 14.9821 11.9932 14.9821C10.3347 14.9821 8.99023 13.6376 8.99023 11.9791C8.99023 10.3206 10.3347 8.97607 11.9932 8.97607C13.6517 8.97607 14.9962 10.3206 14.9962 11.9791Z"`,
      twitter: `d="M19.633 7.99704C19.646 8.17204 19.646 8.34604 19.646 8.52004C19.646 13.845 15.593 19.981 8.186 19.981C5.904 19.981 3.784 19.32 2 18.172C2.324 18.209 2.636 18.222 2.973 18.222C4.78599 18.2264 6.54765 17.6202 7.974 16.501C7.13342 16.4858 6.31858 16.2085 5.64324 15.7078C4.9679 15.2071 4.46578 14.5079 4.207 13.708C4.456 13.745 4.706 13.77 4.968 13.77C5.329 13.77 5.692 13.72 6.029 13.633C5.11676 13.4489 4.29647 12.9544 3.70762 12.2337C3.11876 11.5131 2.79769 10.6107 2.799 9.68004V9.63004C3.336 9.92904 3.959 10.116 4.619 10.141C4.06609 9.77363 3.61272 9.27507 3.29934 8.68983C2.98596 8.1046 2.82231 7.4509 2.823 6.78704C2.823 6.03904 3.022 5.35304 3.371 4.75504C4.38314 6.00006 5.6455 7.0186 7.07634 7.7447C8.50717 8.4708 10.0746 8.88826 11.677 8.97004C11.615 8.67004 11.577 8.35904 11.577 8.04704C11.5767 7.518 11.6807 6.9941 11.8831 6.50528C12.0854 6.01647 12.3821 5.57232 12.7562 5.19823C13.1303 4.82414 13.5744 4.52745 14.0632 4.32512C14.5521 4.12279 15.076 4.01878 15.605 4.01904C16.765 4.01904 17.812 4.50504 18.548 5.29104C19.4498 5.11666 20.3145 4.78747 21.104 4.31804C20.8034 5.24886 20.1738 6.03815 19.333 6.53804C20.1328 6.44682 20.9144 6.2365 21.652 5.91404C21.1011 6.71714 20.4185 7.42139 19.633 7.99704Z"`,
      video: `d="M21.5914 7.20301C21.4775 6.78041 21.2549 6.39501 20.9457 6.08518C20.6366 5.77534 20.2517 5.55187 19.8294 5.43701C18.2634 5.00701 11.9984 5.00001 11.9984 5.00001C11.9984 5.00001 5.73438 4.99301 4.16738 5.40401C3.7453 5.52415 3.3612 5.75078 3.05194 6.06214C2.74269 6.3735 2.51866 6.75913 2.40138 7.18201C1.98838 8.74801 1.98438 11.996 1.98438 11.996C1.98438 11.996 1.98038 15.26 2.39038 16.81C2.62038 17.667 3.29538 18.344 4.15338 18.575C5.73538 19.005 11.9834 19.012 11.9834 19.012C11.9834 19.012 18.2484 19.019 19.8144 18.609C20.2369 18.4943 20.6221 18.2714 20.932 17.9622C21.2419 17.653 21.4658 17.2682 21.5814 16.846C21.9954 15.281 21.9984 12.034 21.9984 12.034C21.9984 12.034 22.0184 8.76901 21.5914 7.20301ZM9.99438 15.005L9.99938 9.00501L15.2064 12.01L9.99438 15.005Z"`,
    }[type];
    if (breathe) {
      const style = `<style>.a {
        transform-origin: 25% 25%;
        animation: 3s ease-out 0s 1 normal forwards running a;
        animation-iteration-count: infinite;
        opacity: 1;
      }
      @keyframes a {
        0% {transform: scaleX(1) scaleY(1);opacity: 0.8;}
        50% {opacity: 0;}
        100% {transform: scaleX(3) scaleY(3);opacity: 0;}
      }
      </style>
      `;
      const defs = `
      <defs>
      <filter id="blur" x="0" y="0" width="24" height="24">
      <feGaussianBlur stdDeviation="0.4"/>
      </filter>
      </defs>
      `;
      return `
      ${style}${defs}
      <path ${content} filter="url(#blur)" stroke="${color}" class='a'/>
      <path ${content} fill="${color}" />
      `
    } else {
      return `<path ${content} fill="${color}" />`;
    }
  }

  update() {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(MediaIconComponent.getCodeForType(this.type, this.color));
  }
}

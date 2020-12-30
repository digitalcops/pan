export class AuthUtils {

    /**
     * To create captcha script
     */
    createCaptcha(recaptchaElement) {
        window['grecaptchaCallback'] = () => {
            this.renderCaptcha(recaptchaElement);
        }
        (function (d, s, id, obj) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                obj.renderCaptcha(recaptchaElement);
                return;
            }
            const js = d.createElement(s);
            js.id = id;
            js["src"] = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'recaptcha-jssdk', this));

    }

    /**
     * To render captcha
     */
    renderCaptcha(recaptchaElement) {
        window['grecaptcha'].render(recaptchaElement.nativeElement, {
            'sitekey': '6LePbq4UAAAAAPqwJU8u5g1Of1TIEMyoPpJQpyaD',
            'callback': (response) => {
            }
        });
    }
}

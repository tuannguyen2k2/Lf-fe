import RenderContext from '@components/common/elements/RenderContext';
import useDevices from '@hooks/useDevices';
import LandingPageDesktop from '@modules/layout/desktop/landing';
import ForgetPasswordMobileComponent from '@modules/layout/mobile/login/ForgetPassword';
import React from 'react';
const ForgetPasswordPageContainer = () => {
    const { isMobile } = useDevices();

    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: LandingPageDesktop,
                },
                mobile: {
                    defaultTheme: ForgetPasswordMobileComponent,
                },
            }}
            layout={isMobile ? { defaultTheme: ForgetPasswordMobileComponent } : null}
        />
    );
};

export default ForgetPasswordPageContainer;

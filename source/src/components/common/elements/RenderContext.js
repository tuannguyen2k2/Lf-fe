import React from 'react';
import useDevices from '@hooks/useDevices';
import PageNotFound from '../page/PageNotFound';
import DefaultLayout from '@modules/layout/common/DefaultLayout';

const RenderContext = ({ layout, components, layoutProps, ...props }) => {
    const { isMobile } = useDevices();
    const ComponentLayout = layout?.defaultTheme || DefaultLayout;
    const ComponentRender =
        (isMobile ? components?.mobile?.defaultTheme : components?.desktop?.defaultTheme) || PageNotFound;
    return (
        <ComponentLayout layoutProps={layoutProps}>
            <ComponentRender {...props} />
        </ComponentLayout>
    );
};

export default RenderContext;

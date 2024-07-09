import React from 'react';
import {
    EDITING_COMPONENT_ID,
    EDITING_COMPONENT_PLACEHOLDER,
    RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

export const EditingComponentPlaceholder = ({
    rendering,
    headerRendering,
    footerRendering,
}: {
    rendering: RouteData;
    headerRendering: RouteData;
    footerRendering: RouteData;
}): JSX.Element => (
    <div id={EDITING_COMPONENT_ID}>
        <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={headerRendering} />
        <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={rendering} />
        <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={footerRendering} />
    </div>
);

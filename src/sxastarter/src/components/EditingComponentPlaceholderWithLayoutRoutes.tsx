
import React from 'react';
import {
    EDITING_COMPONENT_ID,
    EDITING_COMPONENT_PLACEHOLDER,
    RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

export const EditingComponentPlaceholderWithLayoutRoutes = ({
    rendering,
}: {
    rendering: RouteData;
}): JSX.Element => (
    <div id={EDITING_COMPONENT_ID}>
        <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={rendering} />
    </div>
);

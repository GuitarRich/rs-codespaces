import {
    DictionaryPhrases,
    ComponentPropsCollection,
    LayoutServiceData,
    SiteInfo,
    HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
    site: SiteInfo;
    locale: string;
    dictionary: DictionaryPhrases;
    componentProps: ComponentPropsCollection;
    notFound: boolean;
    headerLayoutData: LayoutServiceData;
    footerLayoutData: LayoutServiceData;
    layoutData: LayoutServiceData;
    headLinks: HTMLLink[];
};

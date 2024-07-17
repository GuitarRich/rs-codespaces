/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import { Placeholder, LayoutServiceData, HTMLLink, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Scripts from './Scripts';
import Head from 'next/head';
import config from 'temp/config';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
    layoutData: LayoutServiceData;
    headerLayoutData: LayoutServiceData;
    footerLayoutData: LayoutServiceData;
    headLinks: HTMLLink[];
}

interface RouteFields {
    [key: string]: unknown;
    Title?: Field;
}

const Layout = ({
    layoutData,
    headerLayoutData,
    footerLayoutData,
    headLinks,
}: LayoutProps): JSX.Element => {
    const { route } = layoutData.sitecore;
    const { route: headerRoute } = headerLayoutData.sitecore;
    const { route: footerRoute } = footerLayoutData.sitecore;
    const fields = route?.fields as RouteFields;

    return (
        <>
            <Scripts />
            <Head>
                <title>{fields?.Title?.value?.toString() || 'Page'}</title>
                <link rel="icon" href={`${publicUrl}/favicon.ico`} />
                {headLinks.map((headLink) => (
                    <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
                ))}
            </Head>

            <header>
                <div id="header" className="row">
                    {headerRoute && <Placeholder name="headless-header" rendering={headerRoute} />}
                    {route && <Placeholder name="headless-header" rendering={route} />}
                </div>
            </header>
            <main>
                <div id="content">
                    {route && <Placeholder name="headless-main" rendering={route} />}
                </div>
            </main>
            <footer>
                <div id="footer">
                    {route && <Placeholder name="headless-footer" rendering={route} />}
                    {footerRoute && <Placeholder name="headless-footer" rendering={footerRoute} />}
                </div>
            </footer>
        </>
    );
};

export default Layout;

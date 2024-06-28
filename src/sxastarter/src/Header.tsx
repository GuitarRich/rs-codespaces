/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
    layoutData: LayoutServiceData;
    headLinks: HTMLLink[];
}

interface RouteFields {
    [key: string]: unknown;
    Title?: Field;
}

const Header = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
    const { route } = layoutData.sitecore;
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

            {/* root placeholder for the app, which we add components to using route data */}
            <header>
                <div id="header" className="row">{route && <Placeholder name="headless-header" rendering={route} />}</div>
            </header>
        </>
    );
};

export default Header;

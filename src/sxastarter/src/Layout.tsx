/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import { Placeholder, LayoutServiceData, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
//import config from 'temp/config';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
//const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

/*
interface RouteFields {
    [key: string]: unknown;
    Title?: Field;
}
*/

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  //const fields = route?.fields as RouteFields;

  return (
    <>
      {/* root placeholder for the app, which we add components to using route data */}
      <main>
        <div id="content">{route && <Placeholder name="headless-main" rendering={route} />}</div>
      </main>
      <footer>
        <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
      </footer>
    </>
  );
};

export default Layout;

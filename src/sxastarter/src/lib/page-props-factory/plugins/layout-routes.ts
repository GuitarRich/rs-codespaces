import { ComponentRendering, HtmlElementRendering, Item } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { GetStaticPropsContext, GetServerSidePropsContext } from 'next';
import config from 'temp/config';
import { Plugin } from '..';
import { GraphQlLayoutRouteService } from '../services/layout-route-service';
import clientFactory from 'lib/graphql-client-factory';

class LayoutRoutesPlugin implements Plugin {
    private layoutRequestClient: GraphQlLayoutRouteService;

    constructor() {
        const siteName = config.sitecoreSiteName;
        this.layoutRequestClient = new GraphQlLayoutRouteService({
            siteName,
            clientFactory,
            retries: (process.env.GRAPH_QL_SERVICE_RETRIES &&
                parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) as number,
        });
    }

    order = 2;

    async exec(
        props: SitecorePageProps,
        context: GetServerSidePropsContext | GetStaticPropsContext
    ) {
        if (context.preview) {
            return props;
        }

        // get the layout route data from the page prop and then loop through the partial designs
        // to get the layout data for each partial design and add it to the page props
        const layoutRouteData = props?.layoutData?.sitecore?.route?.fields
            ? props?.layoutData?.sitecore?.route?.fields['Layout']
            : [];
        const partialDesigns =
            ((layoutRouteData as Item)?.fields['PartialDesigns'] as Array<Item>) || [];
        await Promise.all(
            partialDesigns.map(async (partialDesign) => {
                const layoutData = await this.layoutRequestClient.fetchLayoutRoute(
                    partialDesign.id?.toString() || '',
                    props.locale
                );

                props?.layoutData?.sitecore?.route?.placeholders['headless-header'].push(
                    ...(layoutData.sitecore.route?.placeholders['headless-header'] as Array<
                        ComponentRendering | HtmlElementRendering
                    >)
                );
                props?.layoutData?.sitecore?.route?.placeholders['headless-footer'].push(
                    ...(layoutData.sitecore.route?.placeholders['headless-footer'] as Array<
                        ComponentRendering | HtmlElementRendering
                    >)
                );
            })
        );
        return props;
    }
}

export const layoutRoutesPlugin = new LayoutRoutesPlugin();

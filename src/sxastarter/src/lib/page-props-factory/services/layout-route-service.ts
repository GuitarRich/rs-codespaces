import { GraphQLClient } from '@sitecore-jss/sitecore-jss';
import {
    debug,
    GraphQLLayoutService,
    GraphQLLayoutServiceConfig,
    LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';

export class GraphQlLayoutRouteService extends GraphQLLayoutService {
    private myGraphQLClient: GraphQLClient;

    constructor(public serviceConfig: GraphQLLayoutServiceConfig) {
        super(serviceConfig);
        this.myGraphQLClient = this.getGraphQLClient();
    }

    public async fetchLayoutRoute(routeId: string, language: string): Promise<LayoutServiceData> {
        const query = this.getQuery(routeId, language);
        debug.layout('fetching layout route data for routeId: %s %s', routeId, language);

        const data = await this.myGraphQLClient.request<{
            item: { rendered: LayoutServiceData };
        }>(query);

        return data.item.rendered;
    }

    private getQuery(routeId: string, language: string) {
        return `query {
                item(path: "${routeId}", language: "${language}") {
                    rendered
                }
            }`;
    }
}

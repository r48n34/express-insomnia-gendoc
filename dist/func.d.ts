import { Express } from 'express';
interface RouteGenOptions {
    collectionsName?: string;
    documentsName?: string;
    export_source?: string;
}
export declare function routeGenDoc(app: Express, currentPort: number, options?: RouteGenOptions): Promise<void>;
export {};

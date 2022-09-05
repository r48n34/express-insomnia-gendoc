import fs from "fs"
import listEndpoints from 'express-list-endpoints'

import { Express } from 'express'
import { nanoid } from 'nanoid'

interface RouteGenOptions {
    collectionsName? : string; // "My API Router"
    documentsName?: string; // "insomnia_doc"
    export_source? : string; // "insomnia.desktop.app:v2022.5.1"
}

export async function routeGenDoc(app:Express, currentPort: number, options?:RouteGenOptions) {

    const routeGenOptions = {
        collectionsName : "My API Router",
        documentsName: "insomnia_doc",
        export_source: "insomnia.desktop.app:v2022.5.1",
        ...options  
    }

    const currentTime = new Date().getTime();

    let routeObj = {
        "_type": "export",
        "__export_format": 4,
        "__export_date": new Date(),
        "__export_source": routeGenOptions.export_source,
    } as any;

    const wrkUid = "wrk_" + nanoid(32) //"wrk_2a2d 9d72 ee23 45da b928 a28f a015 f623"
    const envAndjarId = nanoid(40)
    const envUid = "env_" + envAndjarId //"env_149d 10b8 b1b2 20b5 6a51 998d 14ff 244c 039b 6c15"
    // const jarUid = "wrk_" + envAndjarId //"jar_149d 10b8 b1b2 20b5 6a51 998d 14ff 244c 039b 6c15"
    const spcUid = "spc_" + nanoid(32) //"spc_0103 7dc5 0361 48f3 860b b00b 3303 6a48"

    let routeArr:any = [];
    const expressRouterArr = listEndpoints(app);

    let pushedFlag = false;
    for(let v of expressRouterArr){
        
        const apiDoc = {
            "_id": "req_" + nanoid(32), // "req_08b1 0382 6491 4f49 992a fed1 917a a853",
            "parentId": wrkUid,
            "modified": currentTime + 3,
            "created": currentTime,
            "url": `http://localhost:${currentPort}${v.path}`,
            "name": `${v.path}`,
            "description": "",
            "method": v.methods[0],
            "body": {},
            "parameters": [],
            "headers": [],
            "authentication": {},
            "metaSortKey": -1 * currentTime,
            "isPrivate": false,
            "settingStoreCookies": true,
            "settingSendCookies": true,
            "settingDisableRenderRequestBody": false,
            "settingEncodeUrl": true,
            "settingRebuildPath": true,
            "settingFollowRedirects": "global",
            "_type": "request"
        }

        routeArr.push(apiDoc as any);

        if(!pushedFlag){
            routeArr.push({
                "_id": wrkUid,
                "parentId": null,
                "modified": currentTime + 2,
                "created": currentTime,
                "name": routeGenOptions.collectionsName,
                "description": "generated router",
                "scope": "collection",
                "_type": "workspace"
            });
            pushedFlag = true;
        }
    }

    routeArr.push(
        {
            "_id": envUid,
            "parentId": wrkUid,
            "modified": currentTime,
            "created": currentTime,
            "name": "Base Environment",
            "data": {},
            "dataPropertyOrder": null,
            "color": null,
            "isPrivate": false,
            "metaSortKey": currentTime,
            "_type": "environment"
        },
        {
            "_id": spcUid,
            "parentId": wrkUid,
            "modified": currentTime,
            "created": currentTime,
            "fileName": routeGenOptions.collectionsName,
            "contents": "",
            "contentType": "yaml",
            "_type": "api_spec"
        }
    )

    routeObj["resources"] = routeArr

    try {
        fs.writeFileSync( routeGenOptions.documentsName + ".json", JSON.stringify(routeObj));
        console.log(`Success writing ${routeGenOptions.documentsName}.json`);
    } 
    catch (error) {
        console.log("writing files error");
    }

}
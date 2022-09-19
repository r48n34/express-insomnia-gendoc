import fs from "fs"
import express from 'express'
import { routeGenDoc } from "../src/func"
import { orangeRoute } from "./subRoute"
import { Request, Response } from 'express'

describe('routeGenDoc function test', () => {

    let app = express();
    const PORT = 9898;

    beforeEach(() => {
        app.get('/', function (req: Request, res: Response) {
            res.end('Hello World')
        })
        
        app.get('/hello', function (req: Request, res: Response) {
            res.json({ status: "burh" })
        })

        app.use("/orange", orangeRoute)
    });


    test('Normal usage', () => {
        routeGenDoc(app, PORT);

        const listDir = fs.readdirSync("./");
        expect(listDir).toContain('insomnia_doc.json');

        const data = JSON.parse( fs.readFileSync("./insomnia_doc.json", 'utf8') );

        expect(data).toHaveProperty('resources');
        expect(data).toHaveProperty('_type');

        let routeNameArr = data.resources
            .filter( v => v.method)
            .map( v => v.name);
        
        expect(routeNameArr).toHaveLength(3);

        fs.unlinkSync("./insomnia_doc.json");
    });

    test('Advance usage', () => {

        const docName = "yolo_docs";

        routeGenDoc(app, PORT, {
            documentsName: docName
        });

        const listDir = fs.readdirSync("./");
        expect(listDir).toContain(`${docName}.json`);

        fs.unlinkSync(`./${docName}.json`);
    });

});
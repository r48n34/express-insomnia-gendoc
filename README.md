# express-insomnia-gendoc

Auto generate a API Docs with your express.js for import at insomnia.

### Setup / Install:

```
npm i express-insomnia-gendoc
yarn add express-insomnia-gendoc
```  
  
Still in beta, may occur bugs or unexpected error.

### Usage

``` typescript
import express from 'express'
import { Request, Response } from 'express'
import { appleRoute } from "./apple"

import { routeGenDoc } from "express-insomnia-gendoc"

const app = express()
app.use(express.static("public"))

app.get('/', function (req: Request, res: Response) {
  res.end('Hello World')
})

app.get('/hello', function (req: Request, res: Response) {
  res.json({ status: "burh" })
})

app.use("/apple", appleRoute) // Assume you have other route


const PORT = 8080
routeGenDoc(app, PORT); // Put the functions at the last

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`)
})

```

### Params

``` typescript
routeGenDoc(app:Express, currentPort: number, options?:RouteGenOptions)

interface RouteGenOptions {
    collectionsName? : string; // "My API Router"
    documentsName?: string; // "insomnia_doc"
    export_source? : string; // "insomnia.desktop.app:v2022.5.1"
}

```


Then, a ```insomnia_doc.json``` will be generated at the root folder.    
In the Insomnia home page, you can process the below steps:  
1. Click "Create".  
2. Under the "IMPORT FROM", select the "+ File".  
3. Select the generated folder.  
4. You will see a new Collection is created.  



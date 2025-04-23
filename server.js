import express from 'express' //impoteer express en liquid package als dependenct via npm

import { Liquid } from 'liquidjs'

const app = express()

app.use(express.urlencoded({extended: true})) //maakt het werken met data uit formulieren prettiger

app.use(express.static('public')) //voor de public map voor statische bestanden zoals CSS, Javascript

const engine = new Liquid() // Liquid als view-engine instellen
app.engine('liquid', engine.express())

app.set('views', './view') //Instellen van de map met de Liquid templates


//GET routes
app.get('/', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects')
    const apiResponseJSON = await apiResponse.json // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen

    resonse.render("index.liquid", {artwork: apiResponseJSON.data}) // in liquid refereer je naar de variable waarin de data opgeslagen staat. 
})


// Route voor de homepagina in het arabisch
app.get('/ar', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects')
    const apiResponseJSON = await apiResponse.json(); 
    
    response.render("indexar.liquid", { artwork: apiResponseJSON.data }) 
  })
  
// Route voor elk specifiek object
app.get ('/object/:id', async function (request, response) {
    const artworkId = request.params.id; 
    const apiResponse = await fetch(`https://fdnd-agency.directus.app/items/fabrique_art_objects/${artworkId}?fields=title,image,summary,artist,location,displayDate,materials,techniques,objectNumber,recordType`)
    const apiResponseJSON = await apiResponse.json(); 
    
    response.render("objects.liquid", { artwork: apiResponseJSON.data })
  })


// Route voor elk specifiek object in het arabisch
app.get('/ar/object/:id', async function (request, response) {
    const artworkId = request.params.id
    const apiResponse = await fetch(`https://fdnd-agency.directus.app/items/fabrique_art_objects/${artworkId}?fields=titleAR,image,artist,displayDate,summaryAR,materials,techniques,objectNumber,objectNameAR`)
    const apiResponseJSON = await apiResponse.json() 
    
    response.render("objectar.liquid", { artwork: apiResponseJSON.data }); 
  })


// Voor de pagina
app.get('/acquisition', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects'
    );
    const apiResponseJSON = await apiResponse.json(); // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
    
    // Voor het weergeven van de opgehaalde data in op de acquisitionpagina
    const messageResponse = await fetch("https://fdnd-agency.directus.app/items/fabrique_messages/?filter={%22for%22:%20{%22_contains%22:%20%22Karima_%22}}")
    const messageResponseJSON = await messageResponse.json(); // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
  
    response.render("acquisitions.liquid", { 
      api: apiResponseJSON.data, 
      messages: messageResponseJSON.data,
      id: 'karima-form'
    });
  });
  
  
  app.get('/acquisition/ar', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects'
    );
    const apiResponseJSON = await apiResponse.json(); // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
    
    // Voor het weergeven van de opgehaalde data in op de acquisitionpagina
    const messageResponse = await fetch("https://fdnd-agency.directus.app/items/fabrique_messages/?filter={%22for%22:%20{%22_contains%22:%20%22Karima_%22}}")
    const messageResponseJSON = await messageResponse.json(); // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
  
    response.render("acquisitionar.liquid", { 
      api: apiResponseJSON.data, 
      messages: messageResponseJSON.data,
      id: 'karima-form'
    });
  });
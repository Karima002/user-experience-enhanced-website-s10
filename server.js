import express from 'express' //impoteer express en liquid package als dependenct via npm

import { Liquid } from 'liquidjs'

const app = express()

app.use(express.urlencoded({extended: true})) //maakt het werken met data uit formulieren prettiger

app.use(express.static('public')) //voor de public map voor statische bestanden zoals CSS, Javascript

const engine = new Liquid() // Liquid als view-engine instellen
app.engine('liquid', engine.express())

app.set('views', './views') //Instellen van de map met de Liquid templates


//GET routes
app.get('/en', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects')
    const apiResponseJSON = await apiResponse.json(); // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
    
    response.render("index.liquid", { 
        artwork: apiResponseJSON.data,
        lang: 'en'
    })
  })
  

// Route voor de homepagina in het arabisch
app.get('/ar', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects')
    const apiResponseJSON = await apiResponse.json(); 
    
    response.render("index-ar.liquid", { 
        artwork: apiResponseJSON.data,
        lang: 'ar'
     }) 
  })
  
// Route voor elk specifiek object
app.get ('/:lang/object/:id/', async function (request, response) {
    const artworkId = request.params.id; 
    const langId = request.params.lang;
    const apiResponse = await fetch(`https://fdnd-agency.directus.app/items/fabrique_art_objects/${artworkId}?fields=title,id,image,summary,artist,location,displayDate,materials,techniques,objectNumber,recordType,titleAR,summaryAR,objectNameAR`)
    const apiResponseJSON = await apiResponse.json() 
    
    response.render("objects.liquid", { 
        artwork: apiResponseJSON.data,
        lang: langId
        })
  })



// Voor de pagina's met het formulier
app.get('/:lang/acquisition', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects')
    const apiResponseJSON = await apiResponse.json()
    const messageResponse = await fetch("https://fdnd-agency.directus.app/items/fabrique_messages/?filter={%22for%22:%20{%22_contains%22:%20%22Karima_%22}}")
    const messageResponseJSON = await messageResponse.json(); // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
    const langId = request.params.lang; //parameter voor de language switch
    
    response.render("acquisitions.liquid", { 
      api: apiResponseJSON.data, 
      messages: messageResponseJSON.data,
      id: 'karima-form',
      lang: langId
    })
  })
  

  app.get('/:lang/succesfull', async function (request, response) {
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects')
    const apiResponseJSON = await apiResponse.json()
    const langId = request.params.lang; 

    response.render("succes.liquid", { 
      api: apiResponseJSON.data,
      lang: langId
     })
  })

//POST routes
let forms = [] //array voor het opslaan van formulieren

app.post('/acquisition', async function (request, response) {
  
    await fetch("https://fdnd-agency.directus.app/items/fabrique_messages", {
      method: "POST",
      body: JSON.stringify({ //gegevens die  naar de server wordt gestuurd, omzetten in een JSON-string.
        for: "Karima_" + request.body.name,  // De naam van de gebruiker, toegevoegd aan een vaste string "Karima_" voor het alleen weergeven van mijn posts.
        from: request.body.email,  // E-mail van de gebruiker
        text: request.body.description,  // De beschrijving die door de gebruiker is ingevoerd in het formulier
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }, //request met post, met headers geef je aan wat er is meegegeven, je geeft informatie over wat je in de request heb meegegeven. 
    });
    
    response.redirect(303, '/en/succesfull') //Na het versturen van de gegevens naar de API wordt de gebruiker doorgestuurd naar de pagina /succesfull
  
  })

  app.post('/ar/acquisition', async function (request, response) {
  
    await fetch("https://fdnd-agency.directus.app/items/fabrique_messages", {
      method: "POST",
      body: JSON.stringify({
        for: "Karima_" + request.body.name,
        from: request.body.email,
        text: request.body.description,
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }, 
    });
    
    response.redirect(303, '/ar/succesfull')
  })

  app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`http://localhost:${app.get('port')}/en`)})
  
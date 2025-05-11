
# Qatar Museums - Fabrique
Live link: https://user-experience-enhanced-website-w869.onrender.com/en


## Beschrijving

De website biedt de volgende functionaliteiten:

- Homepagina: Hier worden kunstobjecten weergegeven in een responsive column indeling.
- Detailpagina: Gebruikers kunnen doorklikken op een object om meer informatie te zien.
- Acquisitieformulier: Gebruikers kunnen nieuwe objecten aanmelden via een formulier, waarbij een POST-request wordt verstuurd naar de API.
- Switch van talen: Bezoekers kunnen de website ook in het arabisch bezoeken. Daarvoor kunnen ze op العربية klikken op de navigatie.


## Ontwerpkeuzes
### Tweetalige navigatie (Engels & Arabisch)
Vanuit de navigatie kan je switchen van een Engelse site naar een Arabische site. Vanuit daar kan je kiezen voor een artobject. De informatie van het object wordt in het arabisch opgehaald vanuit de database. Als er geen informatie beschikbaar wordt een default tekst weergegeven. Vanuit het artobject kan je ervoor kiezen een formulier in te vullen. Dit formulier kan in het arabisch worden ingevuld indien de bezoeker een artobject wil verkopen of verdere informatie heeft over een bepaald artobject. 

https://github.com/user-attachments/assets/90280bf1-6786-4f80-a449-7f843229c8b3

Een verandering die ik heb doorgevoerd is om de taalswitch via de backend te doen. De juiste taalversie van de content wordt op basis van de URL geladen (bijvoorbeeld /en/object/:id/ of /ar/object/:id/). Hierdoor wordt de code overzichtelijker. 

De Express-route vangt het :lang-deel van de URL op en geeft het door aan de parameter in de URL. In de Liquid-template wordt vervolgens bepaald welke vertalingen getoond worden:

``` LIQUID.JS
{% if lang == 'en' %}
  <h1>{{ artwork.title }}</h1>
  <p>{{ artwork.summary }}</p>
{% elsif lang == 'ar' %}
  <h1>{{ artwork.titleAR }}</h1>
  <p>{{ artwork.summaryAR }}</p>
{% else %}
  <p>Language not supported</p>
{% endif %}
```


### Instant response
Conform de huisstijl van de opdrachtgever heb ik een ease-in op de buttons toevoegen. Je ziet een lichte ease-in bij het hoveren over de button:

https://github.com/user-attachments/assets/6c9b7685-bbf7-45ae-9173-30d042191adc



### View-transition
Tussen het navigeren van de homepagina en detailpagina is een view-transition toegepast.

https://github.com/user-attachments/assets/24d020e5-d820-49a7-be4e-2a5b7376140c


### Loading State
Voordat het formulier wordt verzonden krijg je een loading state te zien. De opacity van de button wordt verlaagd en er komt een zandloper emoji tevoorschijn. De loading state is gecodeerd met behulp van javascript en CSS.

https://github.com/user-attachments/assets/a2d31e63-afc6-49ce-91be-2f96a40fde67


### Succes State
Na het verzenden van het acquisition formulier krijg je een “succes state”  te zien. Het is een apart scherm die ziet nadat je een formulier succesvol hebt ingevuld. Dit is belangrijk voor de gebruikerservaring (UX) omdat het geeft duidelijkheid en het bevestigd dat alles goed is gegaan. 

![image](https://github.com/user-attachments/assets/1f615669-9414-4b77-a6f7-85189ad3a813)


## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->
Het project is gebouwd met NodeJS. Om het project te kunnen gebruiken dien je eerste NodeJS te installeren. Dit doe je door het invullen van npm install in de terminal. Vul daarna npm start in om de server te starten. Via http://localhost:8000/ kan je je werk bekijken. 

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).

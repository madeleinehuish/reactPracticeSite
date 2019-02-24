### Madeleine's MTG React-Redux Website Standard Edition

https://radiant-stream-78248.herokuapp.com/

![alt picture of app](mtg.jpg "Madeleine's MTG React-Redux Website Standard Edition")

Although appearing simple, this app was built with many technologies, including react, redux to manage state (including async middlewares for api calls), react-router, higher order components, good re-rendering functionality(local state is saved in browser), css modules for styling, node/express server with routing, mongo database, passport and jwt for authorization/user signin, modern es6 syntax, and heroku build & deployment with separate client and server. It utilizes a database of many thousands of Magic the Gathering cards from the Scryfall database. I have build downloaded the data and re-processed it according to my own usage. The app in standard mode allows for easy filtering of the current sets (last 6) as well as filtering individual sets going all the way back to Magic's beginnings in the early 90s. I don't have full filtering available for the full data set yet. I'm also still working on implementing deck-building and saving options for the user accounts. Some of these features are available but you'll notice in the production app that the deckbuilding is not fully working yet.

After signing in or signing up, the app will take you to a page where you can filter through the Magic cards and sort them in many different ways. Exploring the app might reveal another fun location :)

This is a current work in progress as of late-February 2019.

(update late February: I have implemented the beginnings of the deckbuilding logic as well as added the ability to look through the older sets and filtering those sets. I am hoping to build in pagination soon so that there will be greater filtering power across the full data set of over 40k cards all at once.)

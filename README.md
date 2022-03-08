# Another todo app list :fearful: 
## Desktop
![This is an image](/assets/desktop.png)
## Mobile
![This is an image](/assets/mobile.png)
## why another one ?
### Because i was wondering how firebase works and wanted to check out how react-testing-library is different from enzyme, which benefits and cons it have ( also wanna to see how vite works ), to be honest only for studies purposes but it ended up that i'm using this as a personal todo-list too, deployed in netlify.
# How to run locally
- Download the repository using ssh/http option
- Setup a new firebase application and get your credentials on Project overview > project settings > your apps , there you'll find your firebaseConfig if sdk setup and configurations is npm.
- Go to the root folder of the cloned repository and install dependencies with npm or yarn install
- Create a .env on the root folder with the information you copied from firebase project settings and replace the values:
```
VITE_APIKEY=[your_api_key]
VITE_AUTHDOMAIN=[your_auth_domain]
VITE_PROJECTID=[your_projectid]
VITE_STORAGEBUCKET=[your_storagebucket]
VITE_MESSAGINGSENDERID=[your_messagingsenderid]
VITE_APPID=[your_app_id]
```
- After that you're just need to run yarn dev to start the local server.

# How to deploy it
### i'd recommend you to deploy this using netlify, but there are another options, [please follow this link](https://vitejs.dev/guide/static-deploy.html#netlify).

# References links
- https://vitejs.dev/
- https://vitejs.dev/guide/comparisons.html
- https://firebase.google.com/
- https://testing-library.com/docs/react-testing-library/intro/
- https://kentcdodds.com/blog/testing-implementation-details
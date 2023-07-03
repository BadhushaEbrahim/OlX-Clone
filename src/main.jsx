import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FirebaseContext } from './Store/Context.jsx'
import Context from './Store/Context.jsx'
import { app } from './firebase/config.js'
ReactDOM.createRoot(document.getElementById('root')).render(

  <FirebaseContext.Provider value={{ firebase: app }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>

)

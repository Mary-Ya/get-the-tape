import React from "react"
import ReactDom from "react-dom"
import {
    BrowserRouter as Router
  } from "react-router-dom";

import './../node_modules/bootstrap/dist/js/bootstrap.bundle'
  
import App from "./app.tsx"
import "./app.scss";

ReactDom.render(<Router>
      <App />
  </Router>, document.getElementById('app'))
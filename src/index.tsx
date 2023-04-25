import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './interface/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let headerObj = document.getElementById('right-header') as HTMLElement
headerObj.innerHTML = (
  "Piece Theme: " + 
  "<select class=\"header-button\">" + 
    "<option class=\"menu-option\" value=\"default\">Neo</option>" +
    "<option class=\"menu-option\" value=\"default\">Default2</option>" +
    "<option class=\"menu-option\" value=\"default\">Default3</option>" +
    "<option class=\"menu-option\" value=\"default\">Default4</option>" +
    "<option class=\"menu-option\" value=\"default\">Default5</option>" +
    "<option class=\"menu-option\" value=\"default\">Default6</option>" +
    "<option class=\"menu-option\" value=\"default\">Default7</option>" +
    "<option class=\"menu-option\" value=\"default\">Default8</option>" +
    "<option class=\"menu-option\" value=\"default\">Default9</option>" +
    "<option class=\"menu-option\" value=\"default\">Default10</option>" +
  "</select>" + 
  "Board Theme: " + 
  "<select class=\"header-button\">" + 
    "<option class=\"menu-option\" value=\"default\">Brown</option>" +
    "<option class=\"menu-option\" value=\"default\">Default2</option>" +
    "<option class=\"menu-option\" value=\"default\">Default3</option>" +
    "<option class=\"menu-option\" value=\"default\">Default4</option>" +
    "<option class=\"menu-option\" value=\"default\">Default5</option>" +
    "<option class=\"menu-option\" value=\"default\">Default6</option>" +
    "<option class=\"menu-option\" value=\"default\">Default7</option>" +
    "<option class=\"menu-option\" value=\"default\">Default8</option>" +
    "<option class=\"menu-option\" value=\"default\">Default9</option>" +
    "<option class=\"menu-option\" value=\"default\">Default10</option>" +
  "</select>" + 
  "Difficulty: " + 
  "<select class=\"header-button\">" + 
    "<option class=\"menu-option\" value=\"default\">Default</option>" +
    "<option class=\"menu-option\" value=\"default\">Easier</option>" +
    "<option class=\"menu-option\" value=\"default\">Harder</option>" +
  "</select>"
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

class WebComponent extends HTMLElement {
  
  connectedCallback() {
    
    const elements = document.getElementsByTagName('react-remote-app');

    if (elements.length === 1) {

      const attributes = {};

      for (const attr of elements[0].attributes) {
        attributes[attr.name] = attr.value;
      }

      ReactDOM.createRoot(elements[0]).render(<App {...attributes}/>);

    } else {

      throw new Error('No container found');

    }

  }

}

const ELEMENT_ID = 'react-remote-app';

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}
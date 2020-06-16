import React, {useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import App from '../app';
import {Provider} from "react-redux";
import store from "@/redux/store";
// import {GlueRouter} from '@rice-glue/rice-glue'
const damaiDOM = document.getElementById('damai');
render(
    <Provider store={store}>
        <App />
    </Provider>
    , damaiDOM);

// const rootElement = (
//     <Provider store={store}>
//         <App />
//     </Provider>
// );
//
// class DamaiTicket extends HTMLElement {
//     constructor() {
//         super();
//         const href = './index.css';
//         const shadow = this.attachShadow({mode: 'open'});
//         const wrapper = document.createElement('div');
//         const link = document.createElement('link');
//         link.setAttribute('rel', 'stylesheet');
//         link.setAttribute('href', href);
//         ReactDOM.render(rootElement, wrapper)
//         shadow.appendChild(link);
//         shadow.appendChild(wrapper);
//     }
// }
// customElements.define('damai-ticket', DamaiTicket);

// GlueRouter.createRouter([{
//     dom: damaiDOM,
//     frameDOM: null,
//     hashRegex: /\/damai.*$/
// }]);

export default damaiDOM;


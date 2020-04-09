import React, { useState } from 'react';
import ReactDOM from "react-dom";
import './index.css';

// From https://reactjs.org/docs/hooks-state.html
export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const message = `You clicked ${count} times`;

  return (
    <div className="Example">
      <p className="message">{message}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

class DamaiTicket extends HTMLElement {
    constructor() {
        super();
        const href = 'https://i-film-beta.oss-cn-shanghai.aliyuncs.com/tmp/Example.css';
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', href);
        ReactDOM.render(<Example />, wrapper)
        shadow.appendChild(link);
        shadow.appendChild(wrapper);
    }
}
customElements.define('damai-ticket', DamaiTicket);


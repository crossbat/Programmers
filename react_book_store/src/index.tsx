import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "sanitize.css"

async function mountApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mock/browser');
    await worker.start();
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

mountApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

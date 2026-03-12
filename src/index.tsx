import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SciChartSurface } from 'scichart';

// Configure SciChart to load WASM from CDN
// eslint-disable-next-line react-hooks/rules-of-hooks
SciChartSurface.useWasmFromCDN();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

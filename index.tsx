import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion } from 'framer-motion';
import App from './App';
import './index.css';

const loadMotionFeatures = () => import('./components/framerFeatures').then((mod) => mod.default);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LazyMotion features={loadMotionFeatures} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>
);

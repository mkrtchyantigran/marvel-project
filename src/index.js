
import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import App from "./components/app/App.jsx";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
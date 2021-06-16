import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './styles/styles.scss'

import App from './components/app';

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);

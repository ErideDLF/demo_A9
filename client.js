/*global document, window */

import ReactDOM from 'react-dom';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';

const debugClient = debug('a9');
const dehydratedState = window.App;

window.React = ReactDOM;

window.fluxibleDebug = debug;

debugClient('rehydrating app');

app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }
    window.context = context;
    const mountNode = document.getElementById('app');

    debugClient('React Rendering');
    ReactDOM.render(
        createElementWithContext(context),
        mountNode,
        () => debugClient('React Rendered')
    );
});

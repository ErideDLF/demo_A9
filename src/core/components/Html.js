import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';

export default function Html(props) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>{props.context.getStore(ApplicationStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: props.markup}}></div>
                <script dangerouslySetInnerHTML={{__html: props.state}}></script>
                <script src={'/public/js/' + props.clientFile}></script>
                <script src="https://storage.googleapis.com/code.getmdl.io/1.0.0/material.min.js"></script>
            </body>
        </html>
    );
};

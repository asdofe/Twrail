import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { App } from '../components/App';

var router = express.Router();

/* GET home page. */
router.get('*', (req, res, next) => {
  
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }
    
    if (context.is404) {
      status = 404;
    }
  }
   res.status(status).render('index', { markup });
});

module.exports = router;

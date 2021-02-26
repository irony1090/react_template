import React from 'react'
import cheerio from 'cheerio';

export const parse = (target, key) => {

  if(!target) return '';
  
  let $ = cheerio.load(target, {
    normalizeWhitespace: true,
    xmlMode: true
  });
  return $(key).text() ? $(key).text() : '';
}



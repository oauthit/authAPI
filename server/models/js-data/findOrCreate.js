"use strict";
var debug = require('debug')('authAPI:models:js-data:findOrCreate');

function findOrCreate(id, body) {
  return new Promise((fulfil, reject) => {

    if (!id && body) {

      this.create(body)
        .then((res) => {
          debug('created:', res);
          return fulfil(res);
        }, reject);

    } else {

      this.find(id)
        .then(res => {
          debug('found by id:', res);
          return fulfil(res);
        })
        .catch(() => {
          this.create(body)
            .then(res => {
              debug('created:', body);
              return fulfil(res);
            }, reject);
        });

    }

  });
}

export {findOrCreate};

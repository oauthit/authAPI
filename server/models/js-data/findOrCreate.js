"use strict";
var debug = require('debug')('authAPI:js-data:findOrCreate');

function findOrCreate(id, body) {
  return new Promise((fulfil, reject) => {

    if (!id) {
      this.create(body)
        .then((res) => {
          debug('created:', res);
          return fulfil(res);
        })
        .catch((err) => {
          return reject(err);
        })
      ;
    }
    else {
      this.find(id)
        .then(res => {
          debug('found by id:', res);
          return fulfil(res);
        }, () => {
          this.create(body)
            .then(res => {
              debug('created:', res);
              return fulfil(res);
            })
        })
        .catch(() => {
          this.create(body)
            .then(res => {
              debug('created:', body);
              return fulfil(res);
            })
        })
      ;
    }
  });
}

export default {
  findOrCreate
}

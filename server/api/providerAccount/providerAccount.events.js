/**
 * ProviderAccount model events
 */

'use strict';

import {EventEmitter} from 'events';
var ProviderAccount = require('./providerAccount.model');
var ProviderAccountEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProviderAccountEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ProviderAccount.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProviderAccountEvents.emit(event + ':' + doc._id, doc);
    ProviderAccountEvents.emit(event, doc);
  }
}

export default ProviderAccountEvents;

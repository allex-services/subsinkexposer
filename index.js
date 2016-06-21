function createServicePack(execlib) {
  'use strict';

  return {
    service: {
      dependencies: ['allex:sinkexposer']
    },
    sinkmap: {
      dependencies: ['allex:sinkexposer']
    }
  };
}

module.exports = createServicePack;


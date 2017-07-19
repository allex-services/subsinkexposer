function createServicePack(execlib) {
  'use strict';

  return {
    service: {
      dependencies: ['allex_sinkexposerservice']
    },
    sinkmap: {
      dependencies: ['allex_sinkexposerservice']
    }
  };
}

module.exports = createServicePack;


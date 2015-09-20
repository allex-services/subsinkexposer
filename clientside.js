function createClientSide(execlib) {
  'use strict';
  var execSuite = execlib.execSuite,
  SinkExposerServicePack = execSuite.registry.get('allex_sinkexposerservice'),
  ParentServicePack = SinkExposerServicePack;

  return {
    SinkMap: require('./sinkmapcreator')(execlib, ParentServicePack)
  };
}

module.exports = createClientSide;

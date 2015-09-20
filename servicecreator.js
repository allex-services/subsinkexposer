function createSubSinkExposerService(execlib, ParentServicePack) {
  'use strict';
  var ParentService = ParentServicePack.Service;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function SubSinkExposerService(prophash) {
    ParentService.call(this, prophash);
  }
  
  ParentService.inherit(SubSinkExposerService, factoryCreator);
  
  SubSinkExposerService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };
  
  return SubSinkExposerService;
}

module.exports = createSubSinkExposerService;

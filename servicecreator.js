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
    this.parentSink = prophash.parentsink;
    this.subSinkName = prophash.subsinkname;
    ParentService.call(this, prophash);
    this.parentSinkDestroyedListener = this.parentSink.destroyed.attach(this.close.bind(this));
  }
  
  ParentService.inherit(SubSinkExposerService, factoryCreator);
  
  SubSinkExposerService.prototype.__cleanUp = function() {
    if (this.parentSinkDestroyedListener) {
      this.parentSinkDestroyedListener.destroy();
    }
    this.parentSinkDestroyedListener = null;
    this.subSinkName = null;
    this.parentSink = null;
    ParentService.prototype.__cleanUp.call(this);
  };

  SubSinkExposerService.prototype.obtainOuterSink = function () {
    this.parentSink.subConnect(this.subSinkName, {name: 'user'}, {nochannels: true}).then(
      this.setOuterSink.bind(this),
      this.close.bind(this)
    );
  };

  SubSinkExposerService.prototype.propertyHashDescriptor = {
    parentsink: {
      type: 'object'
    },
    subsinkname: {
      type: 'string'
    }
  };
  
  return SubSinkExposerService;
}

module.exports = createSubSinkExposerService;

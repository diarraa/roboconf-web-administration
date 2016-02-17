(function() {
  'use strict';

  angular
  .module('roboconf.utils')
  .service('rClient', rClient);

  rClient.$inject = ['Restangular'];
  function rClient(Restangular) {

    // Fields
    var service = {
      listApplications: listApplications,
      listApplicationTemplates: listApplicationTemplates,
      deleteApplication: deleteApplication,
      deleteApplicationTemplate: deleteApplicationTemplate,
      newApplication: newApplication,
      listTargets: listTargets,
      findTarget: findTarget,
      findTargetProperties: findTargetProperties,
      findTargetUsage: findTargetUsage,
      deleteTarget: deleteTarget,
      newTarget: newTarget,
      updateTarget: updateTarget,
      listApplicationBindings: listApplicationBindings,
      bindApplications: bindApplications,
      findTargetAssociations: findTargetAssociations,
      associateTarget: associateTarget,
      dissociateTarget: dissociateTarget,
      findPossibleTargets: findPossibleTargets
    };

    return service;

    // Functions
    function listApplications() {
      return Restangular.all('applications').getList();
    }

    function listApplicationTemplates() {
      return Restangular.all('applications/templates').getList();
    }

    function deleteApplication(appName) {
      return Restangular.one('applications/' + appName).remove();
    }

    function deleteApplicationTemplate(tplName, tplQualifier) {
      return Restangular.one('applications/templates/' + tplName + '/' + tplQualifier).remove();
    }

    function newApplication(newApp) {
      return Restangular.one('applications').post('', newApp);
    }

    function listTargets() {
      return Restangular.all('targets').getList();
    }

    function newTarget(targetContent) {
      return Restangular.one('targets').post('', targetContent);
    }

    function updateTarget(targetId, targetContent) {
      return Restangular.one('targets?target-id=' + targetId).post('', targetContent);
    }

    function findTarget(id) {
      return Restangular.one('targets/' + id + '/details').get();
    }

    function deleteTarget(id) {
      return Restangular.one('targets/' + id).remove();
    }

    function findTargetProperties(id) {
      return Restangular.one('targets/' + id).get();
    }

    function findTargetUsage(id) {
      return Restangular.all('targets/' + id + '/usage').getList();
    }

    function listApplicationBindings(appName) {
      return Restangular.one('app/' + appName + '/bind').get();
    }

    function bindApplications(appName, bTplName, bAppName) {
      return Restangular.one('app/' + appName + '/bind?bound-tpl=' + bTplName + '&bound-app=' + bAppName).post();
    }

    function findTargetAssociations(appName) {
      return Restangular.all('app/' + appName + '/targets').getList();
    }

    function findPossibleTargets(appName) {
      return Restangular.all('targets?name=' + appName).getList();
    }

    function associateTarget(appName, targetId, instPath) {
      var path = 'targets/' + targetId + '/associations?bind=true&name=' + appName;
      if (instPath) {
        path += '&instance-path=' + instPath;
      }

      return Restangular.one(path).post();
    }

    function dissociateTarget(appName, targetId, instPath) {
      var path = 'targets/' + targetId + '/associations?bind=false&name=' + appName + '&instance-path=' + instPath;
      return Restangular.one(path).post();
    }
  }
}());

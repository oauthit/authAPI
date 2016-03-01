'use strict';

(function () {

  angular.module('authApiApp.core.services')
    .factory('InitCtrlService', function ($filter, NgTableParams, SettingsService) {

      var deb = debug('debtee:InitCtrlService');

      function ngTableToV4Params(params) {

        var result = {
          'x-page-size:': params && params.count() || 12,
          'x-start-page:': params && params.page() || 1
        };

        //if (ctrl.searchText) {
        //  var searchFields = _.get(ctrl,'ngTable.searchFields') || ['*'];
        //  angular.extend(result,{
        //    'searchFor:': ctrl.searchText,
        //    'searchFields:': searchFields.join()
        //  });
        //}

        if (params && params.sorting()) {
          var sortBy = _.reduce(params.sorting(), function (res, dir, field) {
            return res + ',' + (dir === 'desc' ? '-' : '') + field;
          }, '').substr(1);
          if (sortBy) {
            result['x-order-by:'] = sortBy;
          }
        }

        return result;

      }

      function setupTable(ctrl, model) {

        var lastFindAllParams = {}, lastFindAllData = [], totalCount = 0;
        var counts = !ctrl.ngTable.noPages && (ctrl.ngTable.counts || [12, 25, 50, 100]);
        var count = ctrl.ngTable.count || 12;

        if (counts.indexOf(count)<0) {
          counts.push (count);
          counts = _.sortBy (counts);
        }

        ctrl.ngTableParams = new NgTableParams(angular.extend({
          page: 1,
          count: count
        }, ctrl.ngTable), {
          filterDelay: 0,
          dataset: lastFindAllData,
          counts: counts,
          getData: function ($defer, params) {

            var v4Params = ngTableToV4Params(params);
            var needCount = !totalCount ||
                _.get(v4Params, 'searchFor:') !== _.get(lastFindAllParams, 'searchFor:')
              ;
            var countPromise;
            var setPage;

            if (needCount) {
              countPromise = model.getCount(_.pick(v4Params, ['searchFor:', 'searchFields:'])).then(function (res) {
                deb ('countPromise',res);
                ctrl.ngTableParams.total(totalCount = res);
                if (res < (params.page() - 1) * params.count()) {
                  v4Params['x-start-page:'] = 1;
                  setPage = 1;
                }
                return v4Params;
              });
              countPromise.catch(function (res) {
                //ctrl.processServerError(res);
                deb('countPromise', 'reject', res);
                $defer.reject();
              });
            }

            var dataPromiseOrNothing = function () {
              var p = v4Params;
              if (!_.matches(p)(ctrl.lastFindAllParams) || !_.matches(ctrl.lastFindAllParams)(p)) {
                return model.findAll(p, {bypassCache: true})
                  .then(function (data) {
                    if (setPage) {
                      params.page(setPage);
                    }
                    lastFindAllParams = p;
                    lastFindAllData = data;
                    $defer.resolve(data);
                  }, function (res) {
                    deb('dataPromiseOrNothing', 'reject', res);
                    $defer.reject();
                  });
              } else {
                if (setPage) {
                  params.page(setPage);
                }
                $defer.resolve(lastFindAllData);
              }
            };

            if (countPromise) {
              ctrl.busy = countPromise.then(dataPromiseOrNothing);
            } else {
              ctrl.busy = dataPromiseOrNothing(v4Params);
            }

          }
        });

        return ctrl.ngTableParams;
      }

      function setup(ctrl) {

        return angular.extend(ctrl, {
          setupNgTable: function (model) {
            return setupTable(ctrl, model);
          }
        });

      }

      function init(ctrl, scope) {

        function setAgent(o, n) {
          var agent = n || o;
          if (!agent) {
            return;
          }

          ctrl.onSetAgent(agent);
        }

        //watchers
        //scope.$watch('ctrl.searchText', function () {
        //  if (ctrl.ngTable) {
        //    ctrl.ngTableParams.reload();
        //  }
        //});

        scope.$on('current-agent', setAgent);

        setAgent(SettingsService.getCurrentAgent());

      }

      return {
        init: init,
        setup: setup
      };

    })
  ;

}());

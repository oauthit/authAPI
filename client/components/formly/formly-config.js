'use strict';

angular.module('authApiApp').config(['formlyConfigProvider', function (formlyConfig) {
  var attributes = [
    'date-disabled',
    'custom-class',
    'show-weeks',
    'starting-day',
    'init-date',
    'min-mode',
    'max-mode',
    'format-day',
    'format-month',
    'format-year',
    'format-day-header',
    'format-day-title',
    'format-month-title',
    'year-range',
    'shortcut-propagation',
    'datepicker-popup',
    'show-button-bar',
    'current-text',
    'clear-text',
    'close-text',
    'close-on-date-selection',
    'datepicker-append-to-body'
  ];

  var bindings = [
    'datepicker-mode',
    'min-date',
    'max-date'
  ];

  var ngModelAttrs = {};

  formlyConfig.removeChromeAutoComplete = true;

  formlyConfig.templateManipulators.preWrapper.push(function (template, options) {
    if (options.type.match(/.*input/ig)) {
      return template.replace('<input', '<input autocomplete="off"');
    } else {
      return template;
    }
  });


  angular.forEach(attributes, function (attr) {
    ngModelAttrs[_.camelCase(attr)] = {attribute: attr};
  });

  angular.forEach(bindings, function (binding) {
    ngModelAttrs[_.camelCase(binding)] = {bound: binding};
  });

  formlyConfig.setWrapper({
    name: 'horizontalBootstrapLabel',
    template: [
      '<label for="{{::id}}" class="{{to.labelClass}} control-label"',
      '><span ng-attr-tooltip="{{to.tooltip}}" tooltip-placement="top"',
      '>{{to.label}}{{to.required ? " *" : ""}}</span>',
      '</label>',
      '<div class="{{to.inputClass}}">',
      '<formly-transclude></formly-transclude>',
      '</div>'
    ].join(' ')
  });


  formlyConfig.setType({
    name: 'horizontalInput',
    extends: 'input',
    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      templateOptions: {
        labelClass: 'col-sm-3',
        inputClass: 'col-sm-9'
      }
    }
  });

  formlyConfig.setType({
    name: 'horizontalMaskedInput',
    extends: 'horizontalInput',
    defaultOptions: {
      ngModelAttrs: {
        mask: {
          attribute: 'ui-mask'
        },
        'true': {
          value: 'clean'
        }
      },
      validation: {
        messages: {
          mask: '"Значение не соответствует маске"'
        }
      }
    }
  });

  formlyConfig.setType({
    name: 'horizontalText',
    extends: 'textarea',
    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      templateOptions: {
        labelClass: 'col-sm-3',
        inputClass: 'col-sm-9'
      }
    }
  });

  formlyConfig.setType({
    name: 'horizontalRadio',
    extends: 'radio',
    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      templateOptions: {
        labelClass: 'col-sm-3',
        inputClass: 'col-sm-9'
      }
    }
  });

  formlyConfig.setType({
    name: 'horizontalSelect',
    extends: 'select',
    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      templateOptions: {
        labelClass: 'col-sm-3',
        inputClass: 'col-sm-9'
      }
    }
  });

  formlyConfig.setType({
    name: 'datepicker',
    template: '<input class="form-control" ng-model="model[options.key]" is-open="to.isOpen" min-date="to.minDate" datepicker-options="to.datepickerOptions" />',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {
        addonRight: {
          class: 'glyphicon glyphicon-calendar',
          onClick: function (options, scope) {
            event.preventDefault();
            event.stopPropagation();
            scope.to.isOpen = !scope.to.isOpen;
          }
        },
        onFocus: function ($viewValue, $modelValue, scope) {
          scope.to.isOpen = !scope.to.isOpen;
        },
        datepickerOptions: {}
      }
    }
  });

  var selectTpl = function (theme) {
    return '<ui-select ng-model="model[options.key]" theme="' + theme +
      '" ng-required="{{to.required}}" ng-disabled="{{to.disabled}}" reset-search-input="false">' +
      ' <ui-select-match placeholder="{{to.placeholder}}"> {{$select.selected[to.labelProp || \'name\']}}' +
      ' </ui-select-match> <ui-select-choices group-by="to.groupBy" repeat="option[to.valueProp || \'value\']' +
      ' as option in to.options | filter: $select.search"> <div ng-bind-html="option[to.labelProp || \'name\'] ' +
      '| highlight: $select.search"></div> </ui-select-choices> </ui-select>'
      ;
  };

  formlyConfig.setType({
    name: 'ui-select',
    extends: 'select',
    template: selectTpl('select')
  });

  formlyConfig.setType({
    name: 'ui-select-select2',
    extends: 'ui-select',
    template: selectTpl('select2')
  });

  formlyConfig.setType({
    name: 'ui-select-selectize',
    extends: 'ui-select',
    template: selectTpl('selectize')
  });

  formlyConfig.templateManipulators.preWrapper.push(function (template, options) {
    if (options.data.typeahead) {
      template = template.replace('uib-typeahead="item as item for item in to.options ' +
        '| filter:$viewValue | limitTo:8"', options.data.typeahead);
    }

    if (options.data.typeaheadOnSelect) {
      template = template.replace('typeahead-on-select=""', options.data.typeaheadOnSelect);
    }

    return template;
  });

  //TODO refactor this that attrs can be passed to template
  formlyConfig.setType({
    name: 'typeahead',
    template: '<input ' +
    'type="text" ' +
    'ng-model="model[options.key]" ' +
    'typeahead-focus="" ' +
    'typeahead-on-select="" ' +
    'uib-typeahead="item as item for item in to.options | filter:$viewValue | limitTo:8" ' +
    'autocomplete="off" ' +
    'class="form-control">',
    wrapper: ['bootstrapLabel', 'bootstrapHasError']
  });

  formlyConfig.setType({
    name: 'inputWithAddon',
    template: '<div ' +
    'd-input-with-addon ' +
    'd-input-model="model[options.key]" ' +
    'd-select-model="model[to.dropdownKey]" ' +
    'd-select-options="to.options"' +
    'd-label-prop="{{to.labelProp}}" ' +
    'd-value-prop="{{to.valueProp}}">',
    wrapper: ['bootstrapLabel', 'bootstrapHasError']
  });




}]);

/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MetadataValidatorDirective: ng.IDirective = ({
  restrict: 'A',
  require: 'ngModel',
  scope: {
    format: '=gvMetadataFormat',
    ngPattern: '='
  },
  link: function (scope) {
    scope.$watch('format', function (newFormat) {
      switch (newFormat) {
        case 'numeric':
          scope.ngPattern = /^\d+(\.\d{1,2})?$/;
          break;
        case 'url':
          scope.ngPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          break;
        case 'date':
          scope.ngPattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
          break;
        case 'mail':
          scope.ngPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
          break;
      }
    })
  }
});

export default MetadataValidatorDirective;

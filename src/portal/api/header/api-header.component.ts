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
import * as _ from 'lodash';
import * as angular from 'angular';
import ApiHeaderMetadatasDialogController from './dialog/api-header.metadatas.dialog.controller';

const ApiHeaderComponent: ng.IComponentOptions = {
  bindings: {
    api: '<',
    $mdPanel: '<'
  },
  template: require('./api-header.html'),
  controller: function ($mdPanel) {

    this.$onInit = function () {
      let visibleMetadatas = _.filter(this.api.metadatas, {hidden: false});

      this.visibleMetadatas = _.map(visibleMetadatas, function (metadata: any) {
        return {name: metadata.name, value: metadata.value || metadata.defaultValue || ''};
      });
    };

    this.showMetadatas = function () {
      const position = $mdPanel.newPanelPosition().absolute().center();

      const config = {
        attachTo: angular.element(document.body),
        controller: ApiHeaderMetadatasDialogController,
        controllerAs: '$ctrl',
        template: require('./dialog/api-header.metadatas.dialog.html'),
        hasBackdrop: true,
        panelClass: 'api-metadatas-dialog',
        position: position,
        zIndex: 150,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        locals: {
          metadatas: this.visibleMetadatas
        }
      };

      $mdPanel.open(config);
    };
  }
};

export default ApiHeaderComponent;

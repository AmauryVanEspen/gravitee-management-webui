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
import NotificationService from '../../../services/notification.service';
import ApiService from '../../../services/api.service';

class ApiMetadatasController {
  private api: any;

  'ngInject';
  constructor(private NotificationService: NotificationService, private $mdDialog: angular.material.IDialogService,
              private resolvedApi, private ApiService: ApiService, private metadataFormats) {
    this.api = resolvedApi.data;
  }

  newMetadata() {
    const that = this;
    this.$mdDialog.show({
      controller: 'NewApiMetadataDialogController',
      controllerAs: '$ctrl',
      template: require('./dialog/save.api.metadata.dialog.html'),
      locals: {
        api: this.api,
        metadataFormats: this.metadataFormats
      }
    }).then(function (savedMetadata) {
      that.api.metadatas.push(savedMetadata);
      that.NotificationService.show(`Metadata '${savedMetadata.name}' created with success`);
    });
  }

  updateMetadata(metadata) {
    const that = this;
    this.$mdDialog.show({
      controller: 'UpdateApiMetadataDialogController',
      controllerAs: '$ctrl',
      template: require('./dialog/save.api.metadata.dialog.html'),
      locals: {
        api: this.api,
        apiMetadata: _.clone(metadata),
        metadataFormats: this.metadataFormats
      }
    }).then(function (api) {
      that.api = api;
      that.NotificationService.show(`API's Metadata '${metadata.name}' updated with success`);
    });
  }

  deleteMetadata(metadata) {
    const that = this;
    this.$mdDialog.show({
      controller: 'DeleteApiMetadataDialogController',
      controllerAs: '$ctrl',
      template: require('./dialog/delete.api.metadata.dialog.html'),
      locals: {
        metadata: metadata
      }
    }).then(function (deleteMetadata) {
      if (deleteMetadata) {
        that.ApiService.deleteMetadata(that.api.id, metadata.id).then(function () {
          that.NotificationService.show("Metadata '" + metadata.name + "' deleted with success");
          _.remove(that.api.metadatas, metadata);
        });
      }
    });
  }
}

export default ApiMetadatasController;

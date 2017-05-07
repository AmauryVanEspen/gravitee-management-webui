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
import ApiService from '../../../../services/api.service';
function UpdateApiMetadataDialogController(ApiService: ApiService, $mdDialog: angular.material.IDialogService,
                                           apiMetadata, api, metadataFormats) {
  'ngInject';

  this.api = api;
  this.metadata = apiMetadata;
  this.metadataFormats = metadataFormats;

  this.cancel = function() {
    $mdDialog.cancel();
  };

  this.save = function() {
    const that = this;

    if (this.metadata.apiId) {
      ApiService.updateMetadata(this.api.id, this.metadata).then(function (response) {
        let savedMetadata = response.data;
        _.remove(that.api.metadatas, {id: savedMetadata.id});
        that.api.metadatas.push(savedMetadata);
        $mdDialog.hide(that.api);
      });
    } else {
      _.find<any>(this.api.metadatas, {id: this.metadata.id}).value = this.metadata.value;
      this.api.metadatas = _.filter(this.api.metadatas, 'value');
      ApiService.update(this.api).then(function (response) {
        $mdDialog.hide(response.data);
      });
    }
  };
}

export default UpdateApiMetadataDialogController;

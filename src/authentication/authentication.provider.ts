
import angular = require('angular');

import {oauth2AuthenticationInterceptor} from './oauth2/oauth2.authentication.interceptor';

export default class AuthenticationInterceptorProvider implements angular.IServiceProvider {

  // Provider's factory function
  public $get(
    Constants,
    localStorageService: angular.local.storage.ILocalStorageService,
    $location: angular.ILocationService,
    $q: angular.IQService,
    $window: angular.IWindowService
  ): angular.IHttpInterceptor {
    'ngInject';

    let authType = Constants.authentication.type || 'default';
    if (authType == 'oauth2') {
      if (Constants.authentication.oauth2.clientId === undefined) {
        throw new Error('Client id should be defined');
      }

      if (Constants.authentication.oauth2.baseUrl === undefined) {
        throw new Error('Base URL id should be defined');
      }

      $location.hash().split('&')
        .map((params: string) => params.split('=', 2))
        .forEach((paramsKeyValue: string[]) => {
          if (paramsKeyValue[0] === 'access_token' || paramsKeyValue[0] === 'token_type') {
            localStorageService.set(paramsKeyValue[0], paramsKeyValue[1]);
          }
        });

      return oauth2AuthenticationInterceptor(
        Constants.authentication.oauth2.baseUrl,
        Constants.authentication.oauth2.clientId,
        Constants.authentication.oauth2.responseType,
        Constants.authentication.oauth2.scope,
        $location,
        localStorageService,
        $q,
        $window
      );
    }

    return null;
  }
}

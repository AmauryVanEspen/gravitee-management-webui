
import angular = require('angular');

export function oauth2AuthenticationInterceptor (baseUrl: string, clientId: string, responseType: string, scope: string,
                                                 $location: angular.ILocationService,
                                                 localStorageService: angular.local.storage.ILocalStorageService,
                                                 $q: angular.IQService, $window: angular.IWindowService): angular.IHttpInterceptor {

  return {

    request(config: angular.IRequestConfig): angular.IRequestConfig {
      console.log('Pouarf je suis ici');
      if (localStorageService.get('token_type') && localStorageService.get('access_token')) {
        config.headers.Authorization = `${localStorageService.get('token_type')} ${localStorageService.get('access_token')}`;
      }
      return config;
    },

    responseError(rejection: any): any {
      if (rejection.status === 401) {
        $window.location.href = `${baseUrl}/as/authorization.oauth2?client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent($location.absUrl())}&scope=${scope}`;
      }
      return $q.reject(rejection);
    }
  };
}

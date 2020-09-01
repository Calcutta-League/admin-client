import Axios, { CancelToken } from 'axios';

function ApiService(baseUrl) {
  this.service = Axios.create({
    baseURL: baseUrl
  });
  this.endpoints = [];

  this.newEndpoint = function(name, ref) {
    for (var endpoint of this.endpoints) {
      if (endpoint.name === name) {
        // console.log('endpoint already exists');
        return;
      }
    }

    this.endpoints.push({
      name: name,
      func: ref
    });
  }

  this.removeEndpoint = function(name) {
    for (var i in this.endpoints) {
      if (this.endpoints[i].name === name) {
        this.endpoints.splice(i, 1);
      }
    }
  }

  this.callApi = function(name, params) {
    let func = this.endpoints.find(endpoint => endpoint.name === name).func

    return new Promise((resolve, reject) => {
      func(this.service, params).then(data => {
        resolve(data);
      });
      /** @todo add error handling */
    });
  }
}

export default ApiService;
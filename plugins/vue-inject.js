import Vue from 'vue'
//vue注入
Vue.prototype.$myInjectedFunction = (string) => console.log("This is an example", string)
Vue.prototype.$loadImageAsync = (url) => {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    image.src = url;
  });
}

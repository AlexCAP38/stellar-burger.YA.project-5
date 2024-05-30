import { defineConfig } from "cypress";

export default defineConfig({
  e2e:

  //Обазательно добавить либо переходы будут вываливаться с ошибками
  {
    baseUrl: 'http://localhost:4000',
    //пошире экран сделал  
    viewportWidth: 1280,
    viewportHeight: 1024,
  },

  setupNodeEvents(on, config) {
    // implement node event listeners here
  },

});

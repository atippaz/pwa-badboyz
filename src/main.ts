/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion";
// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
app.use(MotionPlugin);
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('./service-worker.js').then((registration) => {
//             console.log('Service Worker registered with scope:', registration.scope);
//         });
//     });
// }
try {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      console.log(window.location.origin);
      navigator.serviceWorker
        .register(`${window.location.origin}/service-worker.js`)
        .then(
          function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("ServiceWorker registration failed: ", err);
            throw new err();
          }
        );
    });
  }
} catch (ex) {
  console.log(ex);
}
// const registerServiceWorker = async () => {
//   if ("serviceWorker" in navigator) {
//     try {
//       const registration = await navigator.serviceWorker.register(
//         "./service-worker.js"
//       );
//       if (registration.installing) {
//         console.log("Service worker installing");
//       } else if (registration.waiting) {
//         console.log("Service worker installed");
//       } else if (registration.active) {
//         console.log("Service worker active");
//       }
//     } catch (error) {
//       console.error(`Registration failed with ${error}`);
//     }
//   }
// };
// registerServiceWorker()
registerPlugins(app);

app.mount("#app");

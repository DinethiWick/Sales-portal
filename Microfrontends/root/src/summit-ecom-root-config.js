import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@summit-ecom/login",
  app: () => System.import("@summit-ecom/login"),
  activeWhen: (location) => location.pathname === "/",
});

registerApplication({
  name: "@summit-ecom/product",
  app: () => System.import("@summit-ecom/product"),
  activeWhen: ["/home"]
});

start();

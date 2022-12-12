(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["apiUrl"] =
    "https://portalbackend.sandbox.knowledge4retail.org";
  window["env"]["auth_issuer"] =
    "https://auth.sandbox.knowledge4retail.org/auth/realms/k4r";
  window["env"]["auth_clientId"] = "k4r-test";
  window["env"]["storevizUrl"] = "https://storeviz.sandbox.knowledge4retail.org/?store=";
})(this);

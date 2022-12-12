(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["apiUrl"] = "${API_URL}";
  window["env"]["auth_issuer"] = "${AUTH_ISSUER}";
  window["env"]["auth_clientId"] = "${AUTH_CLIENTID}";
  window["env"]["storevizUrl"] = "${STOREVIZURL}";
})(this);

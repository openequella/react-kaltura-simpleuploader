import { render, kalturaSaasEndpoint } from "../dist";
import config from "./config";
import "../dist/styles.css"

const callback = (entries) => {
  console.log("Callback was called with the following entries:");
  console.log(entries);
  document.getElementById("root").textContent = "Process complete, see console log!";
};

render(
  document.getElementById("root"),
  kalturaSaasEndpoint,
  config.ks,
  config.partnerId,
  callback
);

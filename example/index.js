import { render, kalturaSaasEndpoint } from "../dist";
import config from "./config";

render(
  document.getElementById("root"),
  kalturaSaasEndpoint,
  config.ks,
  config.partnerId
);

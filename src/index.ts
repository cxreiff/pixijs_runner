import { Cartridges } from "./cartridges";
import { Manager } from "./shared/static/manager";

import "./index.scss";

Manager.initialize(
  document.querySelector("canvas"),
  800,
  Cartridges["asteroids"]
);

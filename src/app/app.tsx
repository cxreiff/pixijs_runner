import { FC } from "react";

import * as styles from "./app.module.scss";

export const App: FC = () => (
  <div className={styles.hello_world}>
    <h1>Hello World!</h1>
  </div>
);

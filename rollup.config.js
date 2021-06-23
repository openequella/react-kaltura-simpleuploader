import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import css from "rollup-plugin-css-only";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [typescript(), css({output: "styles.css"})],
  external: [
    "react",
    "react-dom",
    "react-error-boundary",
    "kaltura-typescript-client",
    "kaltura-typescript-client/api/types",
    "lodash",
  ],
};

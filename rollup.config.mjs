import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    external: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@types/react",
      "react-dom",
    ],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      peerDepsExternal(),
      terser(),
    ],
  },
  {
    input: "bin/esm/types/index.d.ts",
    output: [{ file: "bin/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];

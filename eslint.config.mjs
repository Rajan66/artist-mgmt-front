import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { plugins: ["@next/next"] },
});

const eslintConfig = [
  ...compat.extends("eslint-config-next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];

export default eslintConfig;

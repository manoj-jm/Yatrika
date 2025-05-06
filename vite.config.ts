import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Configures the SSR (Server-Side Rendering) settings for the application.
 * The `noExternal` property specifies a list of dependencies that should not be treated as external
 * during the SSR build process. In this case, the `@syncfusion` package is included, ensuring that
 * it is bundled with the server-side code instead of being excluded as an external dependency.
 */
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr:{
    noExternal: [/@syncfusion/]
  }
});

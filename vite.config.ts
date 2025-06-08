import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Configures the SSR (Server-Side Rendering) settings for the application.
 * The `noExternal` property specifies a list of dependencies that should not be treated as external
 * during the SSR build process. In this case, the `@syncfusion` package is included, ensuring that
 * it is bundled with the server-side code instead of being excluded as an external dependency.
 */

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-oh",
  project: "travel-agency-app",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};

export default defineConfig(config => {
  return {
    plugins: [tailwindcss(), tsconfigPaths(), reactRouter(), sentryReactRouter(sentryConfig, config)],
    sentryConfig,
    ssr: {
      noExternal: [/@syncfusion/]
    }
  };
});
 


 
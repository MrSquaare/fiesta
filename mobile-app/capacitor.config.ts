import { CapacitorConfig } from "@capacitor/cli";

const isDev = process.env.NODE_ENV === "development";

const config: CapacitorConfig = {
  appId: "app.fiesta",
  appName: "Fiesta",
  webDir: "dist",
  bundledWebRuntime: false,
  server: isDev
    ? {
        cleartext: true,
        url: "http://localhost:1421",
      }
    : undefined,
};

export default config;

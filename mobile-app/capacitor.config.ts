import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.fiesta",
  appName: "fiesta",
  webDir: "dist",
  bundledWebRuntime: false,
  server:
    process.env.NODE_ENV === "development"
      ? {
          cleartext: true,
          url: "http://localhost:1421",
        }
      : undefined,
};

export default config;

import { MobileProject, MobileProjectConfig } from "@trapezedev/project";

const packageJson = require("./package.json");

const config: MobileProjectConfig = {
  projectRoot: "./",
  android: {
    path: "android",
  },
  ios: {
    path: "ios/App",
  },
};

const main = async () => {
  console.log("Configuring Android and iOS projects...");

  const project = new MobileProject("./", config);
  await project.load();

  await project.android?.setVersionName(packageJson.version);
  await project.ios?.setVersion("App", "Debug", packageJson.version);
  await project.ios?.setVersion("App", "Release", packageJson.version);

  await project.commit();

  console.log("Successfully configured Android and iOS projects.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

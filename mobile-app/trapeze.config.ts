import { MobileProject, MobileProjectConfig } from "@trapezedev/project";

import capacitorConfig from "./capacitor.config";

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

  await project.android?.setPackageName(capacitorConfig.appId!);
  await project.android?.setVersionName(packageJson.version);
  const xmlFile = project.android?.getResourceXmlFile("values/strings.xml");
  await xmlFile?.load();
  xmlFile?.replaceFragment(
    'resources/string[@name="app_name"]',
    `<string name="app_name">${capacitorConfig.appName!}</string>`
  );
  xmlFile?.replaceFragment(
    'resources/string[@name="title_activity_main"]',
    `<string name="title_activity_main">${capacitorConfig.appName!}</string>`
  );
  xmlFile?.replaceFragment(
    'resources/string[@name="package_name"]',
    `<string name="package_name">${capacitorConfig.appId!}</string>`
  );
  xmlFile?.replaceFragment(
    'resources/string[@name="custom_url_scheme"]',
    `<string name="custom_url_scheme">${capacitorConfig.appId!}</string>`
  );
  await project.ios?.setDisplayName("App", "Debug", capacitorConfig.appName!);
  await project.ios?.setBundleId("App", "Debug", capacitorConfig.appId!);
  await project.ios?.setVersion("App", "Debug", packageJson.version);
  await project.ios?.setDisplayName("App", "Release", capacitorConfig.appName!);
  await project.ios?.setBundleId("App", "Release", capacitorConfig.appId!);
  await project.ios?.setVersion("App", "Release", packageJson.version);

  await project.commit();

  console.log("Successfully configured Android and iOS projects.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

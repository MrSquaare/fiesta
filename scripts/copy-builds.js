const fs = require("fs");
const path = require("path");

const fg = require("fast-glob");
const yargs = require("yargs");

const config = {
  linux: {
    projectPath: "./desktop-app",
    srcBuildPath: "./src-tauri/target/release/bundle",
    destBuildPath: "./builds",
    ext: ["deb", "AppImage"],
    replace: (packageJson) => {
      return {
        [`fiesta_${packageJson.version}_`]: `fiesta-${packageJson.version}-linux-`,
      };
    },
  },
  macos: {
    projectPath: "./desktop-app",
    srcBuildPath: "./src-tauri/target/release/bundle",
    destBuildPath: "./builds",
    ext: ["dmg"],
    replace: (packageJson) => {
      return {
        [`fiesta_${packageJson.version}_`]: `fiesta-${packageJson.version}-macos-`,
      };
    },
  },
  windows: {
    projectPath: "./desktop-app",
    srcBuildPath: "./src-tauri/target/release/bundle",
    destBuildPath: "./builds",
    ext: ["exe", "msi"],
    replace: (packageJson) => {
      return {
        [`fiesta_${packageJson.version}_`]: `fiesta-${packageJson.version}-windows-`,
      };
    },
  },
  android: {
    projectPath: "./mobile-app",
    srcBuildPath: "./android/app/build/outputs/apk",
    destBuildPath: "./builds",
    ext: ["apk"],
    replace: (packageJson) => {
      return {
        [`app-`]: `fiesta-${packageJson.version}-android-`,
        [`-debug`]: "",
      };
    },
  },
  ios: {
    projectPath: "./mobile-app",
    srcBuildPath: "./ios/App/build",
    destBuildPath: "./builds",
    ext: ["ipa"],
    replace: (packageJson) => {
      return {
        [`app`]: `fiesta-${packageJson.version}-ios`,
      };
    },
  },
};

const copyBuilds = (platforms) => {
  if (!platforms?.length) {
    throw new Error("No platform specified.");
  }

  for (const platform of platforms) {
    const platformConfig = config[platform];

    if (!platformConfig) {
      throw new Error(`Invalid platform: ${platform}`);
    }

    console.log(`Copying ${platform} builds...`);

    const { projectPath, srcBuildPath, destBuildPath, ext, replace } =
      platformConfig;

    const packageJson = require(path.join(projectPath, "package.json"));

    const buildPaths = fg.sync(
      ext.map((ext) => path.join(projectPath, srcBuildPath, `/**/*.${ext}`))
    );

    if (!buildPaths.length) {
      console.log(`No ${platform} builds found.`);
      continue;
    }

    fs.mkdirSync(path.join(projectPath, destBuildPath), { recursive: true });

    for (const buildPath of buildPaths) {
      const filename = path.basename(buildPath);
      const newFilename = Object.entries(replace(packageJson)).reduce(
        (acc, [key, value]) => acc.replace(RegExp(key), value),
        filename
      );
      const newBuildPath = path.join(projectPath, destBuildPath, newFilename);

      console.log(`Copying ${buildPath} to ${newBuildPath}...`);
      fs.copyFileSync(buildPath, newBuildPath);
    }

    console.log(`Copied ${platform} builds.`);
  }
};

const main = () => {
  const args = yargs(process.argv)
    .option("platforms", {
      alias: "p",
      type: "array",
      choices: Object.keys(config),
      default: Object.keys(config),
    })
    .parse();

  copyBuilds(args.platforms);
};

main();

# fiesta

Time to fiesta! A Twitter-like application.

Please see [bleeding-dev branch](https://github.com/MrSquaare/fiesta/tree/bleeding-dev) for an up-to-date version.

## Table of Contents

- [About](#about)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using](#using)
- [Contributing](#contributing)
- [License](#license)

## About

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), powered by [Turborepo](https://turborepo.org/).

It is composed of two main projects:

- the [Server](server), powered by [NestJS](https://nestjs.com/)
- the [Desktop App](desktop-app), powered by [Vite](https://vitejs.dev/) and [Tauri](https://tauri.app/)
- the [Mobile App](desktop-app), powered by [Vite](https://vitejs.dev/) and [Capacitor](https://capacitorjs.com/)

The packages common to both projects can be found in [common](common)

## Getting started

### Prerequisites

1. [Install Node.js](https://nodejs.org/en/download/)

#### Desktop

- [Instructions for Linux](https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-linux)
- [Instructions for macOS](https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-macos)
- [Instructions for Windows](https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-windows)

#### Mobile

- [Instructions for Android](https://capacitorjs.com/docs/getting-started/environment-setup#android-requirements)
- [Fastlane for Android (for Builds)](https://docs.fastlane.tools/getting-started/android/setup/)
- [Instructions for iOS](https://capacitorjs.com/docs/getting-started/environment-setup#ios-requirements)
- [Fastlane for iOS (for Builds)](https://docs.fastlane.tools/getting-started/ios/setup/)

### Installation

1. Clone the repository:

```shell script
git clone https://github.com/MrSquaare/fiesta.git
```

2. Install dependencies:

```shell script
npm install
```

3. Build the project:

```shell script
npm run build
```

## Using

Start the apps and the server:

```shell script
npm run start
```

## Contributing

Bug reports, feature requests, other issues and pull requests are welcome.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Distributed under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) License.
See [LICENSE](LICENSE) for more information.

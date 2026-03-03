# WeatherZeroX CLI

WeatherZeroX CLI is a modern, terminal-based weather application built with **TypeScript** and **Node.js**, designed as a foundational engineering step toward the larger **Weather Zero Plus** ecosystem.

This project is not just a weather CLI.
It represents a deliberate architectural progression toward scalable, backend-driven systems — similar to how *Weather Zero Plus* serves as a strong entry point into the .NET ecosystem.

WeatherZeroX is the CLI-native equivalent of that philosophy.

---

## Vision

WeatherZeroX was built with long-term system design thinking:

* Clear separation of concerns
* Modular UI rendering layer
* Service abstraction for weather & geolocation
* Extensible command structure
* Data persistence support
* Terminal dashboard-style visualization

This project demonstrates backend-oriented thinking even within a CLI environment.

---

## Screenshot
![Screenshot 1](https://github.com/EnesEfeTokta/WeatherZeroXCLI/blob/main/Screenshots/Screenshot_1.png)

![Screenshot 2](https://github.com/EnesEfeTokta/WeatherZeroXCLI/blob/main/Screenshots/Screenshot_2.png)

![Screenshot 3](https://github.com/EnesEfeTokta/WeatherZeroXCLI/blob/main/Screenshots/Screenshot_3.png)

---

## Features

### Core Capabilities

* Fetch weather data by city or current location (`me`)
* Support for `today` and `tomorrow`
* Save weather results to local storage
* Filter and list saved records
* Delete records with confirmation prompt
* Structured error handling
* Clean command architecture using `commander`

---

### Terminal UI Layer

WeatherZeroX includes a custom CLI visualization system:

* ASCII Banner Rendering
* Styled Weather Card
* Wind Speed Indicator
* Spinner-based async feedback
* Color-coded metrics

This creates a lightweight terminal dashboard experience.

---

## Tech Stack

* Node.js
* TypeScript
* Commander (CLI framework)
* Ora (Async spinner)
* Chalk (Terminal styling)
* Inquirer (Interactive prompts)

Architecture follows a service-based modular structure:

```text
src/
 ├── services/
 ├── utils/
 ├── ui/
 ├── commands/
 └── index.ts
```

---

## Installation

```bash
git clone https://github.com/yourusername/weatherzerox-cli.git
cd weatherzerox-cli
npm install
```

### Run Locally

```bash
npx ts-node src/index.ts get --city Erzurum --date today --save
```

---

## CLI Usage

### Get Weather

```bash
weatherzerox get --city London --date today
weatherzerox get --city me --date tomorrow --save
```

#### Options

| Option | Description          |
| ------ | -------------------- |
| --city | City name or `"me"`  |
| --date | `today` | `tomorrow` |
| --save | Save result locally  |

---

### List Saved Records

```bash
weatherzerox list --city London --temp-min 5 --temp-max 20
```

#### Filter Options

* `--city`
* `--date-min`
* `--date-max`
* `--temp-min`
* `--temp-max`
* `--wind-min`
* `--wind-max`

---

### Delete Records

```bash
weatherzerox delete --city London
```

Includes interactive confirmation.

---

## Architectural Intent

WeatherZeroX is intentionally structured to mirror scalable backend practices:

* Service isolation (Weather & Location APIs)
* Dedicated UI layer (terminal rendering)
* Storage abstraction
* Error boundary handling
* Clear orchestration flow

It serves as a stepping stone toward:

* .NET-based backend systems
* Clean architecture principles
* API-first platform design
* Future SaaS weather services
* Cloud-native deployments

---

## Roadmap

Planned improvements:

* Multi-bar live dashboard mode
* Watch mode (`--watch 5s`)
* JSON export support
* REST API wrapper (Node or .NET)
* Docker containerization
* NPM global publish
* Migration blueprint to ASP.NET Core

---

## Strategic Context

WeatherZeroX is conceptually aligned with **Weather Zero Plus**.

Where Weather Zero Plus represents a structured entry into the .NET backend ecosystem,
WeatherZeroX represents a terminal-native system that reinforces:

* Backend-first thinking
* Clean code discipline
* Scalable architecture design
* Real-world CLI engineering

This is not just a utility tool.
It is a systems-thinking exercise.

---

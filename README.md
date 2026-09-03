# Mephisto Hub

![Deploy Hub](https://github.com/MacheroKiller/mephisto-hub/actions/workflows/deploy-hub.yml/badge.svg)
![Deploy TeamFlow](https://github.com/MacheroKiller/mephisto-hub/actions/workflows/deploy-teamflow.yml/badge.svg)

Personal developer ecosystem: an Nx monorepo hosting a central portfolio/hub application and its satellite projects, all built on shared Angular libraries and self-hosted end-to-end.

The Hub itself doubles as a project registry — it reads a catalog served by [`mephisto-hub-backend`](https://github.com/MacheroKiller/mephisto-hub-backend) and renders it as an entry point that links out to each satellite project (currently [TeamFlow](https://teamflow.amuryllis.com)).

> **Status: active development.** The Hub app and the design system libraries are functional; TeamFlow is the first satellite integrated into the registry and is itself still evolving.

## What's in this repo

This monorepo contains the **Angular frontend** for the whole ecosystem — the Hub and every satellite app share it, along with a common design system. Backends are intentionally kept in separate repositories (Java/Maven doesn't benefit from living alongside a TypeScript monorepo, and it keeps each service's CI pipeline independent):

| Component                 | Repo                                                                            | Description                                                         | CI/CD                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Hub + satellite frontends | _(this repo)_                                                                   | Nx monorepo — Angular apps + shared libs                            | See badges above                                                                                        |
| Hub backend               | [`mephisto-hub-backend`](https://github.com/MacheroKiller/mephisto-hub-backend) | Spring Boot — serves the project registry/catalog                   | ![Deploy](https://github.com/MacheroKiller/mephisto-hub-backend/actions/workflows/deploy.yml/badge.svg) |
| TeamFlow backend          | [`teamflow-backend`](https://github.com/MacheroKiller/teamflow-backend)         | Spring Boot — TeamFlow's own domain (workspaces, projects, stories) | ![Deploy](https://github.com/MacheroKiller/teamflow-backend/actions/workflows/deploy.yml/badge.svg)     |

## Apps

```
apps/
├── hub/          # The portfolio/entry point — reads the project registry and links to each satellite
└── teamflow/     # Sprint/project management app, in development
```

## Shared libraries

```
libs/
└── design-system/
    ├── tokens/    # Colors, typography, spacing — shared design tokens
    └── ui/        # Reusable, styled Angular components consumed across apps
```

Every satellite app is expected to consume `design-system` rather than reimplementing its own UI primitives — that consistency is the actual point of using a monorepo here.

## Tech stack

- **Angular** (standalone components, Signal Forms) + **Angular Material** with a custom M3 theme
- **Nx** for monorepo tooling and task orchestration
- **Bun** as package manager
- Backends: **Spring Boot** / **Java 21**, **PostgreSQL**, **Flyway** migrations, **JWT** auth
- **Docker** for containerized deployment

## Infrastructure

Self-hosted end-to-end on a personal Raspberry Pi 5 server:

- **Cloudflare Tunnel** for public access without exposing ports directly
- **Tailscale** for private SSH/CI access to the server
- **GitHub Actions** for CI/CD, deploying each project independently
- **Prometheus + Grafana + Loki** for observability across all services

| App      | URL                            |
| -------- | ------------------------------ |
| Hub      | https://hub.amuryllis.com      |
| TeamFlow | https://teamflow.amuryllis.com |

## Development

```bash
bun install
npx nx serve hub        # runs the Hub locally
npx nx serve teamflow    # runs TeamFlow locally
```

```bash
npx nx build hub         # production build
npx nx graph              # visualize the project/dependency graph
```

## Roadmap

- [ ] Additional satellite projects beyond TeamFlow
- [ ] Expand the design system's component coverage as new apps surface new UI needs
- [ ] Screenshots/architecture diagram in the project registry manifests

## License

MIT — see [LICENSE](LICENSE).

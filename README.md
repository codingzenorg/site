# codingzen site

Static site for `codingzen.org`. This repository contains the shell of the site, the homepage assets, and the deployment workflow that publishes the built output to GitHub Pages.

## What lives here

- `src/`: the Vite entrypoint for the site shell
- `images/`: shared site assets
- `apps/`: embedded app wrappers that get copied into the published build
- `apps/shesha/`: the Shesha entry point staged during deployment
- `apps/first-fire/`: the First Fire entry point staged during deployment

## Shesha

`shesha` is developed in its own repository at `codingzenorg/shesha`. The site workflow checks out that repo, builds it, stages the generated output into `apps/shesha`, and then builds this site for deployment.

The staged wrapper keeps the site navigation around the generated Shesha bundle. If you change Shesha, push that repo first, then run the `Deploy site` workflow here or push a change to `main`.

If `codingzenorg/shesha` is private, add a `SHESHA_REPO_TOKEN` repository secret here with read access to that repo.

`first-fire` is developed in its own repository at `codingzenorg/first-fire`. The site workflow checks out that repo, builds it, stages the generated output into `apps/first-fire`, and then builds this site for deployment.

If `codingzenorg/first-fire` is private, add a `FIRST_FIRE_REPO_TOKEN` repository secret here with read access to that repo.

## Local development

```bash
npm install
npm run dev
```

Build the site with:

```bash
npm run build
```

## Deployment

This repo deploys through GitHub Actions on `main`. The workflow builds Shesha and First Fire, stages them into `apps/shesha` and `apps/first-fire`, builds the site, and publishes the final `dist/` artifact to GitHub Pages.

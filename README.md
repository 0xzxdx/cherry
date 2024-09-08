# Cherry Translate - AI-Powered Translation Tool

**Cherry Translate** is an AI-powered translation tool offering fast and accurate translations across multiple languages.

## Development

Set vars

```sh
$ vim .env
OPENAI_BASE_URL="https://models.inference.ai.azure.com" # Please set to your OpenAI Base URL
OPENAI_API_KEY="" # Please set to your OpenAI API Key
```

Run the dev server:

```sh
npm run dev
```

## Deployment For Docker compose

```bash
$ mkdir ~/deploy/cherry
$ cd ~/deploy/cherry
$ vim docker-compose.yml
services:

  cherry:
    image: ghcr.io/0xzxdx/cherry:latest
    container_name: cherry
    restart: always
    network_mode: host
    environment:
      OPENAI_BASE_URL: "https://models.inference.ai.azure.com" # Please set to your OpenAI Base URL
      OPENAI_API_KEY: "" # Please set to your OpenAI API Key
$ docker compose up -d
$ docker compose logs -f
```

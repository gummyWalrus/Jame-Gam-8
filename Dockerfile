FROM python:latest

ENV SRC_DIR /usr/bin/src/game

COPY game/assets ${SRC_DIR}/assets
COPY game/node_modules ${SRC_DIR}/node_modules
COPY game/index.html ${SRC_DIR}/index.html

WORKDIR ${SRC_DIR}

CMD ["python", "-m", "http.server", "4242"]
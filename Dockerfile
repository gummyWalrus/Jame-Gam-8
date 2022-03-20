FROM python:latest

ENV SRC_DIR /usr/bin/src/game

COPY . ${SRC_DIR}

WORKDIR ${SRC_DIR}

CMD ["python", "-m", "http.server", "4242"]
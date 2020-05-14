#!/usr/bin/env bash

docker login --username $DOCKER_USER --password $DOCKER_PASS
docker push sapfir0/web-premier-eye:client
docker push sapfir0/web-premier-eye:server


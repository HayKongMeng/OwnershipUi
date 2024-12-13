#!/bin/bash

IMAGE_NAME="ownership-image"
CONTAINER_NAME="ownership-container"

cleanup() {
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        echo "Removing existing container..."
        docker rm -f $CONTAINER_NAME
    fi

    if [ "$(docker images -q $IMAGE_NAME)" ]; then
        echo "Removing existing image..."
        docker rmi $IMAGE_NAME
    fi
}

build_image() {
    echo "Building Docker image..."
    docker build -t $IMAGE_NAME .
}

run_container() {
    echo "Running Docker container..."
    docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
    echo "Container is running! Access your app at http://165.22.99.91:3000"
}


case "$1" in
    cleanup)
        cleanup
        ;;
    start)
        cleanup 
        build_image
        run_container
        ;;
    *)
        echo "Usage: $0 {cleanup|start}"
        exit 1
        ;;
esac
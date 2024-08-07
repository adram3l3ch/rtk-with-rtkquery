#!/bin/sh

# Start json-server in the background
json-server --watch ./src/database/todos.json --port 3000 &

# Start the main application
exec yarn dev
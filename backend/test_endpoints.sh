#!/bin/bash

echo "Starting server..."
NODE_ENV=development node server.js > server.log 2>&1 &
SERVER_PID=$!

echo "Waiting for server to start..."
sleep 5

echo -e "\nTesting API endpoints..."

# Test base endpoint
echo -e "\n1. Testing base endpoint:"
curl http://localhost:5002

# Test creating a user
echo -e "\n\n2. Creating a new user:"
CREATE_RESPONSE=$(curl -s -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"user"}')
echo $CREATE_RESPONSE

# Extract user ID from response
USER_ID=$(echo $CREATE_RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

# Get all users
echo -e "\n\n3. Getting all users:"
curl http://localhost:5002/api/users

# Update user
echo -e "\n\n4. Updating user:"
curl -X PATCH http://localhost:5002/api/users/$USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User"}'

# Get specific user
echo -e "\n\n5. Getting specific user:"
curl http://localhost:5002/api/users/$USER_ID

# Delete user
echo -e "\n\n6. Deleting user:"
curl -X DELETE http://localhost:5002/api/users/$USER_ID

# Cleanup
kill $SERVER_PID
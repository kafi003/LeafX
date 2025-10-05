#!/bin/bash

echo "Testing User API endpoints..."

# Test creating a new user
echo "
Creating new user:"
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"user"}'

# Get the list of users
echo "

Getting all users:"
curl http://localhost:5002/api/users

# Update a user (replace USER_ID with actual ID from previous response)
echo "

Updating user:"
curl -X PATCH http://localhost:5002/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User"}'

# Delete a user
echo "

Deleting user:"
curl -X DELETE http://localhost:5002/api/users/USER_ID

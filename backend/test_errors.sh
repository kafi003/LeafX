#!/bin/bash

echo "Testing error scenarios..."

# 1. Test invalid user creation (missing required field)
echo -e "
1. Testing invalid user creation (missing name):"
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# 2. Test duplicate email
echo -e "

2. Testing duplicate email:"
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User 1","email":"test@example.com","role":"user"}'
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User 2","email":"test@example.com","role":"user"}'

# 3. Test invalid user ID
echo -e "

3. Testing invalid user ID:"
curl http://localhost:5002/api/users/invalidid123

# 4. Test malformed JSON
echo -e "

4. Testing malformed JSON:"
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{name:"Test",' \
  

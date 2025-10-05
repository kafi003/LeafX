#!/bin/bash

echo "🚀 Starting comprehensive API tests..."

BASE_URL="http://localhost:5002"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "\n${BLUE}1. Testing User Creation and Validation${NC}"

# Test 1: Create a valid user
echo -e "\n${BLUE}1.1 Creating valid user:${NC}"
USER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "profile": {
      "bio": "Test user",
      "location": "New York"
    }
  }')
echo $USER_RESPONSE

# Extract user ID for further tests
USER_ID=$(echo $USER_RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

# Test 2: Try to create user with same email (should fail)
echo -e "\n${BLUE}1.2 Testing duplicate email:${NC}"
curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "john@example.com",
    "role": "user"
  }'

# Test 3: Create admin user
echo -e "\n${BLUE}1.3 Creating admin user:${NC}"
curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "profile": {
      "bio": "System administrator",
      "location": "San Francisco"
    }
  }'

echo -e "\n${BLUE}2. Testing Search and Filters${NC}"

# Test 4: Search users by location
echo -e "\n${BLUE}2.1 Search users in New York:${NC}"
curl -s "$BASE_URL/api/users?location=New%20York"

# Test 5: Filter by role
echo -e "\n${BLUE}2.2 Filter admin users:${NC}"
curl -s "$BASE_URL/api/users?role=admin"

# Test 6: Paginated results
echo -e "\n${BLUE}2.3 Testing pagination:${NC}"
curl -s "$BASE_URL/api/users?page=1&limit=2"

echo -e "\n${BLUE}3. Testing User Statistics${NC}"

# Test 7: Get user statistics
echo -e "\n${BLUE}3.1 Getting user statistics:${NC}"
curl -s "$BASE_URL/api/users/stats"

echo -e "\n${BLUE}4. Testing User Updates${NC}"

# Test 8: Update user profile
echo -e "\n${BLUE}4.1 Updating user profile:${NC}"
curl -s -X PATCH "$BASE_URL/api/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "bio": "Updated bio",
      "location": "Los Angeles"
    },
    "settings": {
      "notifications": true,
      "theme": "dark"
    }
  }'

# Test 9: Get updated user
echo -e "\n${BLUE}4.2 Getting updated user:${NC}"
curl -s "$BASE_URL/api/users/$USER_ID"

echo -e "\n${BLUE}5. Testing Role-Based Queries${NC}"

# Test 10: Get users by role
echo -e "\n${BLUE}5.1 Getting users by role:${NC}"
curl -s "$BASE_URL/api/users/role/admin"

echo -e "\n${BLUE}6. Testing Soft Delete${NC}"

# Test 11: Soft delete user
echo -e "\n${BLUE}6.1 Soft deleting user:${NC}"
curl -s -X DELETE "$BASE_URL/api/users/$USER_ID"

# Test 12: Verify user is inactive
echo -e "\n${BLUE}6.2 Verifying user status:${NC}"
curl -s "$BASE_URL/api/users/$USER_ID"

echo -e "\n${GREEN}✅ All tests completed!${NC}"
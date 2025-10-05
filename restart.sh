#!/bin/bash
echo "🔄 Restarting LeafX application with refreshed environment..."

echo "🛑 Stopping all node processes..."
killall node

echo "🧹 Clearing cache..."
rm -rf /Users/ramishanankafi/LeafX/frontend/node_modules/.cache

echo "📋 Checking environment variables..."
echo "REACT_APP_AUTH0_DOMAIN: ${REACT_APP_AUTH0_DOMAIN:-Not set in shell}"
echo "REACT_APP_AUTH0_CLIENT_ID: ${REACT_APP_AUTH0_CLIENT_ID:-Not set in shell}"

# Copy the current .env file to a backup
echo "💾 Backing up current .env file..."
cp /Users/ramishanankafi/LeafX/frontend/.env /Users/ramishanankafi/LeafX/frontend/.env.bak

# Create a new .env file with proper formatting
echo "📝 Creating new .env file with proper formatting..."
cat > /Users/ramishanankafi/LeafX/frontend/.env << EOL
REACT_APP_AUTH0_DOMAIN=dev-4u4coxlulj4aq8b8.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=tjlgReyxpO0ti79AIQdHWSvan83Kr8qj
REACT_APP_API_URL=http://localhost:5002
PORT=3003
EOL

echo "🚀 Starting backend server..."
cd /Users/ramishanankafi/LeafX/backend && npm start &

echo "⏳ Waiting for backend to initialize..."
sleep 3

echo "🚀 Starting frontend application..."
cd /Users/ramishanankafi/LeafX/frontend && npm start &

echo "✅ Both servers are starting up. Please wait a moment..."
echo "📊 Frontend: http://localhost:3003"
echo "🔌 Backend: http://localhost:5002"
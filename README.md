# 🌿 LeafX - Professional Environmental AI Platform

[![GitHub](https://img.shields.io/badge/GitHub-kafi003/LeafX-green)](https://github.com/kafi003/LeafX)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19+-blue)](https://reactjs.org/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-Voice%20AI-purple)](https://elevenlabs.io/)

> **Revolutionary Environmental AI Platform** combining sustainable supply chain optimization, intelligent voice chat, and eco-friendly product recommendations powered by cutting-edge AI technology.

![LeafX Banner](https://via.placeholder.com/1200x400/4ade80/ffffff?text=🌿+LeafX+Environmental+AI+Platform)

## ✨ Features

### 🎤 **Advanced Voice Chat**
- **Professional Male Voice** (Adam) with enhanced clarity and volume
- **Real-time AI Conversations** with environmental expert persona
- **ElevenLabs Pro Integration** for premium voice synthesis
- **Intelligent Response System** for sustainable product guidance

### 🌱 **Supply Chain Optimizer**
- **Document Analysis** for procurement optimization
- **Sustainable Alternatives** finder with AI recommendations
- **Environmental Impact Assessment** for business decisions
- **Cost-Effective Green Solutions** analysis

### 🔐 **Premium Authentication**
- **Glassmorphism UI Design** with modern aesthetics
- **Secure Login System** with corporate-level security
- **Protected Routes** - only home page accessible without login
- **Professional User Experience** designed for enterprises

### 🛡️ **Enterprise-Grade Backend**
- **Security Middleware** (Helmet, CORS protection)
- **Rate Limiting** for API protection
- **Compression & Optimization** for peak performance
- **Structured Logging** for monitoring and debugging
- **Graceful Shutdown** handling for production environments

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn**
- **ElevenLabs API Key** (Pro account recommended)
- **Google Gemini API Key**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kafi003/LeafX.git
   cd LeafX
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create backend/.env
   ELEVEN_API_KEY=your_elevenlabs_api_key
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5001
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 🌐 **Live Deployment**

### **🚀 Deploy to www.LeafXAI.com**

**One-Click Deployment:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kafi003/LeafX)

**Manual Deployment Steps:**
1. **Vercel Deployment**:
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Environment Variables** (Add in Vercel Dashboard):
   ```env
   ELEVEN_API_KEY=your_elevenlabs_api_key
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5001
   ```

3. **Custom Domain Setup**:
   - Purchase `LeafXAI.com` from any domain registrar
   - Add domain in Vercel project settings
   - Update DNS records as provided by Vercel
   - SSL certificate auto-generated

**Live URLs:**
- 🌍 **Production**: `https://www.LeafXAI.com` (coming soon)
- 🚧 **Staging**: `https://leafx-kafi003.vercel.app`

## 🏗️ Architecture

```
LeafX/
├── 🎯 backend/               # Enterprise Node.js/Express Server
│   ├── server.js            # Main server with security middleware
│   ├── services/            # Business logic & MCP integration
│   └── utils/               # Document parsing utilities
├── 🎨 frontend/             # Modern React Application
│   ├── src/
│   │   ├── components/      # UI Components
│   │   │   ├── AuthPage.jsx           # Premium Authentication
│   │   │   ├── FreeTierVoiceChat.jsx  # Voice Chat Interface
│   │   │   ├── SupplyChainOptimizer.jsx # Document Analysis
│   │   │   └── Marketplace.jsx        # Product Recommendations
│   │   └── App.js           # Main Application Router
├── 📊 data/                 # Sample datasets
├── 📝 samples/              # Document templates
└── 📋 README.md            # This file
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
# ElevenLabs Configuration
ELEVEN_API_KEY=sk_your_api_key_here

# Google AI Configuration  
GEMINI_API_KEY=your_gemini_api_key

# Server Configuration
PORT=5001
NODE_ENV=development
```

### Voice Settings
The application uses **Adam (Male Voice)** with optimized settings:
- **Voice ID**: `pNInz6obpgDQGcFmaJgB`
- **Stability**: 0.85 (High clarity)
- **Similarity Boost**: 0.8 (Enhanced accuracy)
- **Style**: 0.2 (Professional tone)
- **Speaker Boost**: Enabled (Louder output)

## 🎯 Usage

### 1. **Authentication**
- Navigate to the login page
- Use the premium glassmorphism interface
- Access protected features after authentication

### 2. **Voice Chat**
- Click the microphone icon
- Speak your environmental questions
- Receive expert advice with AI-powered voice responses

### 3. **Supply Chain Optimization**
- Upload procurement documents
- Get AI-powered sustainable alternatives
- Review environmental impact assessments
- Implement cost-effective green solutions

### 4. **Marketplace**
- Browse eco-friendly product recommendations
- Compare environmental benefits
- Make informed sustainable purchasing decisions

## 🛠️ Development

### Project Structure
- **Frontend**: React 19 with modern hooks and components
- **Backend**: Node.js/Express with ES6 modules
- **Voice**: ElevenLabs Pro API integration
- **AI**: Google Gemini for intelligent responses
- **Security**: Enterprise-grade middleware stack

### Key Technologies
- **Frontend**: React, React Router, Styled Components
- **Backend**: Express.js, Helmet, Compression, Rate Limiting
- **Voice AI**: ElevenLabs Pro with Adam voice model
- **Document AI**: Google Gemini for analysis
- **Security**: CORS, Helmet, Rate limiting, Input validation

### API Endpoints
- `GET /health` - Health check
- `POST /api/eleven/tts` - Text-to-speech conversion
- `POST /api/chat` - AI chat conversations
- `POST /api/mcp/upload` - Document upload
- `POST /api/mcp/alternatives` - Sustainable alternatives

## 🌍 Environmental Impact

LeafX is designed to help businesses:
- **Reduce Carbon Footprint** through intelligent supply chain optimization
- **Find Sustainable Alternatives** to traditional products
- **Make Informed Decisions** with AI-powered environmental analysis
- **Implement Green Practices** with cost-effective solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ramish Anan Kafi**
- GitHub: [@kafi003](https://github.com/kafi003)
- Project: [LeafX](https://github.com/kafi003/LeafX)

## 🙏 Acknowledgments

- **ElevenLabs** for premium voice synthesis technology
- **Google Gemini** for advanced AI capabilities
- **React Team** for the amazing frontend framework
- **Node.js Community** for robust backend solutions

---

<div align="center">

**🌿 Building a Sustainable Future with AI 🌿**

[⭐ Star this repository](https://github.com/kafi003/LeafX) if you find it helpful!

</div>
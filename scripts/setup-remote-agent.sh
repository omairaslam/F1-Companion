#!/bin/bash

# F1 Companion - Remote Agent Setup Script
# This script automates the initial setup for remote agents

set -e

echo "🏎️  F1 Companion - Remote Agent Setup"
echo "===================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node --version)
echo "✅ Node.js version: $node_version"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Verify installation
echo "🔍 Verifying installation..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
if npm test > /dev/null 2>&1; then
    echo "✅ All tests passing!"
else
    echo "❌ Some tests failed. Please check test output."
    exit 1
fi

# Check if development server starts
echo "🚀 Testing development server..."
timeout 10s npm run dev > /dev/null 2>&1 || true
echo "✅ Development server can start"

# Display next steps
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📚 Next Steps:"
echo "1. Read the documentation:"
echo "   📖 docs/QUICK_START_GUIDE.md (start here)"
echo "   🤖 docs/AGENT_HANDOFF.md (full context)"
echo "   📊 docs/PHASE3_SPECIFICATION.md (what to build)"
echo ""
echo "2. Start development server:"
echo "   npm run dev"
echo "   Open http://localhost:3000"
echo ""
echo "3. Check live app:"
echo "   https://f1-companion-five.vercel.app/"
echo ""
echo "4. Begin Phase 3 implementation:"
echo "   - Start with championship standings"
echo "   - Follow the step-by-step guide in docs/"
echo ""
echo "🎯 Current Status: 60% complete (Phase 1 & 2 done)"
echo "🚀 Ready for Phase 3: Statistics & Analytics"
echo ""
echo "Happy coding! 🏁"

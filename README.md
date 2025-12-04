# Mystery Message

A modern, anonymous messaging platform built with Next.js 15, TypeScript, and MongoDB. Users can receive anonymous messages, manage their inbox, and control message acceptance with AI-powered message suggestions.

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth.js with credential-based authentication
- 📧 **Email Verification** - Resend integration for OTP-based email verification
- 💬 **Anonymous Messaging** - Send and receive messages anonymously
- 🎯 **Message Management** - Toggle message acceptance, delete messages
- 🤖 **AI Suggestions** - Google Gemini AI integration for message suggestions
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🎨 **Modern UI** - shadcn/ui components with smooth animations
- 🔄 **Real-time Updates** - Automatic message refresh and status updates

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Animations:** tw-animate-css
- **Forms:** React Hook Form + Zod validation
- **Carousel:** Embla Carousel

### Backend
- **Runtime:** Node.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js v4
- **Email:** Resend + React Email templates
- **AI:** Google Generative AI (Gemini)
- **Password Hashing:** bcryptjs
- **API Client:** Axios

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mystery-message.git
cd mystery-message
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Resend (Email Service)
RESEND_API_KEY=your_resend_api_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure
```
├── src/
│   ├── app/
│   │   ├── (app)/              # Authenticated routes
│   │   │   ├── dashboard/      # User dashboard
│   │   │   └── page.tsx        # Home page
│   │   ├── (auth)/             # Authentication routes
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── verify/
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # NextAuth configuration
│   │   │   ├── accept-messages/
│   │   │   ├── get-messages/
│   │   │   ├── delete-message/
│   │   │   ├── send-message/
│   │   │   ├── suggest-messages/
│   │   │   └── verify-code/
│   │   ├── helpers/            # Helper functions
│   │   ├── lib/                # Utilities & configurations
│   │   ├── model/              # Mongoose models
│   │   ├── Schemas/            # Zod validation schemas
│   │   └── types/              # TypeScript type definitions
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   └── MessageCard.tsx
│   └── middleware.ts           # Route protection middleware
├── emails/                     # Email templates
└── public/                     # Static assets
```

## 🔑 Key Features Explained

### Authentication Flow
1. User signs up with username, email, and password
2. Verification code sent via email (Resend)
3. User verifies email with 6-digit OTP
4. Secure login with NextAuth.js credentials provider

### Message Management
- **Accept/Reject Messages:** Toggle to control who can send you messages
- **Message Dashboard:** View all received anonymous messages
- **Delete Messages:** Remove unwanted messages
- **Auto-refresh:** Keep inbox updated with latest messages

### AI Message Suggestions
- Powered by Google Gemini 2.5 Flash
- Generates engaging, open-ended questions
- Perfect for starting conversations
- Suitable for diverse audiences

### Security Features
- Password hashing with bcrypt
- JWT-based session management
- Protected API routes with middleware
- Email verification required for account activation
- CSRF protection via NextAuth.js

## 📝 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sign-up` | POST | Register new user |
| `/api/verify-code` | POST | Verify email OTP |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth endpoints |
| `/api/accept-messages` | GET/POST | Toggle message acceptance |
| `/api/get-messages` | GET | Fetch user messages |
| `/api/delete-message/[id]` | DELETE | Delete specific message |
| `/api/send-message` | POST | Send anonymous message |
| `/api/suggest-messages` | POST | Get AI message suggestions |
| `/api/check-username-unique` | GET | Check username availability |

## 🎨 UI Components

Built with **shadcn/ui** for consistency and accessibility:
- Button
- Card
- Form (with React Hook Form)
- Input
- Label
- Toast notifications
- Alert Dialog
- Switch
- Carousel
- Separator

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS
- Digital Ocean

## 🧪 Development Scripts
```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js (generate with `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Base URL of your application |
| `RESEND_API_KEY` | API key from Resend |
| `GEMINI_API_KEY` | Google Gemini AI API key |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@TridibeshSam31](https://github.com/TridibeshSam31)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Resend](https://resend.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Vercel](https://vercel.com/)

---

⭐ Star this repo if you found it helpful!
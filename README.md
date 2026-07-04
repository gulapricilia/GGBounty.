# GGBounty.
GG Bounty is an open-source SocialFi bounty platform built with the official Canopy TypeScript plugin. It enables users to create bounties, collaborate, build reputation, and earn Canopy token rewards through verifiable on-chain interactions.
# GG Bounty

A decentralized bounty platform built on the Canopy Network, enabling users to create, discover, and complete on-chain bounties with transparent reward distribution.

## ✨ Features

- 🔐 Connect Canopy wallet
- 📝 Create on-chain bounties
- 💰 Escrow bounty rewards
- 🔍 Browse available bounties
- 📊 Filter bounties by status
- 🏆 Sort by highest reward
- ⚡ Fast interactions through Canopy Plugin RPC
- 🌐 Responsive dark UI

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Canopy Network
- Canopy Plugin RPC
- CSS

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── public/
└── package.json
```

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/gulapricilia/GGBounty.git
cd GGBounty/frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file:

```env
VITE_CANOPY_RPC_URL=https://YOUR_CODESPACE-50002.app.github.dev
VITE_PLUGIN_RPC_URL=https://YOUR_CODESPACE-50010.app.github.dev
```

### Start Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## 📸 Screenshots

### Home

- Browse active bounties
- Filter by status
- Sort by reward

### Create Bounty

- Set title
- Add description
- Choose reward
- Select deadline
- Submit transaction on-chain

## 🔄 Workflow

1. Connect wallet
2. Create bounty
3. Deposit reward into escrow
4. Contributors submit work
5. Creator selects winner
6. Winner receives reward

## 🌍 Network

This project is configured for the **Canopy Network**.

Required services:

- Canopy RPC
- Canopy Plugin RPC

## 💡 Future Improvements

- User profiles
- Submission system
- Comment section
- Notifications
- Search by keyword
- Categories
- Reputation system
- DAO moderation
- Mobile optimization

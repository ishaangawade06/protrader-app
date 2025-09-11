# ProTrader App 📈🔒

ProTrader is a cross-platform trading assistant app (Stocks, Crypto, Forex).  
It integrates with the ProTrader backend (Flask + Firebase) to deliver **real-time signals, broker integration, and admin controls**.

---

## 🚀 Features
- 🔐 API Key Unlock (managed via Firebase & Admin Panel)
- 📊 Real-time Charts (TradingView widget integration)
- 🤖 Buy/Sell Signals with Confidence levels
- 🔔 Watchlist & Notifications
- 🏦 Broker API Integration (connect balance, deposit, withdraw)
- 👨‍💻 Admin Panel (manage users, keys, and maintenance mode)

---

## 📱 Screens
1. **Signup/Login** → Firebase Auth
2. **Home** → Locked 🔒 until API key entered → shows signals & charts
3. **Search** → Browse assets, add to watchlist, get alerts
4. **Admin** → Manage keys, users, and system status
5. **Account** → Connect brokers with API/Secret keys, manage funds

Bottom navigation bar allows switching between screens.

---

## 🛠️ Tech Stack
- **Frontend:** React Native (Expo)
- **Backend:** Flask (Python), hosted on Render
- **Database & Auth:** Firebase (Firestore + Auth)
- **Charts:** TradingView widget
- **Brokers:** API Integration (Binance, etc.)

---

## 📦 Setup Instructions

### Clone & Install
```bash
git clone https://github.com/ishaangawade06/protrader-app.git
cd protrader-app/frontend
npm install

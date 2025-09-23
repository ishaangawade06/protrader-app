// pth-app/screens/DepositWithdrawScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";

const BACKEND_URL = "https://protrader-backend-sbus.onrender.com"; // change if needed

export default function DepositWithdrawScreen({ route }) {
  const [broker, setBroker] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  // fetch transactions from backend
  const loadTransactions = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/transactions?limit=20`);
      const data = await res.json();
      if (!Array.isArray(data)) return;
      setTransactions(data);
    } catch (err) {
      console.error("Error loading tx:", err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const doDeposit = async () => {
    if (!broker || !amount) {
      return Alert.alert("Error", "Enter broker and amount");
    }
    try {
      const res = await fetch(`${BACKEND_URL}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "mobileUser", broker, amount }),
      });
      const data = await res.json();
      if (data.status === "redirect" && data.redirect_url) {
        Alert.alert("Redirect", `Please complete deposit at: ${data.redirect_url}`);
      } else {
        Alert.alert("Deposit", `Status: ${data.status}`);
      }
      loadTransactions();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const doWithdraw = async () => {
    if (!broker || !amount) {
      return Alert.alert("Error", "Enter broker and amount");
    }
    try {
      const res = await fetch(`${BACKEND_URL}/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "mobileUser", broker, amount }),
      });
      const data = await res.json();
      if (data.status === "redirect" && data.redirect_url) {
        Alert.alert("Redirect", `Please complete withdraw at: ${data.redirect_url}`);
      } else {
        Alert.alert("Withdraw", `Status: ${data.status}`);
      }
      loadTransactions();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Deposit / Withdraw</Text>

      <TextInput
        style={styles.input}
        placeholder="Broker (binance/exness/zerodha/angelone)"
        placeholderTextColor="#999"
        value={broker}
        onChangeText={setBroker}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={doDeposit}>
          <Text style={styles.btnText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={doWithdraw}>
          <Text style={styles.btnText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.txItem}>
            <Text>{item.type.toUpperCase()} {item.amount} — {item.broker}</Text>
            <Text style={{ color: "#999" }}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071127", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#e6eef8" },
  subtitle: { fontSize: 16, fontWeight: "600", marginVertical: 10, color: "#60a5fa" },
  input: {
    backgroundColor: "#0f1724",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  btn: { flex: 1, backgroundColor: "#2563eb", padding: 12, borderRadius: 8, marginHorizontal: 4 },
  btnText: { textAlign: "center", color: "#fff", fontWeight: "600" },
  txItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
});

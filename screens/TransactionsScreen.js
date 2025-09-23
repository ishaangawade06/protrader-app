// pth-app/screens/TransactionsScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const BACKEND_URL = "https://protrader-backend-sbus.onrender.com"; // adjust if needed

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  const loadTransactions = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/transactions?limit=50`);
      const data = await res.json();
      if (!Array.isArray(data)) return;
      setTransactions(data);
    } catch (err) {
      console.error("Error loading transactions:", err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const filtered = transactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.status === filter;
  });

  const renderTx = ({ item }) => (
    <View style={styles.txItem}>
      <View>
        <Text style={styles.txTitle}>
          {item.type.toUpperCase()} {item.amount} — {item.broker}
        </Text>
        <Text style={styles.txMeta}>{item.created_at}</Text>
      </View>
      <Text style={[styles.txStatus, statusColor(item.status)]}>
        {item.status.toUpperCase()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Transactions</Text>

      <View style={styles.filterRow}>
        {["all", "completed", "processing", "cancelled"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={styles.filterText}>{f.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderTx}
      />
    </View>
  );
}

const statusColor = (status) => {
  switch (status) {
    case "completed":
      return { color: "#22c55e" }; // green
    case "processing":
      return { color: "#eab308" }; // yellow
    case "cancelled":
      return { color: "#ef4444" }; // red
    default:
      return { color: "#9ca3af" }; // gray
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071127", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#e6eef8" },
  filterRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, backgroundColor: "#0f1724" },
  filterActive: { backgroundColor: "#2563eb" },
  filterText: { color: "#e6eef8", fontWeight: "600" },
  txItem: {
    backgroundColor: "#0f1724",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txTitle: { color: "#fff", fontWeight: "600" },
  txMeta: { color: "#9ca3af", fontSize: 12, marginTop: 2 },
  txStatus: { fontWeight: "700" },
});

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Account</Text>

      {/* Broker connection section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Connected Brokers</Text>
        <Text style={styles.broker}>✅ Zerodha</Text>
        <Text style={styles.broker}>✅ AngelOne</Text>
        <Text style={styles.broker}>✅ Binance</Text>
        <Text style={styles.broker}>✅ Exness</Text>
      </View>

      {/* Deposit/Withdraw navigation */}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate("DepositWithdraw")}
      >
        <Text style={styles.actionText}>💰 Deposit / Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e6eef8",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22c55e",
    marginBottom: 10,
  },
  broker: {
    color: "#e6eef8",
    marginBottom: 5,
  },
  actionBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

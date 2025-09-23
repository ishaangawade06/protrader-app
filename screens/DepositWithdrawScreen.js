import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

export default function DepositWithdrawScreen({ navigation }) {
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState(null);

  const handleTransaction = (type) => {
    if (!amount) {
      Alert.alert("Error", "Enter an amount first");
      return;
    }
    setAction(type);
    // Here we would call backend API for deposit/withdraw
    Alert.alert(
      "Processing",
      `${type} of ₹${amount} initiated. You can check status in Transactions.`
    );
    setAmount("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Deposit & Withdraw</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[styles.actionBtn, { backgroundColor: "#16a34a" }]}
        onPress={() => handleTransaction("Deposit")}
      >
        <Text style={styles.actionText}>⬆️ Deposit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionBtn, { backgroundColor: "#dc2626" }]}
        onPress={() => handleTransaction("Withdraw")}
      >
        <Text style={styles.actionText}>⬇️ Withdraw</Text>
      </TouchableOpacity>

      {/* ✅ Transactions button with navigation */}
      <TouchableOpacity
        style={styles.transactionsBtn}
        onPress={() => navigation.navigate("Transactions")}
      >
        <Text style={styles.transactionsText}>📜 View Transactions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e6eef8",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 8,
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  actionBtn: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionsBtn: {
    marginTop: 25,
    padding: 12,
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  transactionsText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});

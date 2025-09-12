import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithCredential 
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as LocalAuthentication from "expo-local-authentication";

WebBrowser.maybeCompleteAuthSession();

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC-Vt0JpfAMj9uTdZHXY9t2FvB4lQ_vvE",
  authDomain: "protraderhack-d67f0.firebaseapp.com",
  projectId: "protraderhack-d67f0",
  storageBucket: "protraderhack-d67f0.appspot.com",
  messagingSenderId: "1062485216321",
  appId: "1:1062485216321:web:f34bb52a8acc0a75b24ac0"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // 🔹 Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  // 🔹 Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Signup successful!");
    } catch (error) {
      Alert.alert("❌ Error", error.message);
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Login successful!");
    } catch (error) {
      Alert.alert("❌ Error", error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // 🔹 Biometric Authentication
  const handleBiometricLogin = async () => {
    try {
      const isHardwareAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isHardwareAvailable) {
        Alert.alert("⚠️ Biometric login not supported on this device.");
        return;
      }

      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        Alert.alert("⚠️ No fingerprints/FaceID found. Please set up biometrics.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Fingerprint / FaceID",
        fallbackLabel: "Enter password",
      });

      if (result.success) {
        Alert.alert("✅ Biometric authentication successful!");
        // Auto login (for demo, replace with actual logic)
        if (email && password) {
          await signInWithEmailAndPassword(auth, email, password);
        }
      } else {
        Alert.alert("❌ Authentication failed.");
      }
    } catch (error) {
      Alert.alert("❌ Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>👋 Welcome, {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text style={styles.title}>🔒 ProTraderHack Login</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
          <View style={{ margin: 10 }} />
          <Button title="Signup" onPress={handleSignup} />
          <View style={{ margin: 10 }} />
          <Button
            title="Continue with Google"
            disabled={!request}
            onPress={() => promptAsync()}
          />
          <View style={{ margin: 10 }} />
          {Platform.OS !== "web" && (
            <Button title="Login with Fingerprint / FaceID" onPress={handleBiometricLogin} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

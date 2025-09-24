import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import AdminScreen from "./screens/AdminScreen";
import AccountScreen from "./screens/AccountScreen";
import DepositWithdrawScreen from "./screens/DepositWithdrawScreen";
import TransactionsScreen from "./screens/TransactionsScreen"; // ✅ Added

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#0b1220" },
        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "#aaa",
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Admin") iconName = "settings";
          else if (route.name === "Account") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// Main App Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Bottom Tabs */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        {/* Deposit/Withdraw Screen */}
        <Stack.Screen
          name="DepositWithdraw"
          component={DepositWithdrawScreen}
          options={{
            title: "Deposit & Withdraw",
            headerStyle: { backgroundColor: "#0b1220" },
            headerTintColor: "#fff",
          }}
        />
        {/* ✅ Transactions Screen */}
        <Stack.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={{
            title: "Transactions",
            headerStyle: { backgroundColor: "#0b1220" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
        }

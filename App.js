import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// Importamos el modulo que nos permite trabajar en pantallas.
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Importamos los componentes creados
import UserList from "./Screens/UserList";
import CreateUserScreen from "./Screens/CreateUserScreen";
import UserDetailScreen from "./Screens/UserDetailScreen";

// Funcion que tendra las multiples pantallas
function MyStack() {
  return (
    // El orden en el que se coloquen determinara el orden en el que se presenta "renderizar" al usuario
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{ title: "Listado de usuario" }} />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ title: "Registro de Usuario" }} />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: "Detalles" }} />
    </Stack.Navigator>
    // Orden
    // 1. UserListScreen
    // 2. CreateUserScreen
    // 3. UserDetailScreen
  );
}

export default function App() {
  return (
    // Invocamos al contenedor que tendra nuestras pantallas
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

// Apartado de Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

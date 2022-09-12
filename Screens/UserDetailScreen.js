import React, { useState, useEffect } from "react";

// Importando la base de datos - Si agregamos esto la aplicacion movil peta xD
import firebase, { db } from "../database/firebase";

// Invocando componentes de react
import { Alert, ActivityIndicator, View, Button, TextInput, ScrollView, StyleSheet } from "react-native";

const UserDetailScreen = (props) => {

  const InitialState = {
    Nombre:     "",
    Sexo:       "",
    Cif:        "",
    Correo:     "",
    Telefono:   "",
  };

  // Invocamos un estado para guardar el contenido de los inputs
  const [user, setUser] = useState();

  // Establecemos un loading p1.
  const [loading, setLoading] = useState(true);

  // Obteniendo el usuario apartir del id
  const getUserById = async (id) => { 
    const dbRef = firebase.db.collection("/uxpresstransport/usuario/sub-usuario/").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    // Establecemos un loading p2.
    setLoading(false);
  }; // Cierre de getUserId

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []); // Cierre de useEffect

  const handleChangeText = (item, value) => {
    setUser({ ...user, [item]: value });
  };

  // Eliminar Usuario
  const deleteUser = async () => {
    const dbRef = firebase.db.collection("/uxpresstransport/usuario/sub-usuario/").doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("UserList");
  };

  // Actualizar Usuario
  const updateUser = async () => {
    const dbRef = firebase.db.collection("/uxpresstransport/usuario/sub-usuario/").doc(user.id);
    await dbRef.set({
      Nombre:   user.Nombre,
      Sexo:     user.Sexo,
      Cif:      user.Cif,
      Correo:   user.Correo,
      Telefono: user.Telefono,
      Fecha_De_Creacion: new Date(),
    });
    setUser(InitialState);
    props.navigation.navigate("UserList");
  };

  // Alerta de confirmacion de actividad
  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Esta seguro de querer eliminar esta cuenta?",
      [
        { text: "Si", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log(false) },
      ]
    );
  };

  // Establecemos un loading p3.
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={"#9e9e9e"} />
      </View>
    );
  }

  // Formulario de modificacion de usuario
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          value={user.Nombre}
          onChangeText={(value) => handleChangeText("Nombre", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Sexo: M, F, O"
          value={user.Sexo}
          onChangeText={(value) => handleChangeText("Sexo", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Cif"
          value={user.Cif}
          onChangeText={(value) => handleChangeText("Cif", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Correo"
          value={user.Correo}
          onChangeText={(value) => handleChangeText("Correo", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefono"
          value={user.Telefono}
          onChangeText={(value) => handleChangeText("Telefono", value)}
        />
      </View>

      <View>
        {/* <Button title="Crear Cuenta - Test consola" onPress={() => console.log(state)} /> */}
        <Button
          color={"#19AC52"}
          title="Actualizar Cuenta"
          onPress={() => updateUser()}
        />
      </View>

      <View>
        <Button
          color={"#E37399"}
          title="Eliminar Cuenta"
          onPress={() => openConfirmationAlert()}
        />
        {/* <Button title="Eliminar Cuenta"     onPress={() => saveNewUser()} /> */}
      </View>
    </ScrollView>
  );
};

// Apartado de Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },

  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default UserDetailScreen;

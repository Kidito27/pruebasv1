import React, { useState } from "react";

// Importando la base de datos - Si agregamos esto la aplicacion movil peta xD
import firebase, { db } from "../database/firebase";
import { addDoc, collection } from "firebase/firestore";

// Invocando componentes de react
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";

const CreateUserScreen = (props) => {
    
  // Invocamos un estado para guardar el contenido de los inputs
  const [state, setState] = useState({
    Nombre:     "",
    Sexo:       "",
    Cif:        "",
    Correo:     "",
    Telefono:   "",
    Fecha_De_Creacion: new Date(),
  });

  const handleChangeText = (item, value) => {
    setState({ ...state, [item]: value });
  };

  // Funcion para crear usuarios
  const saveNewUser = async () => {
    // console.log(state)
    if (
      state.Nombre      === "" ||
      state.Sexo        === "" ||
      state.Cif         === "" ||
      state.Correo      === "" ||
      state.Telefono    === ""
    ) {
      alert("Se le solicita que rellene los campos solicitados");
    } else {
      try {
        await addDoc(
          collection(db, "uxpresstransport", "usuario", "sub-usuario"),
          {
            Nombre:     state.Nombre,
            Sexo:       state.Sexo,
            Cif:        state.Cif,
            Correo:     state.Correo,
            Telefono:   state.Telefono,
            Fecha_De_Creacion: new Date(),
          }
        );
        // alert('Guardado')
        props.navigation.navigate("UserList");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Formulario de registro de usuario
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText("Nombre", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Sexo: M, F, O"
          onChangeText={(value) => handleChangeText("Sexo", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Cif"
          onChangeText={(value) => handleChangeText("Cif", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Correo"
          onChangeText={(value) => handleChangeText("Correo", value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefono"
          onChangeText={(value) => handleChangeText("Telefono", value)}
        />
      </View>

      <View>
        {/* <Button title="Crear Cuenta - Test consola" onPress={() => console.log(state)} /> */}
        <Button title="Crear Cuenta" onPress={() => saveNewUser()} />
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

export default CreateUserScreen;

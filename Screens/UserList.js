import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";

// Invocando componentes de react
import { Button, ScrollView } from "react-native";

// Importando la base de datos
import firebase, { db } from "../database/firebase";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  
  // UseEffect 
  useEffect(() => {
    firebase.db.collectionGroup("sub-usuario").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        //console.log(doc.data())
        const { Nombre, Sexo, Cif, Correo, Telefono } = doc.data();
        users.push({
          id: doc.id,
          Nombre,
          Sexo,
          Cif,
          Correo,
          Telefono,
        }); // Cierre push
      }); // Cierre del forEach
      //console.log(users);
      setUsers(users);
    }); // Cierre del QuerySnapshot
  }, []); // Cierre del UseEffect

  return (
    <ScrollView>
      <Button
        title="Crear Usuario"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />

      {users.map((usuario) => {
        return (
          <ListItem
            key={usuario.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: usuario.id,
              });
            }}>
            <ListItem.Chevron />
            <Avatar rounded icon={{ name: "home" }} />
            <ListItem.Content>
              <ListItem.Title>{usuario.Nombre}</ListItem.Title>
              <ListItem.Subtitle>{usuario.Correo}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserList;

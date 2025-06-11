import { StyleSheet, Button, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import Item from "../../components/Itens";

const Page = () => {
  const user = auth().currentUser;

  const tarefas = [
    { titulo: "Tarefa 0001" },
    { titulo: "Tarefa 0002" },
    { titulo: "Tarefa 0003" },
    { titulo: "Tarefa 0004" },
    { titulo: "Tarefa 0005" }
  ];

  return (
    <View style={styles.container}>
      <Text>Bem vindo {user?.email}</Text>
      <Button title="Sair" onPress={() => auth().signOut()} />

      <Item
        data={tarefas}
        onDelete={() => alert('evento do componente de exclusão')}
        onEdit={() => alert('evento do componente de edição')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 16,
  },
});

export default Page;

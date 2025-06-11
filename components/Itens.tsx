import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  data: { titulo: string }[];
  usuario: string;
  onEdit: () => void;
  onDelete: () => void;
  onLogout: () => void;
}

const Item = ({ data, usuario, onEdit, onDelete, onLogout }: Props) => {
  const handleAddPress = () => {
    Alert.alert('Adicionar tarefa', 'Você clicou no botão adicionar!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Título da aplicação */}
      <Text style={styles.title}>LoginAPP</Text>

      {/* Área do usuário logado */}
      <View style={styles.loggedUser}>
        <Text style={styles.welcome}>Bem vindo {usuario}</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.titulo}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={onEdit} style={styles.button}>
                <Entypo name="edit" size={24} color="#4A6FA5" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={styles.button}>
                <AntDesign name="delete" size={24} color="#E74C3C" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botão adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
    marginBottom: 12,
  },
  loggedUser: {
    backgroundColor: '#FFF7E6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  welcome: {
    fontSize: 18,
    color: '#E67E22',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#003366',
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
    flexShrink: 1,
    paddingRight: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    elevation: 2,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4A6FA5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Item;

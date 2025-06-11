import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  nome: string;
  onLogout: () => void;
}

export const LoggedUser = ({ nome, onLogout }: Props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Bem vindo {nome}</Text>
    <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Sair</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#E67E22',
  },
  logoutButton: {
    backgroundColor: '#ADD8E6',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: {
    color: '#003366',
    fontWeight: 'bold',
  },
});

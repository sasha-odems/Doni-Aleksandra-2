import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

export default function AddProductScreen({ navigation, addProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');

  const handleAdd = () => {
    if (!name || !price || !store) {
      return Alert.alert('Ошибка', 'Заполните все поля');
    }
    const parsed = parseFloat(price.replace(',', '.'));
    if (isNaN(parsed) || parsed <= 0) {
      return Alert.alert('Ошибка', 'Укажите корректную цену');
    }
    addProduct({ id: Date.now().toString(), name, price: parsed, store, bought: false });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Название"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Цена"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        placeholder="Магазин"
        style={styles.input}
        value={store}
        onChangeText={setStore}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 12, marginBottom: 12 },
  button: { padding: 12, backgroundColor: '#007AFF', alignItems: 'center', borderRadius: 4 },
  buttonText: { color: '#fff', fontSize: 16 },
});
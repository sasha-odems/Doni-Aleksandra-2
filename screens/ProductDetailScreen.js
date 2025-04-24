import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ProductDetailScreen({ route, navigation, toggleBought, deleteProduct }) {
  const { product } = route.params;

  const handleDelete = () => {
    deleteProduct(product.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.detail}>Цена: {product.price.toFixed(2)} zł</Text>
      <Text style={styles.detail}>Магазин: {product.store}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          toggleBought(product.id) 
          product.is_bought = !product.is_bought
          }}
      >
        <Text style={styles.buttonText}>{product.is_bought ? 'Kupione' : 'Oznaczyć jako kupione'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.delete]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Usunąć</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  detail: { fontSize: 18, marginBottom: 4 },
  button: { marginTop: 16, padding: 12, backgroundColor: '#007AFF', alignItems: 'center', borderRadius: 4 },
  delete: { backgroundColor: '#FF3B30' },
  buttonText: { color: '#fff', fontSize: 16 },
});
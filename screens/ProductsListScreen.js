import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductsListScreen({ navigation, products, togglePriceSort }) {
  const goToDetail = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Список продуктов</Text>
        <TouchableOpacity onPress={togglePriceSort} style={styles.filterButton}>
          <Text style={styles.filterText}>🔃</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToDetail(item)} style={styles.item}>
            <Text>{item.name} — {item.price.toFixed(2)} zł</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.addButtonText}>+ Добавить продукт</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  filterButton: { padding: 8 },
  filterText: { fontSize: 18 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc' },
  addButton: { marginTop: 16, padding: 12, backgroundColor: '#007AFF', alignItems: 'center', borderRadius: 4 },
  addButtonText: { color: '#fff', fontSize: 16 },
});

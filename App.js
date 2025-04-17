import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsListScreen from './screens/ProductsListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AddProductScreen from './screens/AddProductScreen';
import LoginScreen from "./screens/LoginScreen"
function DashboardScreen() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", store: "" });
  const [isPriceSorted, setIsPriceSorted] = useState(false);

  const handleChange = (key, value) => setNewProduct({ ...newProduct, [key]: value });

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.store) {
      return Alert.alert("Błąd", "Wypełnij wszystkie pola");
    }
    const price = parseFloat(newProduct.price.replace(",", "."));
    if (isNaN(price) || price <= 0) return Alert.alert("Błąd", "Podaj poprawną cenę!");
    setProducts([...products, { ...newProduct, id: Date.now().toString(), price, bought: false }]);
    setNewProduct({ name: "", price: "", store: "" });
  };

  const toggleBought = (id) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, bought: !p.bought } : p)));
  };

  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));

  const togglePriceSort = () => {
    setIsPriceSorted(!isPriceSorted);
  };

  const sortedProducts = [...products].sort((a, b) => (isPriceSorted ? a.price - b.price : 0));

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[styles.itemText, item.bought && styles.boughtText]}>
        {item.name} - {item.price.toFixed(2)} zł ({item.store})
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => toggleBought(item.id)} style={[styles.checkButton, item.bought && styles.checked]}>
          <Text style={styles.buttonText}>{item.bought ? "✅" : "☑️"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteProduct(item.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, styles.centerText]}>Lista zakupów</Text>
        <TouchableOpacity onPress={togglePriceSort} style={[styles.filterButton, isPriceSorted && styles.activeFilterBorder]}>
          <Text style={[styles.buttonText, isPriceSorted && styles.activeFilter]}>🔃</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Nazwa produktu"
        style={styles.input}
        placeholderTextColor="black"
        value={newProduct.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        placeholder="Cena"
        style={styles.input}
        placeholderTextColor="black"
        keyboardType="numeric"
        value={newProduct.price}
        onChangeText={(value) => handleChange("price", value)}
      />
      <TextInput
        placeholder="Sklep"
        style={styles.input}
        placeholderTextColor="black"
        value={newProduct.store}
        onChangeText={(value) => handleChange("store", value)}
      />
      <TouchableOpacity onPress={addProduct} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Dodaj produkt</Text>
      </TouchableOpacity>
      {[false, true].map((bought) => (
        <FlatList
          key={bought.toString()}
          data={sortedProducts.filter((p) => p.bought === bought)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={<Text style={styles.sectionText}>{bought ? "Kupione" : "Do zakupu"}</Text>}
        />
      ))}
    </View>
  );
}
const ProductScreen = ({route})=>{
  const {itemId, ...rest} = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        onPress={
          () =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
        }
      >
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([]);
  const [isPriceSorted, setIsPriceSorted] = useState(false);

  const addProduct = (product) => {
    setProducts(prev => [...prev, product]);
  };

  const toggleBought = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, bought: !p.bought } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const togglePriceSort = () => {
    setIsPriceSorted(prev => !prev);
  };

  const sortedProducts = isPriceSorted
    ? [...products].sort((a, b) => a.price - b.price)
    : products;

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProductsList" options={{ title: 'Lista produktów' }}>
          {props => (
            <ProductsListScreen
              {...props}
              products={sortedProducts}
              togglePriceSort={togglePriceSort}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProductDetail" options={{ title: 'Детали продукта' }}>
          {props => (
            <ProductDetailScreen
              {...props}
              toggleBought={toggleBought}
              deleteProduct={deleteProduct}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddProduct" options={{ title: 'Добавить продукт' }}>
          {props => (
            <AddProductScreen
              {...props}
              addProduct={addProduct}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: "white" },
  header: { alignItems: "center", marginBottom: 10, flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 26, fontWeight: "bold" },
  centerText: { textAlign: "center", flex: 1 },
  sectionText: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  item: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#f0f0f0", marginVertical: 5, borderRadius: 5 },
  itemText: { fontSize: 16 },
  boughtText: { textDecorationLine: "line-through", color: "gray" },
  buttonsContainer: { flexDirection: "row" },
  checkButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: "gray", marginRight: 5 },
  checked: { backgroundColor: "green" },
  deleteButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 5 },
  input: { width: "100%", height: 50, padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 12, fontSize: 18, color: "black" },
  addButton: { alignSelf: "center", padding: 10, backgroundColor: "#007AFF", borderRadius: 5, marginBottom: 20 },
  addButtonText: { fontSize: 18, color: "white", fontWeight: "bold" },
  buttonText: { fontSize: 20 },
  activeFilter: { color: "green" },
  filterButton: { padding: 5, borderRadius: 5 },
  activeFilterBorder: { borderWidth: 2, borderColor: "green" }
});

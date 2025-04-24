import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsListScreen from './screens/ProductsListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AddProductScreen from './screens/AddProductScreen';
import LoginScreen from "./screens/LoginScreen"
import {supabase} from "./Database"
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null)

  const [products, setProducts] = useState([]);
  const [isPriceSorted, setIsPriceSorted] = useState(false);

  React.useEffect(()=>{
    const fetchProducts = async ()=>{
      const {data} = await supabase.from("products").select("*")
      setProducts(data)
    }
    fetchProducts()
  }, [products])
  const addProduct = async (product) => {
    const {data, error} = await supabase.from("products").insert({name: product.name, price: product.price, store: product.store}).select()
    setProducts(prev => [...prev, data?.[0]]);
  };

  const toggleBought =  async (id) => {
    const {data: productData, error: productError} = await supabase.from("products").select().eq("id", id)
    const isBought = productData?.[0].is_bought.toString().toLowerCase() === "true"
    const {data, error} = await supabase.from("products").update({is_bought: !isBought }).eq("id", id).select()
    setProducts(prev => prev.map(p=> p.id === id ? data?.[0] : p))
  };

  const deleteProduct = async (id) => {
    const {data, error} = await supabase.from("products").delete().eq("id", id)
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
        <Stack.Screen name="ProductDetail" options={{ title: 'Szczeguły Produktu' }}>
          {props => (
            <ProductDetailScreen
              {...props}
              toggleBought={toggleBought}
              deleteProduct={deleteProduct}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddProduct" options={{ title: 'Dodać produkt' }}>
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

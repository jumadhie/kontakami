import { Image, StyleSheet, Platform,  TouchableOpacity, Text, View, StatusBar, FlatList, ActivityIndicator,  } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';


// Definisikan tipe data item dalam array
interface Post {
  id: number;
  title: string;
  body: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();


   // Fungsi untuk fetch data dari API
   const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products'); // Ganti dengan URL API-mu
      const json = await response.json();
      setData(json); // Set data ke state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Menghentikan loading indicator
    }
  };

  useEffect(()=>{
fetchData();
  },[])
  const goToProfile = () => {
    router.push('/testing/testing');  // Navigasi ke halaman '/profile'
  };

   // Jika loading, tampilkan spinner
   if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text>Tunggu sebentar bolo</Text>
      </View>
    );
  }
  return (
    <FlatList
    data={data}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => (
      <View style={{padding:8}}>
        <Text>{item.title}</Text>
      </View>
    )}
  />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

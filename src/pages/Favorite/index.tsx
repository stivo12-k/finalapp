import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// --- Assets ---
import Villa from '../../assets/villa.svg'; // Placeholder image
import LocationIcon from '../../assets/location.svg';
import HeartRed from '../../assets/heart-red.svg';

// --- Firebase Imports ---
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/Firebase';

const Favorite = () => {
  const navigation = useNavigation();
  
  // State untuk data dinamis
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  // --- Ambil Data dari Firebase ---
  useEffect(() => {
    if (user) {
      const favRef = ref(database, `users/${user.uid}/favorites`);
      
      const unsubscribe = onValue(favRef, (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
          // Ubah Object Firebase menjadi Array
          const dataArray = Object.keys(data).map(key => ({
            ...data[key],
            id: key 
          }));
          setFavorites(dataArray);
        } else {
          setFavorites([]);
        }
        setLoading(false);
      });

      // Cleanup listener saat keluar halaman
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorite</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Logic Loading & Empty State */}
      {loading ? (
        <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#6F3E76" />
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.centerState}>
            <Text style={styles.emptyText}>Belum ada kost favorit.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {favorites.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              // Navigasi ke Detail membawa data item
              onPress={() => navigation.navigate('Detail', { item })}
            >
              {/* Gambar Placeholder (Karena Database text tidak bisa simpan SVG component) */}
              <Villa width={120} height={85} style={{borderRadius: 10}} />

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={styles.row}>
                  <LocationIcon width={14} height={14} />
                  <Text style={styles.location} numberOfLines={1}>{item.location}</Text>
                </View>

                <Text style={styles.price}>
                    Rp {typeof item.price === 'number' ? item.price.toLocaleString('id-ID') : item.price}
                    <Text style={{fontSize:10, fontWeight:'normal', color:'#888'}}>/bln</Text>
                </Text>
              </View>

              <HeartRed width={26} height={26} />
            </TouchableOpacity>
          ))}
          <View style={{height: 20}} />
        </ScrollView>
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0', // Sedikit border agar header jelas
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    color: '#020202',
  },
  centerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#888',
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#020202',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingRight: 10, 
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 4,
    color: '#6F6F6F',
    flex: 1, 
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14, // Ukuran font disesuaikan
    color: '#6F3E76',
  },
});
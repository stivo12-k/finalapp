import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BottomNav from '../../components/molecules/BottomNav';

import { useNavigation } from '@react-navigation/native';

import LocationIcon from '../../assets/location.svg';
import HeartRed from '../../assets/heart-red.svg';


const Favorite = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('favorite');

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === 'home') navigation.navigate('HomePage');
    if (tab === 'explore') navigation.navigate('Explore');
    if (tab === 'favorite') navigation.navigate('Favorite');
    if (tab === 'profile') navigation.navigate('Profile');
  };

  const data = [
    {
      id: 1,
      title: 'Maharani Villa Yogyakarta',
      location: 'airmadidi atas, Minahasa Utara',
      price: '$320/month',
      image: require('../../assets/villa.svg'),
    },
    {
      id: 2,
      title: 'Manhattan Hotel',
      location: 'airmadidi atas, Minahasa Utara',
      price: '$230/night',
      image: require('../../assets/hotel.svg'),
    },
  ];

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorite</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { item })}

            
          >
            <Image source={item.image} style={styles.image} />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <View style={styles.row}>
                <LocationIcon width={14} height={14} />
                <Text style={styles.location}>{item.location}</Text>
              </View>

              <Text style={styles.price}>{item.price}</Text>
            </View>

            <HeartRed width={26} height={26} />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  },

  backArrow: {
    fontSize: 28,
    marginRight: 20,
  },

  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },

  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  image: {
    width: 120,
    height: 85,
    borderRadius: 10,
  },

  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginBottom: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 4,
    color: '#6F6F6F',
  },

  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
});

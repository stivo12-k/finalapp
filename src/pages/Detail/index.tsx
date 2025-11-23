import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';


import LocationIcon from '../../assets/location.svg';
import HeartRed from '../../assets/heart-red.svg';
import HeartOutline from '../../assets/heart.svg';
import Bathroom from '../../assets/bathroom.svg';
import AC from '../../assets/ac.svg';
import Wifi from '../../assets/wifi.svg';
import Parking from '../../assets/parking.svg';
import Male from '../../assets/male.svg';
import Female from '../../assets/female.svg';
import Mix from '../../assets/mix.svg';
import BackButton from '../../assets/BackButton.svg';
import Villa from '../../assets/villa.svg'; 


import { getAuth } from 'firebase/auth';
import { ref, set, remove, onValue } from 'firebase/database';
import { database } from '../../config/Firebase';
import { showMessage } from 'react-native-flash-message';

import { useNavigation, useRoute } from '@react-navigation/native';

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; 


  const [isFavorite, setIsFavorite] = useState(false);
  
  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    if (user && item) {
      const favRef = ref(database, `users/${user.uid}/favorites/${item.id}`);
      const unsubscribe = onValue(favRef, (snapshot) => {
        setIsFavorite(snapshot.exists());
      });
      return () => unsubscribe();
    }
  }, [item, user]);

  
  const handleToggleFavorite = () => {
    if (!user) {
      showMessage({ message: "Silakan login terlebih dahulu", type: "danger" });
      return;
    }

    const favRef = ref(database, `users/${user.uid}/favorites/${item.id}`);

    if (isFavorite) {
      // Hapus
      remove(favRef)
        .then(() => showMessage({ message: "Dihapus dari favorit", type: "default" }))
        .catch(err => console.log(err));
    } else {
     
      const itemToSave = {
        id: item.id,
        title: item.title,
        location: item.location,
        price: item.price,
        type: item.type,
        description: item.description,
        facilities: item.facilities || []
      };

      set(favRef, itemToSave)
        .then(() => showMessage({ message: "Tersimpan di favorit", type: "success" }))
        .catch(err => console.log(err));
    }
  };

  
  const typeIcons = {
    Pria: <Male width={22} height={22} />,
    Wanita: <Female width={22} height={22} />,
    Campur: <Mix width={22} height={22} />,
  };

  const facilityIcons = {
    Bathroom: <Bathroom width={26} height={26} />,
    AC: <AC width={26} height={26} />,
    WIFI: <Wifi width={26} height={26} />,
    'Parking Lot': <Parking width={26} height={26} />,
  };


  const MainImage = item.svg || Villa;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
       
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackButton width={24} height={24} />
        </TouchableOpacity>

       
        <View style={styles.imageWrapper}>
            
            <MainImage width="100%" height={250} />
        </View>

      
        <View style={styles.titleWrapper}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
             <View style={{flex:1}}>
                <Text style={styles.title}>{item.title}</Text>
             </View>
             
            
             <TouchableOpacity onPress={handleToggleFavorite}>
                {isFavorite ? (
                    <HeartRed width={32} height={32} />
                ) : (
                
                    <Text style={{fontSize:28}}>🤍</Text> 
                )}
             </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <LocationIcon width={18} height={18} />
            <Text style={styles.locationTxt}>{item.location}</Text>
          </View>

          <Text style={styles.price}>
             Rp {typeof item.price === 'number' ? (item.price * 1000).toLocaleString('id-ID') : item.price}
             <Text style={{fontSize:12, fontWeight:'normal', color:'#888'}}>/bln</Text>
          </Text>
        </View>

    
        <Text style={styles.sectionTitle}>Tipe Kost</Text>
        <View style={styles.typeRow}>
          <View style={styles.typeBox}>
            {typeIcons[item.type]}
            <Text style={styles.typeTxt}>{item.type}</Text>
          </View>
        </View>

     
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesRow}>
          {item.facilities && item.facilities.map((facility, index) => (
            <View key={index} style={styles.facilityBox}>
              {facilityIcons[facility]}
              <Text style={styles.facilityTxt}>{facility}</Text>
            </View>
          ))}
        </View>

      
        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.description}>{item.description}</Text>

       
        <Text style={styles.sectionTitle}>Pemilik</Text>
        <View style={styles.ownerRow}>
          <Image
            source={{ uri: item.owner?.avatar || 'https://i.pravatar.cc/200?img=12' }}
            style={styles.ownerImg}
          />
          <View>
            <Text style={styles.ownerName}>{item.owner?.name || 'Nama Pemilik'}</Text>
            <Text style={styles.ownerJob}>Pemilik Kost</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <Text style={styles.phoneTxt}>{item.owner?.phone || '+62-8XX-XXXX-XXXX'}</Text>
        </View>

      
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
           
            const phoneNumber = item.owner?.phone.replace(/[^0-9]/g, '');
            Linking.openURL(`tel:${phoneNumber}`);
          }}>
          <Text style={styles.buttonText}>Hubungi Pemilik</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default Detail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  imageWrapper: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },

  titleWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationTxt: {
    marginLeft: 6,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6F6F6F',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 6,
    color: '#7F3DFF',
  },

  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginTop: 18,
    marginLeft: 20,
  },

  typeRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  typeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#7F3DFF',
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginRight: 12,
  },
  typeTxt: {
    marginLeft: 6,
    color: '#7F3DFF',
    fontFamily: 'Poppins-SemiBold',
  },

  facilitiesRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  facilityBox: {
    borderWidth: 1.5,
    borderColor: '#7F3DFF',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginRight: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  facilityTxt: {
    marginTop: 6,
    fontFamily: 'Poppins-Regular',
  },

  description: {
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 20,
    lineHeight: 20,
    fontSize: 13,
    color: '#555',
    marginTop: 10,
  },

  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  ownerImg: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 12,
  },
  ownerName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  ownerJob: {
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },
  contactRow: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  phoneTxt: {
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },

  map: {
    width: '90%',
    height: 160,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 12,
  },

  button: {
    backgroundColor: '#4C1D95',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});

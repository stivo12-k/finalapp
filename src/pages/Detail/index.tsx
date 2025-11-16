
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import LocationIcon from '../../assets/location.svg';
import HeartRed from '../../assets/heart-red.svg';
import Bathroom from '../../assets/bathroom.svg';
import AC from '../../assets/ac.svg';
import Wifi from '../../assets/wifi.svg';
import Parking from '../../assets/parking.svg';
import Male from '../../assets/male.svg';
import Female from '../../assets/female.svg';
import Mix from '../../assets/mix.svg';
import BackButton from '../../assets/BackButton.svg';
import hotel from '../../assets/hotel.svg';

import { useNavigation, useRoute } from '@react-navigation/native';

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Support both `route.params.item` and `route.params.kost` (from different pages)
  const params = route.params ?? {};
  const data = params.kost ?? params.item ?? {};

  // safe defaults
  const title = data.title ?? 'No title';
  const location = data.location ?? '-';
  const price = data.price ?? '-';
  const facilities = Array.isArray(data.facilities) ? data.facilities : [];
  const type = data.type ?? 'Campur';
  const owner = data.owner ?? { name: 'Joh Doe', job: 'Real Estate Agent', phone: '+62-821-2345-6789', image: 'https://i.pravatar.cc/200?img=5' };

  // === ICON MAPPING ===
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

  // Helper to render header image (either svg component or raster image)
  const renderHeaderImage = () => {
    // If data.svg is provided as a React component, render it
    if (data.svg) {
      const SvgComp = data.svg;
      try {
        return <SvgComp width="100%" height={250} />;
      } catch (e) {
        // fallthrough to image rendering
      }
    }

    // If data.image is a uri string
    if (typeof data.image === 'string') {
      return <Image source={{ uri: data.image }} style={styles.headerImage} resizeMode="cover" />;
    }

    // If data.image is a local require(...) (number) or object
    if (data.image) {
      return <Image source={data.image} style={styles.headerImage} resizeMode="cover" />;
    }

    // fallback placeholder
    return <View style={[styles.headerImage, { backgroundColor: '#EAEAEA' }]} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20 }}>
          <BackButton width={24} height={24} />
        </TouchableOpacity>


        <View style={styles.imageWrapper}>
          {renderHeaderImage()}
        </View>

        {/* TITLE */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          <HeartRed width={32} height={32} style={styles.heartIcon} />

          <View style={styles.row}>
            <LocationIcon width={18} height={18} />
            <Text style={styles.locationTxt}>{location}</Text>
          </View>

          <Text style={styles.price}>{price}</Text>
        </View>

      
        <Text style={styles.sectionTitle}>Tipe Kost</Text>

        <View style={styles.typeRow}>
          <View style={styles.typeBox}>
            {typeIcons[type as keyof typeof typeIcons]}
            <Text style={styles.typeTxt}>{type}</Text>
          </View>
        </View>

      
        <Text style={styles.sectionTitle}>Facilities</Text>

        <View style={styles.facilitiesRow}>
          {facilities.map((facility: any, index: number) => (
            <View key={index} style={styles.facilityBox}>
              {facilityIcons[facility as keyof typeof facilityIcons]}
              <Text style={styles.facilityTxt}>{facility}</Text>
            </View>
          ))}
        </View>

        {/* ==== DESCRIPTION (DINAMIS) ==== */}
        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.description}>{data.description}</Text>

        {/* === OWNER (MASIH STATIC, BISA DIBUAT DINAMIS KALAU MAU) === */}
        <Text style={styles.sectionTitle}>Pemilik</Text>

        <View style={styles.ownerRow}>
          <Image
            source={typeof owner.image === 'string' ? { uri: owner.image } : owner.image}
            style={styles.ownerImg}
          />

          <View>
            <Text style={styles.ownerName}>{owner.name}</Text>
            <Text style={styles.ownerJob}>{owner.job}</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <Text style={styles.phoneTxt}>{owner.phone}</Text>
        </View>

        {/* === MAP DUMMY === */}
        <Text style={styles.sectionTitle}>Location</Text>

        <Image
          source={require('../../assets/map.png')}
          style={styles.map}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Hubungi Pemilik</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default Detail;


// REUSABLE UI
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

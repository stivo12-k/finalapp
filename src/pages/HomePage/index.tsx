import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';
import BottomNav from '../../components/molecules/BottomNav';
import Villa from '../../assets/villa.svg';

const HomePage = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const recommendedData = [
    {
      id: 1,
      title: 'MIZTA Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      svg: Villa,
      type: 'Pria',
      facilities: ['WIFI', 'AC', 'Bathroom', 'Parking Lot'],
      description:
        'Kost nyaman khusus pria, dekat dengan UNKLAB dan area kampus. Fasilitas lengkap.',
    },
    {
      id: 2,
      title: 'JAma Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      svg: Villa,
      type: 'Wanita',
      facilities: ['WIFI', 'AC', 'Parking Lot'],
      description:
        'Kost khusus wanita dengan lingkungan aman dan nyaman. Lokasi strategis.',
    },
  ];

  const popularData = [
    {
      id: 1,
      title: 'Triple J',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      svg: Villa,
      type: 'Campur',
      facilities: ['WIFI', 'AC'],
      description:
        'Kost campur dengan suasana tenang dan nyaman. Cocok untuk mahasiswa.',
    },
    {
      id: 2,
      title: 'Kost Mila',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      svg: Villa,
      type: 'Wanita',
      facilities: ['WIFI', 'Bathroom'],
      description: 'Kost khusus wanita, bersih dan aman, dekat dengan kampus.',
    },
    {
      id: 3,
      title: 'KK2 Garrele',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      svg: Villa,
      type: 'Pria',
      facilities: ['Parking Lot', 'AC'],
      description:
        'Kost murah khusus pria dengan area parkir luas dan akses mudah.',
    },
    {
      id: 4,
      title: 'Pavillion',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      svg: Villa,
      type: 'Campur',
      facilities: ['WiFi', 'AC', 'Bathroom'],
      description:
        'Kost campur dengan fasilitas premium dan lokasi sangat strategis.',
    },
  ];


  const allData = [...recommendedData, ...popularData];


  const filteredData = allData.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header label="Find Your Kost" backButton={false} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Property"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text>⚙️</Text>
          </TouchableOpacity>
        </View>

        <Gap height={16} />

    
        {searchText.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <Gap height={12} />

            {filteredData.length === 0 ? (
              <Text style={{color: '#666'}}>No results found</Text>
            ) : (
              filteredData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.popularCard}
                  onPress={() => navigation.navigate('Detail', { item })}
                >
                  <item.svg width={120} height={85} />
                  <View style={styles.popularCardContent}>
                    <Text style={styles.popularCardTitle}>{item.title}</Text>
                    <Text style={styles.popularCardLocation}>{item.location}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}

            <Gap height={40} />
          </View>
        ) : (
          <>
            {/* Banner */}
            <View style={styles.banner}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>TINGGAL NYAMAN DEKAT UNKLAB</Text>
                <Text style={styles.bannerSubtitle}>DAPAT JADI ANAK UNKLAB</Text>
              </View>
            </View>

            <Gap height={24} />

            {/* Recommended */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>

              <Gap height={12} />

              <View style={styles.recommendedGrid}>
                {recommendedData.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recommendedCard}
                    onPress={() => navigation.navigate('Detail', { item })}
                  >
                    <item.svg width={120} height={85} />

                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardLocation}>{item.location}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Gap height={24} />

            {/* Popular */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular for you</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>

              <Gap height={12} />

              {popularData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.popularCard}
                  onPress={() => navigation.navigate('Detail', { item })}
                >
                  <item.svg width={120} height={85} />

                  <View style={styles.popularCardContent}>
                    <Text style={styles.popularCardTitle}>{item.title}</Text>
                    <Text style={styles.popularCardLocation}>{item.location}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Gap height={40} />
          </>
        )}

      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  scrollView: { flex: 1, paddingHorizontal: 24 },

  searchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 12 },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#020202',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  banner: {
    backgroundColor: '#6F3E76',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginVertical: 8,
  },
  bannerContent: {},
  bannerTitle: { fontSize: 18, color: '#FFFFFF', marginBottom: 4, fontWeight: '700' },
  bannerSubtitle: { fontSize: 12, color: '#D2AA1A' },

  section: { marginVertical: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#020202' },
  seeAll: { fontSize: 12, color: '#6F3E76' },

  recommendedGrid: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  recommendedCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#020202' },
  cardLocation: { fontSize: 10, color: '#666666' },

  popularCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
  },
  popularCardContent: { flex: 1, padding: 12, justifyContent: 'center' },
  popularCardTitle: { fontSize: 14, fontWeight: '700', color: '#020202' },
  popularCardLocation: { fontSize: 10, color: '#666666' },
});

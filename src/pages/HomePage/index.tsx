import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';
import BottomNav from '../../components/molecules/BottomNav';
import Filter from '../../components/molecules/Filter';

import mizta from '../../assets/mizta.svg';
import Villa from '../../assets/villa.svg';
import tripleJ from '../../assets/tripleJ.svg';

import skost from '../../assets/skost.svg';
import kostMawarIndah from '../../assets/kostMawarIndah.svg';
import harmoni from '../../assets/harmoni.svg';

const HomePage = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(500.000);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const recommendedData = [
    {
      id: 1, 
      title: 'MIZTA Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 150.000, 
      svg: mizta,
      type: 'Pria',
      facilities: ['WIFI', 'AC', 'Bathroom', 'Parking Lot'],
      description: '...',
      owner: {
        name: 'Budi Santoso',
        phone: '+62 812-3456-7890',
        avatar: 'https://i.pravatar.cc/200?img=12'
      },
    },
    {
      id: 2, 
      title: 'JAma Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 200.000, 
      svg: harmoni,
      type: 'Wanita',
      facilities: ['WIFI', 'AC', 'Parking Lot'],
      description: '...',
      owner: {
        name: 'Dewi Lestari',
        phone: '+62 823-4567-8901',
        avatar: 'https://i.pravatar.cc/200?img=13'
      },
    },
  ];

  const popularData = [
    {
      id: 3,
      title: 'Triple J',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 250.000, 
      svg: tripleJ,
      type: 'Campur',
      facilities: ['WIFI', 'AC'],
      description: 'Kost nyaman dengan fasilitas lengkap di lokasi strategis',
      owner: {
        name: 'Joko Widodo',
        phone: '+62 811-2233-4455',
        avatar: 'https://i.pravatar.cc/200?img=14'
      },
    },
    {
      id: 4,
      title: 'Kost Mila',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 300.000,
      svg: Villa,
      type: 'Wanita',
      facilities: ['WIFI', 'Bathroom'],
      description: 'Kost eksklusif untuk wanita dengan keamanan 24 jam',
      owner: {
        name: 'Siti Rahayu',
        phone: '+62 812-9988-7766',
        avatar: 'https://i.pravatar.cc/200?img=15'
      },
    },
    {
      id: 5,
      title: 'Kost Sejahtera',
      location: 'Jl. Melati No. 15, Bandung',
      price: 350.000,
      svg: skost,
      type: 'Pria',
      facilities: ['WIFI', 'AC', 'Parking Lot'],
      description: 'Kost nyaman untuk mahasiswa dan pekerja',
      owner: {
        name: 'Agus Setiawan',
        phone: '+62 813-4455-6677',
        avatar: 'https://i.pravatar.cc/200?img=16'
      },
    },
    {
      id: 6,
      title: 'Kost Mawar Indah',
      location: 'Jl. Anggrek No. 22, Bandung',
      price: 400.000,
      svg: kostMawarIndah,
      type: 'Wanita',
      facilities: ['WIFI', 'AC', 'Bathroom', 'Parking Lot'],
      description: 'Kost eksklusif dengan fasilitas lengkap dan dapur bersama',
      owner: {
        name: 'Rina Wijaya',
        phone: '+62 814-5566-7788',
        avatar: 'https://i.pravatar.cc/200?img=17'
      },
    }
  ];

  const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);


  const handleApplyFilters = () => {
    setIsFilterVisible(false);
  };

  const MAX_PRICE = 500.000;

  const handleResetFilters = () => {
    setSelectedType(null);
    setSelectedPrice(MAX_PRICE); 
    setSelectedFacilities([]);
  };

  const allData = useMemo(
    () => [...recommendedData, ...popularData],
    [], 
  );

  

  const filteredData = useMemo(() => {
  
    if (searchText.length === 0) return [];

    return allData.filter(item => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesType = !selectedType || item.type === selectedType;
      const matchesPrice = item.price <= selectedPrice;
      const matchesFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every(facility =>
          item.facilities.includes(facility),
        );
      return matchesSearch && matchesType && matchesPrice && matchesFacilities;
    });
  }, [allData, searchText, selectedType, selectedPrice, selectedFacilities]);


  const filteredRecommendedData = useMemo(() => {
    return recommendedData.filter(item => {
      const matchesType = !selectedType || item.type === selectedType;
      const matchesPrice = item.price <= selectedPrice;
      const matchesFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every(facility =>
          item.facilities.includes(facility),
        );
      return matchesType && matchesPrice && matchesFacilities;
    });
  }, [recommendedData, selectedType, selectedPrice, selectedFacilities]);

  const filteredPopularData = useMemo(() => {
    return popularData.filter(item => {
      const matchesType = !selectedType || item.type === selectedType;
      const matchesPrice = item.price <= selectedPrice;
      const matchesFacilities =
        selectedFacilities.length === 0 ||
        selectedFacilities.every(facility =>
          item.facilities.includes(facility),
        );
      return matchesType && matchesPrice && matchesFacilities;
    });
  }, [popularData, selectedType, selectedPrice, selectedFacilities]);

  const filtersAreActive =
    selectedType !== null ||
    selectedPrice < MAX_PRICE ||
    selectedFacilities.length > 0;

  return (
    <View style={styles.container}>
      <Header label="Find Your Kost" backButton={false} onPress={() => { }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
  
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Property"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
         
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilterModal}>
            <Text>⚙</Text>
          </TouchableOpacity>
        </View>

        <Gap height={16} />

        {searchText.length > 0 ? (
         
          <View>
            <Text style={styles.sectionTitle}>
              {filteredData.length} Results Found
            </Text>
            <Gap height={12} />

            {filteredData.length === 0 ? (
              <Text style={{ color: '#666' }}>No results found</Text>
            ) : (
            
              filteredData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.popularCard}
                  onPress={() => navigation.navigate('Detail', { item })}>
                  <item.svg width={120} height={85} />
                  <View style={styles.popularCardContent}>
                    <Text style={styles.popularCardTitle}>{item.title}</Text>
                    <Text style={styles.popularCardLocation}>
                      {item.location}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
            <Gap height={40} />
          </View>
        ) : (
         
          <>
          
            <ImageBackground
              source={require('../../assets/unklb.png')}
              resizeMode="cover"
              style={styles.banner}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>
                  TINGGAL NYAMAN DEKAT UNKLAB
                </Text>
                <Text style={styles.bannerSubtitle}>
                  DAPAT JADI ANAK UNKLAB
                </Text>
              </View>
            </ImageBackground>

            <Gap height={24} />

        
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}></Text>
                </TouchableOpacity>
              </View>
              <Gap height={12} />

        
              <View style={styles.recommendedGrid}>
                {filteredRecommendedData.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recommendedCard}
                    onPress={() => navigation.navigate('Detail', { item })}>
                    <item.svg width="100%" height="100%" style={styles.cardBackground} />
                    <View style={styles.cardOverlay}>
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.locationContainer}>
                          <Text style={styles.locationIcon}>📍</Text>
                          <Text style={styles.cardLocation}>{item.location}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

             
              {filteredRecommendedData.length === 0 && filtersAreActive && (
                <Text style={{ color: '#666', marginTop: 10 }}>
                  No recommended items match your filter.
                </Text>
              )}
            </View>

            <Gap height={24} />

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular for you</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}></Text>
                </TouchableOpacity>
              </View>
              <Gap height={12} />

              
              {filteredPopularData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.popularCard}
                  onPress={() => navigation.navigate('Detail', { item })}>
                  <item.svg width={120} height={85} />
                  <View style={styles.popularCardContent}>
                    <Text style={styles.popularCardTitle}>{item.title}</Text>
                    <Text style={styles.popularCardLocation}>
                      {item.location}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {filteredPopularData.length === 0 && filtersAreActive && (
                <Text style={{ color: '#666', marginTop: 10 }}>
                  No popular items match your filter.
                </Text>
              )}
            </View>

            <Gap height={40} />
          </>
        )}
      </ScrollView>

      <Filter
        visible={isFilterVisible}
        onClose={toggleFilterModal}
        onApply={handleApplyFilters}
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedPrice={selectedPrice}
        onPriceChange={setSelectedPrice}
        selectedFacilities={selectedFacilities}
        onFacilitiesChange={setSelectedFacilities}
      />

    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  scrollView: { paddingHorizontal: 24 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
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
  bannerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
    fontWeight: '700',
  },
  bannerSubtitle: { fontSize: 12, color: '#D2AA1A' },
  section: { marginVertical: 8 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#020202' },
  seeAll: { fontSize: 12, color: '#6F3E76' },
  recommendedGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  recommendedCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 140,
    position: 'relative',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  cardContent: {
    padding: 0,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationIcon: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  cardLocation: {
    fontSize: 11,
    color: '#FFFFFF',
    flex: 1,
    opacity: 0.95,
  },
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '85%',
    backgroundColor: '#ffffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#d4cfcfff',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#020202',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
    marginTop: 24,
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexBasis: '30%',
    minWidth: '30%',
  },
  optionButtonSelected: {
    backgroundColor: '#6F3E76',
    borderColor: '#6F3E76',
  },
  optionText: {
    fontSize: 14,
    color: '#020202',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resetLink: {
    fontSize: 12,
    color: '#6F3E76',
    textDecorationLine: 'underline',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8, 
  },
  priceText: {
    fontSize: 12,
    color: '#666666',
  },
  priceTextBold: {
    fontSize: 14,
    color: '#020202',
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6F3E76',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#6F3E76',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
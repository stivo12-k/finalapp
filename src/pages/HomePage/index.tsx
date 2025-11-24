import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';
import BottomNav from '../../components/molecules/BottomNav'; // Pastikan ini dirender jika perlu
import Filter from '../../components/molecules/Filter';

// (MODIFIKASI 4: Impor Ikon)
// Import gambar untuk setiap kost
import mizta from '../../assets/mizta.svg';
import Villa from '../../assets/villa.svg';
import tripleJ from '../../assets/tripleJ.svg';

import skost from '../../assets/skost.svg';
import kostMawarIndah from '../../assets/kostMawarIndah.svg';
import harmoni from '../../assets/harmoni.svg';

const HomePage = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');

  // (MODIFIKASI 5: Tambahkan state untuk Modal dan Filter)
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(500.000);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  // (MODIFIKASI 6: Perbaikan Data)
  const recommendedData = [
    {
      id: 1, // Unik
      title: 'MIZTA Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 150.000, // Berupa Angka
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
      id: 2, // Unik
      title: 'JAma Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 200.000, // Berupa Angka
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
      id: 3, // ID diubah agar unik
      title: 'Triple J',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 250.000, // Berupa Angka
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

  // (MODIFIKASI 7: Logika Helper untuk Filter)
  const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);

  // Facilities state is managed by passing setters into the shared `Filter` component

  const handleApplyFilters = () => {
    setIsFilterVisible(false);
  };

  // Tentukan harga maksimum untuk slider (samakan dengan Explore)
  const MAX_PRICE = 500.000;

  const handleResetFilters = () => {
    setSelectedType(null);
    setSelectedPrice(MAX_PRICE); // Reset ke MAX_PRICE
    setSelectedFacilities([]);
  };

  // (MODIFIKASI 8: DIPERBARUI - Kita butuh 3 list filter)

  // Gabungkan data hanya sekali
  const allData = useMemo(
    () => [...recommendedData, ...popularData],
    [], // Data statis, jadi array dependensi kosong
  );

  // --- List 1: Untuk "Search Results" (Menggunakan SEMUA filter + searchText) ---
  const filteredData = useMemo(() => {
    // Hanya filter jika ada searchText.
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

  // --- List 2: Untuk "Recommended" (HANYA menggunakan filter modal) ---
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

  // --- List 3: Untuk "Popular" (HANYA menggunakan filter modal) ---
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

  // (MODIFIKASI 9: Cek apakah ada filter yang aktif)
  const filtersAreActive =
    selectedType !== null ||
    selectedPrice < MAX_PRICE || // Cek jika slider digeser dari maks
    selectedFacilities.length > 0;

  return (
    <View style={styles.container}>
      <Header label="Find Your Kost" backButton={false} onPress={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Property"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          {/* (MODIFIKASI 10: Tambahkan onPress ke tombol filter) */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilterModal}>
            <Text>⚙</Text>
          </TouchableOpacity>
        </View>

        <Gap height={16} />

        {/* (MODIFIKASI 11: DIPERBARUI - Logika Tampilan Utama) */}
        {searchText.length > 0 ? (
          // --- TAMPILAN 1: SEARCH RESULTS ---
          <View>
            <Text style={styles.sectionTitle}>
              {filteredData.length} Results Found
            </Text>
            <Gap height={12} />

            {filteredData.length === 0 ? (
              <Text style={{color: '#666'}}>No results found</Text>
            ) : (
              // Tampilkan hasil filter dari 'filteredData'
              filteredData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.popularCard}
                  onPress={() => navigation.navigate('Detail', {item})}>
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
          // --- TAMPILAN 2: DEFAULT HOME (Banner, Recommended, Popular) ---
          <>
            {/* Banner */}
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

            {/* Recommended */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <Gap height={12} />

              {/* Gunakan 'filteredRecommendedData' di sini */}
              <View style={styles.recommendedGrid}>
                {filteredRecommendedData.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recommendedCard}
                    onPress={() => navigation.navigate('Detail', {item})}>
                    <item.svg width={120} height={85} />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardLocation}>{item.location}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Pesan jika filter tidak menemukan apa-apa */}
              {filteredRecommendedData.length === 0 && filtersAreActive && (
                <Text style={{color: '#666', marginTop: 10}}>
                  No recommended items match your filter.
                </Text>
              )}
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

              {/* Gunakan 'filteredPopularData' di sini */}
              {filteredPopularData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.popularCard}
                  onPress={() => navigation.navigate('Detail', {item})}>
                  <item.svg width={120} height={85} />
                  <View style={styles.popularCardContent}>
                    <Text style={styles.popularCardTitle}>{item.title}</Text>
                    <Text style={styles.popularCardLocation}>
                      {item.location}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Pesan jika filter tidak menemukan apa-apa */}
              {filteredPopularData.length === 0 && filtersAreActive && (
                <Text style={{color: '#666', marginTop: 10}}>
                  No popular items match your filter.
                </Text>
              )}
            </View>

            <Gap height={40} />
          </>
        )}
      </ScrollView>

      {/* Gunakan komponen Filter yang sama seperti di Explore */}
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

      {/* <BottomNav navigation={navigation} /> */}
      {/* Jangan lupa render BottomNav jika Anda membutuhkannya di sini */}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  // ... (Semua styles 'HomePage' Anda yang lama tetap di sini)
  container: {flex: 1, backgroundColor: '#F9F9F9'},
  scrollView: {paddingHorizontal: 24},
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
  bannerSubtitle: {fontSize: 12, color: '#D2AA1A'},
  section: {marginVertical: 8},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {fontSize: 16, fontWeight: '700', color: '#020202'},
  seeAll: {fontSize: 12, color: '#6F3E76'},
  recommendedGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  recommendedCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardContent: {padding: 12},
  cardTitle: {fontSize: 14, fontWeight: '700', color: '#020202'},
  cardLocation: {fontSize: 10, color: '#666666'},
  popularCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
  },
  popularCardContent: {flex: 1, padding: 12, justifyContent: 'center'},
  popularCardTitle: {fontSize: 14, fontWeight: '700', color: '#020202'},
  popularCardLocation: {fontSize: 10, color: '#666666'},

  // (MODIFIKASI 13: Tambahkan Styles Modal dari ExplorePage)
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
    paddingHorizontal: 8, // Beri jarak
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
    flex: 2, // Buat tombol Apply lebih besar
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

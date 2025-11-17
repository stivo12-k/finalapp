import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal, // (MODIFIKASI 1: Impor Modal)
} from 'react-native';
import React, {useState, useMemo} from 'react'; // (MODIFIKASI 2: Impor useMemo)
import Slider from '@react-native-community/slider'; // (MODIFIKASI 3: Impor Slider)
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';
import BottomNav from '../../components/molecules/BottomNav'; // Pastikan ini dirender jika perlu

// (MODIFIKASI 4: Impor Ikon)
// --- GANTI DENGAN PATH ASET ANDA ---
import Villa from '../../assets/villa.svg';
import MaleIcon from '../../assets/male.svg'; // Ganti path
import FemaleIcon from '../../assets/female.svg'; // Ganti path
import MixIcon from '../../assets/mix.svg'; // Ganti path
// --- GANTI DENGAN PATH ASET ANDA ---

const HomePage = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  // (MODIFIKASI 5: Tambahkan state untuk Modal dan Filter)
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(500000);
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  // (MODIFIKASI 6: Perbaikan Data)
  const recommendedData = [
    {
      id: 1, // Unik
      title: 'MIZTA Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 150000, // Berupa Angka
      svg: Villa,
      type: 'Pria',
      facilities: ['WIFI', 'AC', 'Bathroom', 'Parking Lot'],
      description: '...',
    },
    {
      id: 2, // Unik
      title: 'JAma Kost',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 150000, // Berupa Angka
      svg: Villa,
      type: 'Wanita',
      facilities: ['WIFI', 'AC', 'Parking Lot'],
      description: '...',
    },
  ];

  const popularData = [
    {
      id: 3, // ID diubah agar unik
      title: 'Triple J',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 150000, // Berupa Angka
      svg: Villa,
      type: 'Campur',
      facilities: ['WIFI', 'AC'],
      description: '...',
    },
    {
      id: 4, // ID diubah agar unik
      title: 'Kost Mila',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: 150000, // Berupa Angka
      svg: Villa,
      type: 'Wanita',
      facilities: ['WIFI', 'Bathroom'],
      description: '...',
    },
    // ... data lainnya ...
  ];

  // (MODIFIKASI 7: Logika Helper untuk Filter)
  const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);

  const toggleFacility = facility => {
    const lowerCaseFacility = facility.toLowerCase();

    if (selectedFacilities.includes(lowerCaseFacility)) {
      setSelectedFacilities(
        selectedFacilities.filter(item => item !== lowerCaseFacility),
      );
    } else {
      setSelectedFacilities([...selectedFacilities, lowerCaseFacility]);
    }
  };

  const handleApplyFilters = () => {
    setIsFilterVisible(false);
  };

  // Tentukan harga maksimum untuk slider
  const MAX_PRICE = 500000;

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
        selectedFacilities.every(selectedFac =>
          item.facilities.some(
            itemFac => itemFac.toLowerCase() === selectedFac,
          ),
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
        selectedFacilities.every(selectedFac =>
          item.facilities.some(
            itemFac => itemFac.toLowerCase() === selectedFac,
          ),
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
        selectedFacilities.every(selectedFac =>
          item.facilities.some(
            itemFac => itemFac.toLowerCase() === selectedFac,
          ),
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
      <Header label="Find Your Kost" backButton={false} />

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
            <Text>⚙️</Text>
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
            <View style={styles.banner}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>
                  TINGGAL NYAMAN DEKAT UNKLAB
                </Text>
                <Text style={styles.bannerSubtitle}>
                  DAPAT JADI ANAK UNKLAB
                </Text>
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

      {/* (MODIFIKASI 12: Tambahkan JSX Modal Filter di sini) */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleFilterModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Filter</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* --- Kost Type --- */}
              <Text style={styles.filterSectionTitle}>Kost Type</Text>
              <View style={styles.optionContainer}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedType === 'Pria' && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedType('Pria')}>
                  <MaleIcon
                    width={16}
                    height={16}
                    fill={selectedType === 'Pria' ? '#FFFFFF' : '#020202'}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      selectedType === 'Pria' && styles.optionTextSelected,
                    ]}>
                    Pria
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedType === 'Wanita' && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedType('Wanita')}>
                  <FemaleIcon
                    width={16}
                    height={16}
                    fill={selectedType === 'Wanita' ? '#FFFFFF' : '#020202'}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      selectedType === 'Wanita' && styles.optionTextSelected,
                    ]}>
                    Wanita
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedType === 'Campur' && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedType('Campur')}>
                  <MixIcon
                    width={16}
                    height={16}
                    fill={selectedType === 'Campur' ? '#FFFFFF' : '#020202'}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      selectedType === 'Campur' && styles.optionTextSelected,
                    ]}>
                    Campur
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{alignSelf: 'flex-start', marginVertical: 4}}
                onPress={() => setSelectedType(null)}>
                <Text style={styles.resetLink}>Reset Tipe</Text>
              </TouchableOpacity>

              {/* --- Harga per bulan --- */}
              <Text style={styles.filterSectionTitle}>Harga per bulan</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>Rp 50.000</Text>
                <Text style={styles.priceTextBold}>
                  Rp {selectedPrice.toLocaleString('id-ID')}
                </Text>
                <Text style={styles.priceText}>
                  Rp {MAX_PRICE.toLocaleString('id-ID')}
                </Text>
              </View>
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={50000}
                maximumValue={MAX_PRICE}
                step={10000}
                value={selectedPrice}
                onValueChange={value => setSelectedPrice(value)}
                minimumTrackTintColor="#6F3E76"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#6F3E76"
              />

              {/* --- Facilities --- */}
              <Text style={styles.filterSectionTitle}>Facilities</Text>
              <View style={styles.optionContainer}>
                {/* PENTING: String di array ini ('Parking Lot')
                  harus konsisten dengan data di 'allKostData'
                */}
                {['Bathroom', 'AC', 'WIFI', 'Parking Lot'].map(fac => {
                  const isSelected = selectedFacilities.includes(
                    fac.toLowerCase(),
                  );
                  return (
                    <TouchableOpacity
                      key={fac}
                      style={[
                        styles.optionButton,
                        {flexBasis: '48%'},
                        isSelected && styles.optionButtonSelected,
                      ]}
                      onPress={() => toggleFacility(fac)}>
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}>
                        {fac}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Gap height={20} />
            </ScrollView>

            {/* --- Tombol Apply & Reset --- */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetFilters}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#E0E0E0',
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

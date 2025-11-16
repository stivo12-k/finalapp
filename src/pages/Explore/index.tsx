import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Slider from '@react-native-community/slider';
import Header from '../../components/molecules/Header';
import BottomNav from '../../components/molecules/BottomNav';
import Gap from '../../components/atoms/Gap';

// --- (WAJIB) GANTI PATH ASET INI ---
import Villa from '../../assets/villa.svg';
import MapGrid from '../../assets/googlemaps.png';
import MaleIcon from '../../assets/male.svg';
import FemaleIcon from '../../assets/female.svg';
import MixIcon from '../../assets/mix.svg';
import SearchIcon from '../../assets/Hide.svg';
import FilterIcon from '../../assets/Filter.svg';
import LocationIcon from '../../assets/location.svg';
import CloseIcon from '../../assets/clear.svg';
import RecentIcon from '../../assets/clock.svg';
import ResultPinIcon from '../../assets/location.svg';
// --- (WAJIB) GANTI PATH ASET INI ---

// --- DATA ---
const allKostData = [
  {
    id: 1,
    title: 'MIZTA Kost',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 150,
    type: 'Pria',
    facilities: ['WIFI', 'AC', 'Bathroom', 'Parking Lot'],
    svg: Villa,
    coordinates: {top: '20%', left: '15%'},
  },
  {
    id: 2,
    title: 'JAma Kost',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 160,
    type: 'Wanita',
    facilities: ['WIFI', 'AC', 'Parking Lot'],
    svg: Villa,
    coordinates: {top: '25%', left: '40%'},
  },
  {
    id: 3,
    title: 'Triple J',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 200,
    type: 'Campur',
    facilities: ['WIFI', 'AC'],
    svg: Villa,
    coordinates: {top: '40%', left: '30%'},
  },
  {
    id: 4,
    title: 'Kost Mila',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 300,
    type: 'Wanita',
    facilities: ['WIFI', 'Bathroom'],
    svg: Villa,
    coordinates: {top: '55%', left: '25%'},
  },
  // ... data lainnya ...
];
// --- DATA ---

const ExplorePage = ({navigation}) => {
  const [visiblePins, setVisiblePins] = useState(allKostData);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(800);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    {id: 1, title: 'Azalea Hall', location: 'airmadidi atas, Minahasa Utara'},
    {id: 2, title: 'Kost Mila', location: 'Jl. Pimpinang etaas'},
  ]);

  // (MODIFIKASI 1: Tambah state baru untuk toast)
  const [isToastVisible, setIsToastVisible] = useState(false);

  // (MODIFIKASI 2: Perbarui useEffect)
  useEffect(() => {
    const applyLiveFilters = () => {
      let filtered = allKostData;

      // KASUS 1: Pengguna sedang mengetik di search bar
      if (searchText.length > 0) {
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase()),
        );
        // Sembunyikan toast filter jika pengguna mulai mencari
        setIsToastVisible(false);
      }
      // KASUS 2: Search bar kosong (tampilan peta)
      else {
        // Terapkan filter dari modal
        if (selectedType) {
          filtered = filtered.filter(item => item.type === selectedType);
        }
        filtered = filtered.filter(item => item.price <= selectedPrice);
        if (selectedFacilities.length > 0) {
          filtered = filtered.filter(item =>
            selectedFacilities.every(facility =>
              item.facilities.includes(facility),
            ),
          );
        }
      }
      setVisiblePins(filtered);
    };

    applyLiveFilters();
  }, [searchText, selectedType, selectedPrice, selectedFacilities]);

  // --- Fungsi Bantuan ---
  const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);

  const toggleFacility = facility => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(
        selectedFacilities.filter(item => item !== facility),
      );
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const handleApplyFilters = () => {
    setIsFilterVisible(false);
    setSearchText('');
    // (MODIFIKASI 3: Tampilkan toast saat filter dari modal diterapkan)
    // Cek apakah ada filter yang aktif selain harga default
    if (selectedType || selectedFacilities.length > 0 || selectedPrice < 800) {
      setIsToastVisible(true);
    }
  };

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedType(null);
    setSelectedPrice(800);
    setSelectedFacilities([]);
    setIsFilterVisible(false);
    setIsToastVisible(false); // Sembunyikan toast saat reset
  };

  // (MODIFIKASI 4: Buat fungsi baru untuk menangani klik filter cepat)
  const handleQuickFilterPress = type => {
    const newType = selectedType === type ? null : type;
    setSelectedType(newType);

    // Tampilkan toast jika filter DIPILIH, sembunyikan jika DIBATALKAN
    if (newType !== null) {
      setIsToastVisible(true);
    } else {
      setIsToastVisible(false);
    }
  };

  // --- FUNGSI RENDER ---

  // (MODIFIKASI 5: Buat fungsi untuk merender Toast)
  const renderFilterToast = () => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>
        Showing {visiblePins.length}{' '}
        {visiblePins.length === 1 ? 'property' : 'properties'}
      </Text>
      <TouchableOpacity onPress={() => setIsToastVisible(false)}>
        {/* Menggunakan ulang CloseIcon dengan warna putih */}
        <CloseIcon width={16} height={16} fill="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  // (MODIFIKASI 6: Perbarui renderMap)
  const renderMap = () => (
    <ImageBackground
      source={MapGrid}
      resizeMode="cover"
      style={styles.mapBackground}>
      {/* === Quick Filters === */}
      <View style={styles.quickFilterContainer}>
        <TouchableOpacity
          // Gunakan style dinamis untuk tombol yang aktif
          style={[
            styles.quickFilterButton,
            selectedType === 'Pria' && styles.quickFilterButtonSelected,
          ]}
          onPress={() => handleQuickFilterPress('Pria')} // Panggil fungsi baru
        >
          <MaleIcon
            width={16}
            height={16}
            fill={selectedType === 'Pria' ? '#FFFFFF' : '#333'}
          />
          <Text
            style={[
              styles.quickFilterText,
              selectedType === 'Pria' && styles.quickFilterTextSelected,
            ]}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.quickFilterButton,
            selectedType === 'Wanita' && styles.quickFilterButtonSelected,
          ]}
          onPress={() => handleQuickFilterPress('Wanita')} // Panggil fungsi baru
        >
          <FemaleIcon
            width={16}
            height={16}
            fill={selectedType === 'Wanita' ? '#FFFFFF' : '#333'}
          />
          <Text
            style={[
              styles.quickFilterText,
              selectedType === 'Wanita' && styles.quickFilterTextSelected,
            ]}>
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.quickFilterButton,
            selectedType === 'Campur' && styles.quickFilterButtonSelected,
          ]}
          onPress={() => handleQuickFilterPress('Campur')} // Panggil fungsi baru
        >
          <MixIcon
            width={16}
            height={16}
            fill={selectedType === 'Campur' ? '#FFFFFF' : '#333'}
          />
          <Text
            style={[
              styles.quickFilterText,
              selectedType === 'Campur' && styles.quickFilterTextSelected,
            ]}>
            Campur
          </Text>
        </TouchableOpacity>
      </View>

      {/* === (MODIFIKASI 7: Render Toast jika visible) === */}
      {isToastVisible && renderFilterToast()}

      {/* === Render Pins === */}
      {visiblePins.map(item => {
        const PinSvg = item.svg || Villa;
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.pinContainer,
              {top: item.coordinates.top, left: item.coordinates.left},
            ]}
            onPress={() => {
              navigation.navigate('Detail', {item});
            }}>
            <View style={styles.pin}>
              <PinSvg width={18} height={18} />
            </View>
            <Text style={styles.pinTitle}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}

      {/* === Current Location Button === */}
      <TouchableOpacity style={styles.locationButton}>
        <LocationIcon width={24} height={24} fill="#6F3E76" />
      </TouchableOpacity>
    </ImageBackground>
  );

  // (Fungsi renderSearchResults tidak berubah)
  const renderSearchResults = () => (
    <ScrollView style={styles.searchListContainer}>
      {/* --- Bagian Recent --- */}
      <Text style={styles.listSectionTitle}>Recent</Text>
      {recentSearches.map(item => (
        <TouchableOpacity
          key={`recent-${item.id}`}
          style={styles.listItem}
          onPress={() => setSearchText(item.title)} // Set search text saat diklik
        >
          <View style={styles.listItemIcon}>
            <RecentIcon width={20} height={20} fill="#666" />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemSubtitle}>{item.location}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Gap height={24} />

      {/* --- Bagian Result --- */}
      <Text style={styles.listSectionTitle}>Result</Text>
      {visiblePins.length > 0 ? (
        visiblePins.map(item => (
          <TouchableOpacity
            key={`result-${item.id}`}
            style={styles.listItem}
            onPress={() => {
              navigation.navigate('Detail', {item});
            }}>
            <View style={styles.listItemIcon}>
              <ResultPinIcon width={20} height={20} fill="#6F3E76" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemSubtitle}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noResultsText}>
          No results found for "{searchText}"
        </Text>
      )}
      <Gap height={40} />
    </ScrollView>
  );

  // --- RETURN UTAMA ---
  return (
    <View style={styles.container}>
      {/* === Search Bar Area (Selalu terlihat) === */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <SearchIcon width={18} height={18} fill="#666" />
          <TextInput
            placeholder="Cari nama kost"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <CloseIcon width={16} height={16} fill="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilterModal}>
          <FilterIcon width={20} height={20} fill="#6F3E76" />
        </TouchableOpacity>
      </View>

      {/* === Tampilan Kondisional (Peta atau Daftar) === */}
      <View style={styles.contentArea}>
        {searchText.length > 0 ? renderSearchResults() : renderMap()}
      </View>

      {/* === Bottom Navigation === */}
      <BottomNav active="Explore" />

      {/* === Modal Filter (Tidak berubah) === */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleFilterModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Filter</Text>

            {/* Search Bar di dalam Modal */}
            <View style={[styles.searchBar, styles.modalSearchBar]}>
              <SearchIcon width={18} height={18} fill="#666" />
              <TextInput
                placeholder="Cari nama kost..."
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

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
                <Text style={styles.priceText}>$10</Text>
                <Text style={styles.priceText}>${selectedPrice}</Text>
                <Text style={styles.priceText}>$800</Text>
              </View>
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={10}
                maximumValue={800}
                step={10}
                value={selectedPrice}
                onValueChange={value => setSelectedPrice(value)}
                minimumTrackTintColor="#6F3E76"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#6F3E76"
              />

              {/* --- Facilities --- */}
              <Text style={styles.filterSectionTitle}>Facilities</Text>
              <View style={styles.optionContainer}>
                {['Bathroom', 'AC', 'WIFI', 'PARKING LOT'].map(fac => (
                  <TouchableOpacity
                    key={fac}
                    style={[
                      styles.optionButton,
                      {flexBasis: '48%'},
                      selectedFacilities.includes(fac) &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() => toggleFacility(fac)}>
                    <Text
                      style={[
                        styles.optionText,
                        selectedFacilities.includes(fac) &&
                          styles.optionTextSelected,
                      ]}>
                      {fac}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Gap height={20} />
            </ScrollView>

            {/* --- Tombol Apply --- */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExplorePage;

// (MODIFIKASI 8: Tambahkan/Ubah styles)
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  contentArea: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#020202',
    padding: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- Map Styles ---
  mapBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  quickFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  quickFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  // (BARU) Style untuk tombol filter aktif
  quickFilterButtonSelected: {
    backgroundColor: '#6F3E76', // Warna ungu
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  quickFilterText: {
    fontSize: 14,
    color: '#333',
  },
  // (BARU) Style untuk teks filter aktif
  quickFilterTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  locationButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  pin: {
    backgroundColor: '#6F3E76',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    overflow: 'hidden',
  },
  pinTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 4,
    borderRadius: 4,
    marginTop: 2,
  },

  // --- (BARU) Toast Styles ---
  toastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6F3E76', // Warna ungu
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 20, // Samakan dengan padding halaman
    marginTop: 12, // Jarak from filter
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- Search List Styles ---
  searchListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  listSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#020202',
  },
  listItemSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  noResultsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },

  // --- Modal Styles ---
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
  modalSearchBar: {
    elevation: 0,
    backgroundColor: '#F3F3F3',
    borderColor: '#E0E0E0',
    borderWidth: 1,
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
  },
  priceText: {
    fontSize: 12,
    color: '#666666',
  },
  applyButton: {
    backgroundColor: '#6F3E76',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

import {
  StyleSheet,
  Text,
  View,
  ScrollView, // (MODIFIKASI 1: Tambahkan ScrollView untuk hasil)
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
import SearchIcon from '../../assets/Hide.svg'; // Path Anda dari sebelumnya
import FilterIcon from '../../assets/Filter.svg'; // Path Anda dari sebelumnya
import LocationIcon from '../../assets/location.svg'; // Path Anda dari sebelumnya
import CloseIcon from '../../assets/clear.svg'; // Path Anda dari sebelumnya

// (MODIFIKASI 2: Impor ikon BARU untuk daftar hasil)
// !! GANTI PATH INI !!
import RecentIcon from '../../assets/clock.svg'; // <-- GANTI DENGAN PATH ANDA
import ResultPinIcon from '../../assets/location.svg'; // <-- GANTI DENGAN PATH ANDA
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
  {
    id: 5,
    title: 'KK2 Garrele',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 450,
    type: 'Pria',
    facilities: ['Parking Lot', 'AC'],
    svg: Villa,
    coordinates: {top: '70%', left: '35%'},
  },
  {
    id: 6,
    title: 'Pavillion',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 750,
    type: 'Campur',
    facilities: ['WIFI', 'AC', 'Bathroom'],
    svg: Villa,
    coordinates: {top: '45%', left: '65%'},
  },
  {
    id: 7, // Data contoh untuk search
    title: 'Azalea Hall',
    location: 'airmadidi atas, Minahasa Utara',
    price: 250,
    type: 'Wanita',
    facilities: ['WIFI', 'AC'],
    svg: Villa,
    coordinates: {top: '60%', left: '50%'},
  },
];
// --- DATA ---

const ExplorePage = ({navigation}) => {
  // State untuk data pin di peta
  const [visiblePins, setVisiblePins] = useState(allKostData);

  // State untuk modal
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // State untuk nilai-nilai di dalam filter
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(800);
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  // (MODIFIKASI 3: Tambah state untuk "Recent Searches")
  const [recentSearches, setRecentSearches] = useState([
    {id: 1, title: 'Azalea Hall', location: 'airmadidi atas, Minahasa Utara'},
    {id: 2, title: 'Kost Mila', location: 'Jl. Pimpinang etaas'},
  ]);
  // (Di aplikasi nyata, Anda akan memuat ini dari AsyncStorage)

  // (MODIFIKASI 4: Logika useEffect diperbarui)
  useEffect(() => {
    const applyLiveFilters = () => {
      let filtered = allKostData;

      // KASUS 1: Pengguna sedang mengetik di search bar
      if (searchText.length > 0) {
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase()),
        );
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

      // visiblePins sekarang digunakan oleh Peta dan Daftar Hasil
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

  // Fungsi ini dipanggil saat tombol "Apply" di modal ditekan
  const handleApplyFilters = () => {
    setIsFilterVisible(false);
    // (MODIFIKASI 5: Saat filter diterapkan, kembali ke peta)
    setSearchText(''); // Ini akan memicu useEffect & kembali ke peta
  };

  // Fungsi untuk mereset semua filter
  const handleResetFilters = () => {
    setSearchText('');
    setSelectedType(null);
    setSelectedPrice(800);
    setSelectedFacilities([]);
    setIsFilterVisible(false);
  };

  // --- FUNGSI RENDER ---

  // (MODIFIKASI 6: Buat fungsi terpisah untuk merender peta)
  const renderMap = () => (
    <ImageBackground
      source={MapGrid}
      resizeMode="cover"
      style={styles.mapBackground}>
      {/* === Quick Filters === */}
      <View style={styles.quickFilterContainer}>
        <TouchableOpacity
          style={styles.quickFilterButton}
          onPress={() =>
            setSelectedType(selectedType === 'Pria' ? null : 'Pria')
          }>
          <MaleIcon width={16} height={16} fill="#333" />
          <Text style={styles.quickFilterText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickFilterButton}
          onPress={() =>
            setSelectedType(selectedType === 'Wanita' ? null : 'Wanita')
          }>
          <FemaleIcon width={16} height={16} fill="#333" />
          <Text style={styles.quickFilterText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickFilterButton}
          onPress={() =>
            setSelectedType(selectedType === 'Campur' ? null : 'Campur')
          }>
          <MixIcon width={16} height={16} fill="#333" />
          <Text style={styles.quickFilterText}>Campur</Text>
        </TouchableOpacity>
      </View>

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
              /* Simpan ke recent search di sini */
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

  // (MODIFIKASI 7: Buat fungsi terpisah untuk merender hasil pencarian)
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
              // (Di aplikasi nyata, simpan ini ke AsyncStorage)
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
  // (MODIFIKASI 8: Ubah struktur return utama)
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

// (MODIFIKASI 9: Tambahkan/Ubah styles)
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},

  // --- Area Konten Utama ---
  contentArea: {
    flex: 1, // Ini penting agar peta atau daftar mengisi ruang
  },

  // --- Search Header (di luar Peta) ---
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Sesuaikan dengan status bar Anda
    paddingBottom: 12, // Beri jarak
    gap: 12,
    backgroundColor: '#FFFFFF', // Latar belakang putih
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3', // Warna abu-abu muda
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    // Hapus shadow/elevation karena sekarang bagian dari header
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#020202',
    padding: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F3F3', // Samakan dengan search bar
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- Map Styles ---
  mapBackground: {
    flex: 1, // Peta akan mengisi contentArea
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  quickFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 16, // Jarak dari atas (karena search bar sudah pindah)
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
  },
  quickFilterText: {
    fontSize: 14,
    color: '#333',
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

  // --- (BARU) Search List Styles ---
  searchListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#FFFFFF', // Pastikan latar belakang putih
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
    // (BARU) untuk membungkus teks
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

  // --- Modal Styles (Sedikit penyesuaian) ---
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
    flexBasis: '30%', // Untuk 3 kolom
    minWidth: '30%', // Pastikan muat
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

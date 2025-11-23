import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Gap from '../../components/atoms/Gap';
import Filter from '../../components/molecules/Filter';

import Villa from '../../assets/villa.svg';
import MapGrid from '../../assets/googlemaps.png';
import SearchIcon from '../../assets/Hide.svg';
import FilterIcon from '../../assets/Filter.svg';
import LocationIcon from '../../assets/location.svg';
import CloseIcon from '../../assets/clear.svg';
import RecentIcon from '../../assets/clock.svg';
import ResultPinIcon from '../../assets/location.svg';
import MaleIcon from '../../assets/male.svg';
import FemaleIcon from '../../assets/female.svg';
import MixIcon from '../../assets/mix.svg';
import mizta from '../../assets/mizta.svg';
import tripleJ from '../../assets/tripleJ.svg';
import skost from '../../assets/skost.svg';
import kostMawarIndah from '../../assets/kostMawarIndah.svg';
import harmoni from '../../assets/harmoni.svg';

const allKostData = [
  {
    id: 1,
    title: 'MIZTA Kost',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 150.000,
    type: 'Pria',
    facilities: ['WIFI', 'AC', 'Bathroom', 'Parking Lot'],
    description: 'Kost nyaman dengan fasilitas lengkap dan keamanan 24 jam.',
    svg: mizta,
    owner: {
      name: 'Budi Santoso',
      phone: '+62 812-3456-7890',
      avatar: 'https://i.pravatar.cc/200?img=12'
    },
    coordinates: {top: '20%', left: '15%'},
  },
  {
    id: 2,
    title: 'JAma Kost',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 200.000,
    type: 'Wanita',
    facilities: ['WIFI', 'AC', 'Parking Lot'],
    description: 'Lingkungan asri dan tenang, cocok untuk mahasiswi.',
    svg: harmoni,
    owner: {
      name: 'Dewi Lestari',
      phone: '+62 823-4567-8901',
      avatar: 'https://i.pravatar.cc/200?img=13'
    },
    coordinates: {top: '25%', left: '40%'},
  },
  {
    id: 3,
    title: 'Triple J',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 250.000,
    type: 'Campur',
    facilities: ['WIFI', 'AC'],
    description: 'Akses mudah ke jalan raya.',
    svg: tripleJ,
    owner: {
      name: 'Joko Widodo',
      phone: '+62 811-2233-4455',
      avatar: 'https://i.pravatar.cc/200?img=14'
    },
    coordinates: {top: '40%', left: '30%'},
  },
  {
    id: 4,
    title: 'Kost Mila',
    location: 'Jl. Pimpinang etaas, Mindhasa Utara',
    price: 300.000,
    type: 'Wanita',
    facilities: ['WIFI', 'Bathroom'],
    description: 'Harga terjangkau dengan fasilitas memadai.',
    svg: Villa,
    owner: {
      name: 'Siti Rahayu',
      phone: '+62 812-9988-7766',
      avatar: 'https://i.pravatar.cc/200?img=15'
    },
    coordinates: {top: '55%', left: '25%'},
  },
  {
    id: 5,
    title: 'Kost Sejahtera',
    location: 'Jl. Melati No. 15, Bandung',
    price: 350.000,
    type: 'Pria',
    facilities: ['WIFI', 'AC', 'Laundry', 'Parking Lot'],
    description: 'Kost nyaman untuk mahasiswa dan pekerja',
    svg: skost,
    owner: {
      name: 'Agus Setiawan',
      phone: '+62 813-4455-6677',
      avatar: 'https://i.pravatar.cc/200?img=16'
    },
    coordinates: {top: '30%', left: '60%'},
  },
  {
    id: 6,
    title: 'Kost Mawar Indah',
    location: 'Jl. Anggrek No. 22, Bandung',
    price: 400.000,
    type: 'Wanita',
    facilities: ['WIFI', 'AC', 'Kitchen', 'Bathroom', 'Parking Lot'],
    description: 'Kost eksklusif dengan fasilitas lengkap dan dapur bersama',
    svg: kostMawarIndah,
    owner: {
      name: 'Rina Wijaya',
      phone: '+62 814-5566-7788',
      avatar: 'https://i.pravatar.cc/200?img=17'
    },
    coordinates: {top: '45%', left: '70%'},
  },

];

const ExplorePage = ({navigation}: any) => {
  const [visiblePins, setVisiblePins] = useState(allKostData);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState(800);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [recentSearches] = useState([
    {id: 1, title: 'Azalea Hall', location: 'airmadidi atas, Minahasa Utara'},
    {id: 2, title: 'Kost Mila', location: 'Jl. Pimpinang etaas'},
  ]);

  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const applyLiveFilters = () => {
      let filtered = allKostData;

      if (searchText.length > 0) {
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase()),
        );
        setIsToastVisible(false);
      }
      else {
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

  const toggleFilterModal = () => setIsFilterVisible(!isFilterVisible);

  const handleApplyFilters = () => {
    setIsFilterVisible(false);
    setSearchText('');
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
    setIsToastVisible(false);
  };

  const handleQuickFilterPress = (type: string) => {
    const newType = selectedType === type ? null : type;
    setSelectedType(newType);

    if (newType !== null) {
      setIsToastVisible(true);
    } else {
      setIsToastVisible(false);
    }
  };


  const renderFilterToast = () => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>
        Showing {visiblePins.length}{' '}
        {visiblePins.length === 1 ? 'property' : 'properties'}
      </Text>
      <TouchableOpacity onPress={() => setIsToastVisible(false)}>
        <CloseIcon width={16} height={16} fill="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderMap = () => (
    <ImageBackground
      source={MapGrid}
      resizeMode="cover"
      style={styles.mapBackground}>
      
   
      <View style={styles.quickFilterContainer}>
        <TouchableOpacity
          style={[styles.quickFilterButton, selectedType === 'Pria' && styles.quickFilterButtonSelected]}
          onPress={() => handleQuickFilterPress('Pria')}
        >
          <MaleIcon width={16} height={16} fill={selectedType === 'Pria' ? '#FFFFFF' : '#333'} />
          <Text style={[styles.quickFilterText, selectedType === 'Pria' && styles.quickFilterTextSelected]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickFilterButton, selectedType === 'Wanita' && styles.quickFilterButtonSelected]}
          onPress={() => handleQuickFilterPress('Wanita')}
        >
          <FemaleIcon width={16} height={16} fill={selectedType === 'Wanita' ? '#FFFFFF' : '#333'} />
          <Text style={[styles.quickFilterText, selectedType === 'Wanita' && styles.quickFilterTextSelected]}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickFilterButton, selectedType === 'Campur' && styles.quickFilterButtonSelected]}
          onPress={() => handleQuickFilterPress('Campur')}
        >
          <MixIcon width={16} height={16} fill={selectedType === 'Campur' ? '#FFFFFF' : '#333'} />
          <Text style={[styles.quickFilterText, selectedType === 'Campur' && styles.quickFilterTextSelected]}>Campur</Text>
        </TouchableOpacity>
      </View>

      {isToastVisible && renderFilterToast()}

 
      {visiblePins.map(item => {
        const PinSvg = item.svg || Villa;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.pinContainer, {top: item.coordinates.top, left: item.coordinates.left}]}
            
            onPress={() => navigation.navigate('Detail', {item})}
          >
            <View style={styles.pin}>
              <PinSvg width={18} height={18} />
            </View>
            <Text style={styles.pinTitle}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.locationButton}>
        <LocationIcon width={24} height={24} fill="#6F3E76" />
      </TouchableOpacity>
    </ImageBackground>
  );

  const renderSearchResults = () => (
    <ScrollView style={styles.searchListContainer}>
      <Text style={styles.listSectionTitle}>Recent</Text>
      {recentSearches.map(item => (
        <TouchableOpacity
          key={`recent-${item.id}`}
          style={styles.listItem}
          onPress={() => setSearchText(item.title)}
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

      <Text style={styles.listSectionTitle}>Result</Text>
      {visiblePins.length > 0 ? (
        visiblePins.map(item => (
          <TouchableOpacity
            key={`result-${item.id}`}
            style={styles.listItem}
            
            onPress={() => navigation.navigate('Detail', {item})}
          >
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

  return (
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <FilterIcon width={20} height={20} fill="#6F3E76" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentArea}>
        {searchText.length > 0 ? renderSearchResults() : renderMap()}
      </View>

     
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

export default ExplorePage;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  contentArea: {flex: 1},
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
  searchInput: {flex: 1, fontSize: 15, color: '#020202', padding: 0},
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBackground: {flex: 1, width: '100%', height: '100%', position: 'relative'},
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
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  quickFilterButtonSelected: {
    backgroundColor: '#6F3E76',
    borderColor: '#6F3E76',
    elevation: 5,
    shadowOpacity: 0.25,
  },
  quickFilterText: {fontSize: 13, color: '#333', fontWeight: '500'},
  quickFilterTextSelected: {color: '#FFFFFF', fontWeight: '600'},
  toastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6F3E76',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toastText: {color: '#FFFFFF', fontSize: 14, fontWeight: '600'},
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
  pinContainer: {position: 'absolute', alignItems: 'center'},
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
  listItem: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listContent: {flex: 1},
  listItemTitle: {fontSize: 14, fontWeight: 'bold', color: '#020202'},
  listItemSubtitle: {fontSize: 12, color: '#666666'},
  noResultsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
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
  resetLink: {
    fontSize: 12,
    color: '#6F3E76',
    textDecorationLine: 'underline',
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
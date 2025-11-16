import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';
import HomeIcon from '../../assets/home.svg';
import ExploreIcon from '../../assets/explore.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import ProfileIcon from '../../assets/profile.svg';

const HomePage = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  // Data untuk Recommended
  const recommendedData = [
    {
      id: 1,
      title: 'MIZTA Kost',
      location: 'Jl. Pimpinang Etaas, Minahasa Utara',
      price: '₹1,500,000',
      image: require('../../assets/LogoUK.svg'),

      // Detail tambahan
      type: 'Pria',
      facilities: ['AC', 'WiFi', 'Parking', 'Kamar Mandi Dalam'],
      description:
        'MIZTA Kost adalah kost strategis dekat kampus, cocok untuk mahasiswa. Lokasi nyaman, akses transportasi mudah, dan lingkungan aman.',
      owner: {
        name: 'Budi Santoso',
        phone: '+62-812-3333-9999',
        job: 'Pemilik Kost',
        email: 'budi@example.com',
        // use a web uri so DetailPage can load via {uri:...}
        image: 'https://i.pravatar.cc/150?img=12'
      },
      map: {
        lat: 1.123,
        long: 124.123
      }
    },
    {
      id: 2,
      title: 'JAma Kost',
      location: 'Jl. Merdeka No.4, Minahasa',
      price: '₹900,000',
      image: require('../../assets/LogoUK.svg'),
      type: 'Wanita',
      facilities: ['WiFi', 'Kamar Mandi Dalam'],
      description: 'JAma Kost cocok untuk pelajar dan karyawan, fasilitas lengkap dan aman.',
      owner: {
        name: 'Siti Aminah',
        phone: '+62-812-4444-7777',
        job: 'Pemilik Kost',
        email: 'siti@example.com',
        image: 'https://i.pravatar.cc/150?img=5'
      },
      map: {
        lat: 1.321,
        long: 124.321
      }
    },
  ];

  // Data untuk Popular for you
  const popularData = [
    {
      id: 1,
      title: 'Triple J',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      image: require('../../assets/LogoUK.svg'),
    },
    {
      id: 2,
      title: 'Kost mila',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      image: require('../../assets/LogoUK.svg'),
    },
    {
      id: 3,
      title: 'KK2 Garrele',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      image: require('../../assets/LogoUK.svg'),
    },
    {
      id: 4,
      title: 'Pavillion',
      location: 'Jl. Pimpinang etaas, Mindhasa Utara',
      price: '₹150,000',
      image: require('../../assets/LogoUK.svg'),
    },
  ];

  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <Header label="Find Your Kost" backButton={false} onPress={() => {}} />
      
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

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>TINGGAL NYAMAN DEKAT UNKLAB</Text>
            <Text style={styles.bannerSubtitle}>DAPAT JADI ANAK UNKLAB</Text>
          </View>
        </View>

        <Gap height={24} />

        {/* Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <Gap height={12} />

          <View style={styles.recommendedGrid}>
            {recommendedData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recommendedCard}
                onPress={() => navigation.navigate('DetailPage', { kost: item })}
              >
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Gap height={24} />

        {/* Popular for you Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular for you</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <Gap height={12} />

          {popularData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.popularCard} onPress={() => navigation.navigate('DetailPage', { kost: item })}>
              <Image source={item.image} style={styles.popularCardImage} />
              <View style={styles.popularCardContent}>
                <Text style={styles.popularCardTitle}>{item.title}</Text>
                <Text style={styles.popularCardLocation}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Gap height={40} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => setActiveTab('home')}
        >
          <HomeIcon width={24} height={24} />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'explore' && styles.navItemActive]}
          onPress={() => setActiveTab('explore')}
        >
          <ExploreIcon width={24} height={24} />
          <Text style={[styles.navLabel, activeTab === 'explore' && styles.navLabelActive]}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'favorite' && styles.navItemActive]}
          onPress={() => {setActiveTab('favorite');
             navigation.navigate('Favorite');
          }}
        >
          <FavoriteIcon width={24} height={24} />
          <Text style={[styles.navLabel, activeTab === 'favorite' && styles.navLabelActive]}>Favorita</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]}
          onPress={() => {setActiveTab('profile');
            navigation.navigate('Profile');
          }}
        >
          <ProfileIcon width={24} height={24} />
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>Profila</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
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
    fontFamily: 'Poppins-Regular',
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
  bannerContent: {
    flexDirection: 'column',
  },
  bannerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#D2AA1A',
  },
  section: {
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#020202',
  },
  seeAll: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#6F3E76',
  },
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E0E0E0',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#020202',
    marginBottom: 4,
  },
  cardLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#666666',
  },
  popularCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  popularCardImage: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
  },
  popularCardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  popularCardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#020202',
    marginBottom: 4,
  },
  popularCardLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#666666',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#C4A9D6',
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  navLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 4,
  },
  navLabelActive: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});

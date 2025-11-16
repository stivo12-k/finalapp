import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Gap} from '../../components/atoms';

const KOST_TYPES = ['Pria', 'Wanita', 'Campur'];
const FACILITIES = ['Bathroom', 'AC', 'WIFI', 'PARKING LOT'];

const FilterPage = ({navigation, route}: any) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceMin, setPriceMin] = useState(10);
  const [priceMax, setPriceMax] = useState(800);
  const [facilities, setFacilities] = useState<Record<string, boolean>>(() => {
    const obj: Record<string, boolean> = {};
    FACILITIES.forEach(f => (obj[f] = false));
    return obj;
  });

  const toggleFacility = (name: string) => {
    setFacilities(prev => ({...prev, [name]: !prev[name]}));
  };

  const onApply = () => {
    const selectedFacilities = Object.keys(facilities).filter(k => facilities[k]);
    const filters = {
      type: selectedType,
      price: [priceMin, priceMax],
      facilities: selectedFacilities,
    };
    if (route?.params?.onApply) {
      route.params.onApply(filters);
    }
    navigation.goBack();
  };

  const percentFor = (value: number) => {
    const min = 10;
    const max = 800;
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      <Text style={styles.title}>Fillter</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Kost Type</Text>
        <View style={styles.row}> 
          {KOST_TYPES.map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedType(prev => (prev === t ? null : t))}
              style={[
                styles.typeButton,
                selectedType === t && styles.typeButtonActive,
              ]}>
              <Text
                style={[
                  styles.typeText,
                  selectedType === t && styles.typeTextActive,
                ]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Gap height={16} />

        <Text style={styles.sectionTitle}>Harga per bulan</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>${priceMin}</Text>
          <Text style={styles.priceText}>${priceMax}</Text>
        </View>
        <View style={styles.sliderTrack}>
          <View style={styles.sliderFill} />
          <View
            style={[
              styles.thumb,
              {left: `${percentFor(priceMin)}%`} 
            ]}
          />
          <View
            style={[
              styles.thumb,
              {left: `${percentFor(priceMax)}%`} 
            ]}
          />
        </View>
        <View style={styles.priceControls}>
          <TouchableOpacity onPress={() => setPriceMin(p => Math.max(10, p - 10))} style={styles.ctrlBtn}><Text>-</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setPriceMin(p => Math.min(priceMax, p + 10))} style={styles.ctrlBtn}><Text>+</Text></TouchableOpacity>
          <View style={{flex:1}} />
          <TouchableOpacity onPress={() => setPriceMax(p => Math.max(priceMin, p - 10))} style={styles.ctrlBtn}><Text>-</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setPriceMax(p => Math.min(800, p + 10))} style={styles.ctrlBtn}><Text>+</Text></TouchableOpacity>
        </View>

        <Gap height={16} />

        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.rowWrap}>
          {FACILITIES.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => toggleFacility(f)}
              style={[
                styles.facilityBtn,
                facilities[f] && styles.facilityBtnActive,
              ]}>
              <Text style={[styles.facilityText, facilities[f] && styles.facilityTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Gap height={24} />
        <Button label="Apply" color="#6F3E76" textColor="#FFFFFF" onPress={onApply} />
        <Gap height={40} />
      </ScrollView>
    </View>
  );
};

export default FilterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E6E1E8',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 6,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 8,
    color: '#020202',
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#020202',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D9CFE4',
    paddingVertical: 14,
    marginRight: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: '#6F3E76',
    backgroundColor: '#FAF6FC',
  },
  typeText: {
    fontFamily: 'Poppins-Medium',
    color: '#6F3E76',
  },
  typeTextActive: {
    color: '#6F3E76',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceText: {
    fontFamily: 'Poppins-Medium',
    color: '#6F3E76',
  },
  sliderTrack: {
    height: 36,
    backgroundColor: '#EFEFF2',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  sliderFill: {
    position: 'absolute',
    left: '25%',
    right: '30%',
    height: 6,
    backgroundColor: '#E5D6F2',
    alignSelf: 'center',
    borderRadius: 4,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6F3E76',
    transform: [{translateX: -14}],
    top: 4,
  },
  priceControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ctrlBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE6F2',
    marginRight: 12,
  },
  facilityBtn: {
    width: 140,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9CFE4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  facilityBtnActive: {
    borderColor: '#6F3E76',
    backgroundColor: '#FAF6FC',
  },
  facilityText: {
    fontFamily: 'Poppins-Medium',
    color: '#6F3E76',
    fontSize: 12,
  },
  facilityTextActive: {
    color: '#6F3E76',
    fontWeight: '600',
  },
});

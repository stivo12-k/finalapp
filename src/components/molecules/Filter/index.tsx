import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import Svg, {Path} from 'react-native-svg';
import Gap from '../../atoms/Gap';

// Icons
import SearchIcon from '../../../assets/Hide.svg';

interface FilterProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  selectedPrice: number;
  onPriceChange: (price: number) => void;
  selectedFacilities: string[];
  onFacilitiesChange: (facilities: string[]) => void;
}

// Wrapper component untuk ACIcon dengan dynamic color (exact replica dari ac.svg)
const ACIconCustom = ({fill = '#020202'}: {fill?: string}) => (
  <Svg width={24} height={24} viewBox="0 0 14 15" fill="none">
    <Path
      d="M11 1H13M7 11V14M3 12V13M11 12V13M1 4H13V8H1V4Z"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Wrapper component untuk MaleIcon dengan dynamic color (exact replica dari male.svg)
const MaleIcon = ({fill = '#020202'}: {fill?: string}) => (
  <Svg width={24} height={24} viewBox="0 0 20 29" fill="none">
    <Path
      d="M20 9.99988C20 8.06471 19.4385 6.17111 18.3835 4.54875C17.3286 2.92639 15.8257 1.64497 14.0569 0.85989C12.2881 0.0748133 10.3295 -0.180185 8.41872 0.12582C6.50789 0.431825 4.7269 1.28569 3.29175 2.58385C1.8566 3.88201 0.828936 5.5687 0.333405 7.43935C-0.162125 9.31001 -0.104236 11.2843 0.500051 13.1227C1.10434 14.9611 2.22906 16.5846 3.73781 17.7965C5.24657 19.0083 7.07453 19.7564 9 19.9499V22.9999H5C4.73478 22.9999 4.48043 23.1052 4.29289 23.2928C4.10536 23.4803 4 23.7347 4 23.9999C4 24.2651 4.10536 24.5195 4.29289 24.707C4.48043 24.8945 4.73478 24.9999 5 24.9999H9V27.9999C9 28.2651 9.10536 28.5195 9.29289 28.707C9.48043 28.8945 9.73478 28.9999 10 28.9999C10.2652 28.9999 10.5196 28.8945 10.7071 28.707C10.8946 28.5195 11 28.2651 11 27.9999V24.9999H15C15.2652 24.9999 15.5196 24.8945 15.7071 24.707C15.8946 24.5195 16 24.2651 16 23.9999C16 23.7347 15.8946 23.4803 15.7071 23.2928C15.5196 23.1052 15.2652 22.9999 15 22.9999H11V19.9499C13.4654 19.699 15.7503 18.5428 17.4127 16.705C19.0751 14.8671 19.997 12.4781 20 9.99988ZM2 9.99988C2 8.41763 2.46919 6.87091 3.34824 5.55532C4.22729 4.23973 5.47672 3.21434 6.93853 2.60884C8.40034 2.00334 10.0089 1.84492 11.5607 2.1536C13.1126 2.46228 14.538 3.22421 15.6569 4.34303C16.7757 5.46185 17.5376 6.88731 17.8463 8.43916C18.155 9.99101 17.9965 11.5995 17.391 13.0613C16.7855 14.5232 15.7602 15.7726 14.4446 16.6516C13.129 17.5307 11.5823 17.9999 10 17.9999C7.87898 17.9976 5.84549 17.154 4.3457 15.6542C2.84592 14.1544 2.00232 12.1209 2 9.99988Z"
      fill={fill}
    />
  </Svg>
);

// Wrapper component untuk FemaleIcon dengan dynamic color (exact replica dari female.svg)
const FemaleIcon = ({fill = '#020202'}: {fill?: string}) => (
  <Svg width={24} height={24} viewBox="0 0 25 25" fill="none">
    <Path
      d="M24.0013 0H18.0013C17.7361 0 17.4817 0.105357 17.2942 0.292893C17.1066 0.48043 17.0013 0.734784 17.0013 1C17.0013 1.26522 17.1066 1.51957 17.2942 1.70711C17.4817 1.89464 17.7361 2 18.0013 2H21.5875L16.3288 7.25875C14.3424 5.63509 11.808 4.83697 9.2497 5.02946C6.69141 5.22195 4.30495 6.39033 2.58392 8.29295C0.862878 10.1956 -0.0610811 12.6869 0.00313652 15.2516C0.0673542 17.8163 1.11484 20.2582 2.92894 22.0723C4.74304 23.8864 7.18497 24.9339 9.74969 24.9981C12.3144 25.0624 14.8057 24.1384 16.7083 22.4174C18.6109 20.6963 19.7793 18.3099 19.9718 15.7516C20.1643 13.1933 19.3662 10.6589 17.7425 8.6725L23.0013 3.415V7C23.0013 7.26522 23.1066 7.51957 23.2942 7.70711C23.4817 7.89464 23.7361 8 24.0013 8C24.2665 8 24.5208 7.89464 24.7084 7.70711C24.8959 7.51957 25.0013 7.26522 25.0013 7V1C25.0013 0.734784 24.8959 0.48043 24.7084 0.292893C24.5208 0.105357 24.2665 0 24.0013 0ZM15.6563 20.6612C14.5373 21.7797 13.1118 22.5413 11.5601 22.8497C10.0083 23.1581 8.39999 22.9994 6.93839 22.3938C5.4768 21.7882 4.22758 20.7628 3.34869 19.4473C2.46979 18.1318 2.00069 16.5852 2.00069 15.0031C2.00069 13.421 2.46979 11.8745 3.34869 10.5589C4.22758 9.24342 5.4768 8.21804 6.93839 7.61243C8.39999 7.00683 10.0083 6.84819 11.5601 7.15658C13.1118 7.46497 14.5373 8.22654 15.6563 9.345C17.1543 10.847 17.9955 12.8818 17.9955 15.0031C17.9955 17.1245 17.1543 19.1592 15.6563 20.6612Z"
      fill={fill}
    />
  </Svg>
);

// Wrapper component untuk MixIcon dengan dynamic color (exact replica dari mix.svg)
const MixIcon = ({fill = '#020202'}: {fill?: string}) => (
  <Svg width={24} height={24} viewBox="0 0 21 27" fill="none">
    <Path
      d="M19.0117 0H14.0117C13.7464 0 13.4921 0.105357 13.3045 0.292893C13.117 0.48043 13.0117 0.734784 13.0117 1C13.0117 1.26522 13.117 1.51957 13.3045 1.70711C13.4921 1.89464 13.7464 2 14.0117 2H16.5979L13.4542 5.14375C12.5311 4.28349 11.4176 3.65378 10.2046 3.30605C8.99167 2.95833 7.71367 2.90245 6.475 3.14298C5.23633 3.38352 4.07212 3.91364 3.07746 4.69005C2.08281 5.46646 1.28591 6.46714 0.751862 7.61036C0.217814 8.75358 -0.0382393 10.0069 0.00461593 11.268C0.0474712 12.5291 0.388019 13.7621 0.998446 14.8665C1.60887 15.9708 2.47186 16.9151 3.51693 17.6222C4.56201 18.3293 5.75952 18.7791 7.01166 18.935V21H4.01166C3.74644 21 3.49209 21.1054 3.30455 21.2929C3.11701 21.4804 3.01166 21.7348 3.01166 22C3.01166 22.2652 3.11701 22.5196 3.30455 22.7071C3.49209 22.8946 3.74644 23 4.01166 23H7.01166V26C7.01166 26.2652 7.11701 26.5196 7.30455 26.7071C7.49209 26.8946 7.74644 27 8.01166 27C8.27687 27 8.53123 26.8946 8.71876 26.7071C8.9063 26.5196 9.01166 26.2652 9.01166 26V23H12.0117C12.2769 23 12.5312 22.8946 12.7188 22.7071C12.9063 22.5196 13.0117 22.2652 13.0117 22C13.0117 21.7348 12.9063 21.4804 12.7188 21.2929C12.5312 21.1054 12.2769 21 12.0117 21H9.01166V18.935C10.3521 18.7676 11.6281 18.263 12.7206 17.4685C13.8131 16.674 14.6863 15.6155 15.2586 14.3919C15.831 13.1684 16.0838 11.8196 15.9933 10.4718C15.9029 9.12405 15.4723 7.82118 14.7417 6.685L18.0117 3.41375V6C18.0117 6.26522 18.117 6.51957 18.3046 6.70711C18.4921 6.89464 18.7464 7 19.0117 7C19.2769 7 19.5312 6.89464 19.7188 6.70711C19.9063 6.51957 20.0117 6.26522 20.0117 6V1C20.0117 0.734784 19.9063 0.48043 19.7188 0.292893C19.5312 0.105357 19.2769 0 19.0117 0ZM8.01166 17C6.82497 17 5.66493 16.6481 4.67824 15.9888C3.69154 15.3295 2.92251 14.3925 2.46838 13.2961C2.01425 12.1997 1.89543 10.9933 2.12695 9.82946C2.35846 8.66557 2.9299 7.59647 3.76902 6.75736C4.60813 5.91824 5.67723 5.3468 6.84111 5.11529C8.005 4.88378 9.2114 5.0026 10.3078 5.45672C11.4041 5.91085 12.3412 6.67988 13.0005 7.66658C13.6598 8.65327 14.0117 9.81331 14.0117 11C14.01 12.5908 13.3773 14.116 12.2525 15.2408C11.1276 16.3657 9.60245 16.9983 8.01166 17Z"
      fill={fill}
    />
  </Svg>
);

// Wrapper component untuk WifiIcon dengan dynamic color
const WifiIconWrapper = ({fill = '#020202'}: {fill?: string}) => (
  <Svg width={24} height={24} viewBox="0 0 22 11" fill="none">
    <Path
      d="M1 6.00025C7 -0.66675 15 -0.66675 21 6.00025M5 10.0002C8.6 6.00025 13.4 6.00025 17 10.0002"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Wrapper component untuk BathroomIcon dengan dynamic color (exact replica dari bathroom.svg)
const BathroomIconWrapper = ({fill = '#020202'}: {fill?: string}) => (
  <Svg width={24} height={24} viewBox="0 0 20 19" fill="none">
    <Path
      d="M19 7H5V4C5 2.897 5.897 2 7 2C8.103 2 9 2.897 9 4H11C11 1.794 9.206 0 7 0C4.794 0 3 1.794 3 4V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8V10C0 12.606 1.674 14.823 4 15.65V19H6V16H14V19H16V15.65C18.326 14.823 20 12.606 20 10V8C20 7.73478 19.8946 7.48043 19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7ZM18 10C18 12.206 16.206 14 14 14H6C3.794 14 2 12.206 2 10V9H18V10Z"
      fill={fill}
    />
  </Svg>
);

// Wrapper component untuk ParkingIcon dengan dynamic color (exact replica dari parking.svg)
const ParkingIconWrapper = ({fill = '#020202'}: {fill?: string}) => (
  <Svg width={24} height={24} viewBox="0 0 24 16" fill="none">
    <Path
      d="M20.4 5.71429H19.8L15.7208 0.857857C15.4958 0.590209 15.2106 0.374146 14.8862 0.225654C14.5618 0.0771629 14.2064 4.28606e-05 13.8465 0H5.82488C4.8435 0 3.96113 0.568929 3.59663 1.43679L1.8 5.795C0.7665 6.05 0 6.93607 0 8V12C0 12.3157 0.2685 12.5714 0.6 12.5714H2.4C2.4 14.465 4.01175 16 6 16C7.98825 16 9.6 14.465 9.6 12.5714H14.4C14.4 14.465 16.0118 16 18 16C19.9883 16 21.6 14.465 21.6 12.5714H23.4C23.7315 12.5714 24 12.3157 24 12V9.14286C24 7.24929 22.3883 5.71429 20.4 5.71429ZM6 14.2857C5.00738 14.2857 4.2 13.5168 4.2 12.5714C4.2 11.6261 5.00738 10.8571 6 10.8571C6.99263 10.8571 7.8 11.6261 7.8 12.5714C7.8 13.5168 6.99263 14.2857 6 14.2857ZM8.7 5.71429H4.38488L5.82488 2.28571H8.7V5.71429ZM10.5 5.71429V2.28571H13.8465L16.7265 5.71429H10.5ZM18 14.2857C17.0074 14.2857 16.2 13.5168 16.2 12.5714C16.2 11.6261 17.0074 10.8571 18 10.8571C18.9926 10.8571 19.8 11.6261 19.8 12.5714C19.8 13.5168 18.9926 14.2857 18 14.2857Z"
      fill={fill}
    />
  </Svg>
);

const Filter = ({
  visible,
  onClose,
  onApply,
  searchText,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedPrice,
  onPriceChange,
  selectedFacilities,
  onFacilitiesChange,
}: FilterProps) => {
  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      onFacilitiesChange(selectedFacilities.filter(item => item !== facility));
    } else {
      onFacilitiesChange([...selectedFacilities, facility]);
    }
  };

  const handleReset = () => {
    onTypeChange(null);
    onPriceChange(800);
    onFacilitiesChange([]);
    onSearchChange('');
  };

  // Mapping facilities dengan icons
  const facilitiesWithIcons = [
    {name: 'Bathroom', icon: BathroomIconWrapper},
    {name: 'AC', icon: ACIconCustom},
    {name: 'WIFI', icon: WifiIconWrapper},
    {name: 'Parking Lot', icon: ParkingIconWrapper},
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
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
              onChangeText={onSearchChange}
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
                onPress={() => onTypeChange('Pria')}>
                <MaleIcon
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
                onPress={() => onTypeChange('Wanita')}>
                <FemaleIcon
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
                onPress={() => onTypeChange('Campur')}>
                <MixIcon
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

            {/* --- Harga per bulan --- */}
            <Text style={styles.filterSectionTitle}>Harga per bulan</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>${(100 * 1000).toLocaleString('id-ID')}</Text>
              <Text style={styles.priceText}>${(selectedPrice * 1000).toLocaleString('id-ID')}</Text>
              <Text style={styles.priceText}>${(500 * 1000).toLocaleString('id-ID')}</Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={100.000}
              maximumValue={500.000}
              step={50.000}
              value={selectedPrice}
              onValueChange={value => onPriceChange(value)}
              minimumTrackTintColor="#6F3E76"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#6F3E76"
            />

            {/* --- Facilities --- */}
            <Text style={styles.filterSectionTitle}>Facilities</Text>
            <View style={styles.optionContainer}>
              {facilitiesWithIcons.map(facility => {
                const IconComponent = facility.icon;
                const isSelected = selectedFacilities.includes(facility.name);
                return (
                  <TouchableOpacity
                    key={facility.name}
                    style={[
                      styles.optionButton,
                      styles.facilityButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => toggleFacility(facility.name)}>
                    <View style={styles.iconContainer}>
                      <IconComponent
                        fill={isSelected ? '#FFFFFF' : '#020202'}
                      />
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}>
                      {facility.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Gap height={20} />
          </ScrollView>

          {/* --- Tombol Action --- */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={onApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  modalSearchBar: {
    elevation: 0,
    backgroundColor: '#F3F3F3',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#020202',
    padding: 0,
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
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
  facilityButton: {
    flexBasis: '48%',
    minWidth: '48%',
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  resetButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
  },
  applyButton: {
    flex: 1,
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

export default Filter;

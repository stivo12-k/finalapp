import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft, Heart,  MapPin } from "lucide-react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const DetailPage = ({ route, navigation }) => {
  const { kost } = route.params;

  return (
    <View style={styles.container}>

      {/* Image + top buttons */}
      <View>
        <Image 
          source={typeof kost.image === 'string' ? { uri: kost.image } : kost.image}
          style={styles.mainImage}
          resizeMode="cover"
        />

        {/* Back + Wishlist */}
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={22} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleBtn}>
            <Heart size={22} color="#6F3E76" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Title + Price */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{kost.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <MapPin size={16} color="#666" />
              <Text style={styles.location}> {kost.location}</Text>
            </View>
          </View>

          <Text style={styles.price}>{kost.price}<Text style={styles.month}>/month</Text></Text>
        </View>

        {/* Type Kost */}
        <Text style={styles.sectionTitle}>Tipe Kost</Text>

        <View style={styles.typeRow}>
          <View style={styles.typeBox}><Ionicons name="male" size={18} color="#6F3E76" /><Text style={styles.typeText}>Pria</Text></View>
          <View style={styles.typeBox}><Ionicons name="female" size={18} color="#6F3E76" /><Text style={styles.typeText}>Wanita</Text></View>
          <View style={styles.typeBox}><Ionicons name="people" size={18} color="#6F3E76" /><Text style={styles.typeText}>Campur</Text></View>

        </View>

        {/* Facilities */}
        <Text style={styles.sectionTitle}>Facilities</Text>

        <View style={styles.facilitiesRow}>
          <View style={styles.facilityItem}><Ionicons name="water" size={18} color="#6F3E76" /><Text>Bathroom</Text></View>

          <View style={styles.facilityItem}><Ionicons name="snow" size={18} color="#6F3E76" /><Text>AC</Text></View>

          <View style={styles.facilityItem}><Ionicons name="wifi" size={18} color="#6F3E76" /><Text>WIFI</Text></View>
          <View style={styles.facilityItem}><Ionicons name="car" size={18} color="#6F3E76" /><Text>PARKING LOT</Text></View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.description}>{kost.description}</Text>

        {/* Owner */}
        <Text style={styles.sectionTitle}>Pemilik</Text>

        <View style={styles.ownerRow}>
          <Image 
            source={typeof kost.owner?.image === 'string' ? { uri: kost.owner.image } : kost.owner?.image}
            style={styles.ownerImage}
          />
          <View>
            <Text style={styles.ownerName}>{kost.owner.name}</Text>
            <Text style={styles.ownerJob}>{kost.owner.job}</Text>

            {/* Contacts */}
            <View style={styles.contactRow}>
              <Ionicons name="call" size={16} color="#6F3E76" />
              <Text style={styles.ownerPhone}>{kost.owner.phone}</Text>
            </View>

            <View style={styles.contactRow}>
              <Ionicons name="mail" size={16} color="#6F3E76" />
              <Text style={styles.ownerEmail}>{kost.owner.email}</Text>
            </View>
          </View>
        </View>

        {/* Map */}
        <Text style={styles.sectionTitle}>Location</Text>

        <View style={styles.mapPlaceholder}>
          <Image 
            source={require("../../assets/map-example.png")} 
            style={styles.mapImg} 
          />
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactText}>Hubungi Pemilik</Text>
      </TouchableOpacity>

    </View>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* Image */
  mainImage: {
    width: "100%",
    height: 260,
  },

  topButtons: {
    position: "absolute",
    top: 40,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  circleBtn: {
    width: 42,
    height: 42,
    backgroundColor: "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
  },

  /* Title & Price */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  location: {
    fontSize: 14,
    color: "#777",
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6F3E76",
  },

  month: {
    color: "#999",
    fontSize: 12,
    fontWeight: "normal",
  },

  /* Section */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 8,
  },

  /* Type Kost */
  typeRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },

  typeBox: {
    borderWidth: 1,
    borderColor: "#6F3E76",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  typeText: {
    fontSize: 14,
    color: "#333",
  },

  /* Facilities */
  facilitiesRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    flexWrap: "wrap",
    gap: 12,
  },

  facilityItem: {
    borderWidth: 1,
    borderColor: "#6F3E76",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  /* Description */
  description: {
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  /* Owner */
  ownerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 14,
  },

  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  ownerName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  ownerJob: {
    fontSize: 13,
    color: "#777",
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6
  },

  ownerPhone: {
    fontSize: 14,
    color: "#333",
  },

  ownerEmail: {
    fontSize: 14,
    color: "#333",
  },

  /* MAP */
  mapPlaceholder: {
    height: 170,
    marginHorizontal: 20,
    backgroundColor: "#EEE",
    borderRadius: 12,
    overflow: "hidden",
  },

  mapImg: {
    width: "100%",
    height: "100%",
  },

  /* Bottom Button */
  contactButton: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: "#6F3E76",
    paddingVertical: 16,
    borderRadius: 14,
  },

  contactText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Button,
} from "react-native";
import { WebView } from "react-native-webview";
import styles from "../styles/InteractiveMapStyles";
import SearchIcon from "../assets/images/magnifying-glass-solid.svg";
import UserIcon from "../assets/images/circle-user-solid.svg";
import LogoutScreen from "./LogoutScreen";
import BuildingIcon from "../assets/images/building-solid.svg";
import RoomIcon from "../assets/images/door-closed-solid.svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("window");
const searchWidth = width - 48 - 48;

export default function InteractiveMap({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerWidthAnim = useRef(
    new Animated.Value(searchWidth)
  ).current;
  const userContainerAnim = useRef(new Animated.Value(1)).current;
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const data = require("../assets/data/campus_buildings.json");
  // Handle search
  const handleSearch = (text) => {
    setSearchText(text);
    const searchQuery = text.toLowerCase();

    // If text is empty, clear filtered suggestions
    if (text.trim() === "") {
      setFilteredSuggestions([]); // Clear the suggestions
      return; // Exit early
    }

    const filteredBuildings = data.buildings
      .filter(
        (building) =>
          building.building_key.toLowerCase().includes(searchQuery) ||
          building.building_name.toLowerCase().includes(searchQuery)
      )
      .map((building) => ({
        type: "building",
        key: building.building_key,
        name: building.building_name,
      }));

    const filteredRooms = data.buildings.flatMap((building) =>
      building.floors.flatMap((floor) =>
        floor.rooms
          .filter(
            (room) =>
              room.room_id?.toLowerCase().includes(searchQuery) ||
              room.room_name.toLowerCase().includes(searchQuery)
          )
          .map((room) => ({
            type: "room",
            id: room.room_id,
            name: room.room_name,
            location: `${building.building_name} | ${ordinalSuffixOf(
              floor.floor_number
            )} floor`,
          }))
      )
    );

    setFilteredSuggestions(
      [...filteredBuildings, ...filteredRooms].slice(0, 7)
    );
  };

  // Helper function for ordinal suffix
  const ordinalSuffixOf = (i) => {
    const j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "40%"], []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current.expand();
    bottomSheetRef.current.snapToIndex(0);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);

    Animated.timing(searchContainerWidthAnim, {
      toValue: searchWidth + 48,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(userContainerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);

    //Default for adjustments
    Animated.timing(searchContainerWidthAnim, {
      toValue: searchWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(userContainerAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const toggleUserPopup = () => {
    setUserPopupVisible(!isUserPopupVisible);
  };

  //LOG DATA LOCATION TEST, will be removed after debugging
  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(`Latitude: ${data.lat}, Longitude: ${data.lng}`);
  };
  // ============================================================
  const images = [
    { id: "1", uri: "https://via.placeholder.com/150" },
    { id: "2", uri: "https://via.placeholder.com/150" },
    { id: "3", uri: "https://via.placeholder.com/150" },
    { id: "4", uri: "https://via.placeholder.com/150" },
    { id: "5", uri: "https://via.placeholder.com/150" },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={require("../assets/maps/maps.html")}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleWebViewMessage}
        style={styles.map}
        debuggingEnabled={true}
        r
      />
      <View style={styles.topContainer}>
        <Animated.View
          style={[
            styles.searchContainer,
            { width: searchContainerWidthAnim }, // Animated width
          ]}
        >
          <View style={styles.searchIconContainer}>
            <SearchIcon />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            value={searchText}
            onChangeText={handleSearch}
            onFocus={handleFocus}
            onBlur={() => {
              handleBlur();
              setFilteredSuggestions([]);
            }}
          />
        </Animated.View>
        {filteredSuggestions.length > 0 && (
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestionsContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  setSearchText(item.name); // Or set the room/building data
                  setFilteredSuggestions([]); // Clear suggestions after selection
                }}
              >
                <View style={styles.suggestionContent}>
                  <View style={styles.suggestionIconContainer}>
                    {item.type === "building" ? (
                      <BuildingIcon /> // Use your building icon here
                    ) : (
                      <RoomIcon /> // Use your room icon here
                    )}
                  </View>
                  <View style={styles.suggestionTextsContainer}>
                    <Text
                      style={styles.suggestionText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.type === "building"
                        ? `Building ${item.key} | ${item.name}`
                        : item.id
                        ? `Room ${item.id} | ${item.name}`
                        : `Room ${item.name}`}
                    </Text>
                    {item.type === "room" && (
                      <Text
                        style={styles.suggestionSubText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.location}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <Animated.View
          style={[
            styles.userContainer,
            {
              opacity: userContainerAnim,
              transform: [{ scale: userContainerAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.userButton} onPress={toggleUserPopup}>
            <UserIcon />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {isUserPopupVisible && (
        <LogoutScreen onClose={toggleUserPopup} navigation={navigation} />
      )}

      <TouchableOpacity
        style={styles.tryButton}
        onPress={openBottomSheet}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>TITS AND BITCHES</Text>
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        handleStyle={styles.handleStyle}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Main Text */}
          <Text style={styles.mainText}>DRER Memorial Hall </Text>

          {/* Sub Text */}
          <Text style={styles.subText}>Gymnasium</Text>

          {/* FlatList for Images */}
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={{ uri: item.uri }} style={styles.image} />
            )}
            contentContainerStyle={styles.flatlistContainer}
          />

          {/* Description Text */}
          <Text style={styles.description}>
            Dr. Ricardo E. Rotoras Memorial Hall is a multi-purpose gymnasium
            for most academic and non-academic events involving large crowds.
          </Text>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        handleStyle={styles.handleStyle}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Main Text */}
          <Text style={styles.mainText}>DRER Memorial Hall </Text>

          {/* Sub Text */}
          <Text style={styles.subText}>Gymnasium</Text>

          {/* FlatList for Images */}
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={{ uri: item.uri }} style={styles.image} />
            )}
            contentContainerStyle={styles.flatlistContainer}
          />

          {/* Description Text */}
          <Text style={styles.description}>
            Dr. Ricardo E. Rotoras Memorial Hall is a multi-purpose gymnasium
            for most academic and non-academic events involving large crowds.
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

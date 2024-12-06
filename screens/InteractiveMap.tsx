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
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("window");

export default function InteractiveMap({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerWidthAnim = useRef(
    new Animated.Value(width - 48 - 48)
  ).current;
  const userContainerAnim = useRef(new Animated.Value(1)).current;
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const inputRef = useRef(null); // Ref for the TextInput
  const [selection, setSelection] = useState({ start: 0, end: 0 }); // Controlled selection
  const [selectedItem, setSelectedItem] = useState(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0); // Open the BottomSheet
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(-1); // Close the BottomSheet
  };

  const data = require("../assets/data/campus_buildings.json");
  // Handle search
  const handleSearch = (text) => {
    setSearchText(text);
    setSelection({ start: text.length, end: text.length });
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
        image: building.building_image,
        description: building.building_description,
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

  const handleFocus = () => {
    closeBottomSheet();
    setIsFocused(true);
    setSearchText(""); // Clear the search input
    setFilteredSuggestions([]); // Clear suggestions on focus
    setSelection({ start: 0, end: 0 }); // Reset cursor to the start

    Animated.timing(searchContainerWidthAnim, {
      toValue: width - 48,
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
    setFilteredSuggestions([]);
    setSelection({ start: 0, end: 0 });

    //Default for adjustments
    Animated.timing(searchContainerWidthAnim, {
      toValue: width - 48 - 48,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(userContainerAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleUserPopup = () => {
    setUserPopupVisible(!isUserPopupVisible);
  };

  //LOG DATA LOCATION TEST, will be removed after debugging
  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(`Latitude: ${data.lat}, Longitude: ${data.lng}`);
  };
  // ============================================================

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
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            value={searchText}
            onChangeText={handleSearch}
            selection={selection}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Animated.View>
        {filteredSuggestions.length > 0 && (
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestionsContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  const formattedText =
                    item.type === "building"
                      ? `${item.key} | ${item.name}`
                      : item.id
                      ? `${item.id} | ${item.name}`
                      : `${item.name}`;

                  setSearchText(formattedText);
                  setFilteredSuggestions([]); // Clear suggestions after selection
                  inputRef.current?.blur(); // Blur the input field

                  if (item.type === "building") {
                    setSelectedItem({
                      name: item.name,
                      key: item.key,
                      type: item.type,
                      image: item.image,
                      description: item.description,
                    });
                  } else {
                    setSelectedItem({
                      id: item.id,
                      name: item.name,
                    });
                  }
                  openBottomSheet();
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

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1} // Control visibility with this prop
        handleStyle={styles.handleStyle}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Main Text */}
          <Text style={styles.mainText}>
            {selectedItem
              ? selectedItem.type === "building"
                ? selectedItem.name // Display building name
                : `${selectedItem.id} | ${selectedItem.name}` // Display room info
              : "Select a building or room"}
          </Text>

          {/* Sub Text */}
          {selectedItem && selectedItem.type === "building" ? (
            <Text style={styles.subText}>Building {selectedItem.key}</Text> // Show building key
          ) : (
            selectedItem &&
            selectedItem.type === "room" && (
              <Text style={styles.subText}>
                {selectedItem.floor_number} | {selectedItem.name} //
                Show floor and building name
              </Text>
            )
          )}

          {/* Images */}
          {selectedItem &&
            selectedItem.type === "building" &&
            selectedItem.image && (
              <BottomSheetFlatList
                data={[{ uri: selectedItem.image }]} // Display the building image
                horizontal
                keyExtractor={(item) => item.uri}
                renderItem={({ item }) => (
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.uri }} style={styles.image} />
                  </View>
                )}
                contentContainerStyle={styles.flatlistContainer}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                snapToInterval={200 + 8}
                scrollEnabled
              />
            )}

          {/* Description Text */}
          {selectedItem && selectedItem.type === "building" ? (
            <Text style={styles.description}>
              {selectedItem.description}
            </Text> // Show building description
          ) : (
            selectedItem &&
            selectedItem.type === "room" && (
              <Text style={styles.description}>
                {selectedItem.room_type} room located in{" "}
                {selectedItem.building_name}
              </Text> // Show room description
            )
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

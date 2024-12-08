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
  Keyboard,
  TouchableWithoutFeedback,
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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../.firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

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
  const [isSearchActive, setIsSearchActive] = useState(false); // Track if search suggestion was clicked

  const openBottomSheet = () => {
    bottomSheetRef.current.snapToIndex(0); // Open the BottomSheet
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close(); // Close the BottomSheet
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
            image: building.building_image,
            room_type: room.room_type,
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

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleFocus = () => {
    setIsFocused(true);
    setSearchText(""); // Clear the search input
    setFilteredSuggestions([]); // Clear suggestions on focus
    setSelection({ start: 0, end: 0 }); // Reset cursor to the start
    closeBottomSheet(); // Close bottom sheet if no search suggestion was clicked

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
    if (inputRef.current) {
      inputRef.current.blur(); // Ensure blur is triggered
    }
    setTimeout(() => {
      Keyboard.dismiss(); // Ensure keyboard is dismissed
    }, 100);

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

    openBottomSheet();
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

  const logSelectionHistory = async (selection) => {
    const user = auth.currentUser; // Get the currently authenticated user

    // If no user is logged in, return
    if (!user) {
      console.log("No user logged in. History not saved.");
      return;
    }

    const historyData = {
      searchTerm: selection.name, // Store the name of the selected building or room
      timestamp: new Date().toISOString(), // Store the timestamp of when the selection was made
    };

    try {
      const historyRef = collection(db, "users", user.uid, "history");
      await addDoc(historyRef, historyData);
      
      console.log("History saved successfully.");
    } catch (error) {
      console.error("Error saving search history: ", error.message);
    }
  };

  const handleWebViewClick = () => {
    // Prevent the keyboard from showing when interacting with WebView
    Keyboard.dismiss();
  };

  const imageMap = {
    "01_ArtsAndCulture(1).jpg": require("../assets/data/01_ArtsAndCulture(1).jpg"),
    "02_ModularClassroom(1).jpg": require("../assets/data/02_ModularClassroom(1).jpg"),
    "03_CollegeOfMedicine(2).jpg": require("../assets/data/03_CollegeOfMedicine(2).jpg"),
    "04_BuildingsAndGroundMaintenanceUnit(1).jpg": require("../assets/data/04_BuildingsAndGroundMaintenanceUnit(1).jpg"),
    "05_OldEngineeringBuilding(2).jpg": require("../assets/data/05_OldEngineeringBuilding(2).jpg"),
    "06_ChildMindingBuilding(1).jpg": require("../assets/data/06_ChildMindingBuilding(1).jpg"),
    "09_ICTBuilding(1).jpg": require("../assets/data/09_ICTBuilding(1).jpg"),
    "10_AdministrationBuilding(1).jpg": require("../assets/data/10_AdministrationBuilding(1).jpg"),
    "14_FinanceAndAccounting(1).jpg": require("../assets/data/14_FinanceAndAccounting(1).jpg"),
    "15_GymnasiumLobby(1).jpg": require("../assets/data/15_GymnasiumLobby(1).jpg"),
    "16_DRERMemorialHall.jpg": require("../assets/data/16_DRERMemorialHall.jpg"),
    "18_CulinaryBuilding.jpg": require("../assets/data/18_CulinaryBuilding.jpg"),
    "19_ROTCBuilding(1).jpg": require("../assets/data/19_ROTCBuilding(1).jpg"),
    "20_CafeteriaBuilding(1).jpg": require("../assets/data/20_CafeteriaBuilding(1).jpg"),
    "21_GuardHouse(1).jpg": require("../assets/data/21_GuardHouse(1).jpg"),
    "23_LearningResourceCenter(1).jpg": require("../assets/data/23_LearningResourceCenter(1).jpg"),
    "24_FoodTradeBuilding(1).jpg": require("../assets/data/24_FoodTradeBuilding(1).jpg"),
    "25_FoodInnovationCenter(2).jpg": require("../assets/data/25_FoodInnovationCenter(2).jpg"),
    "28_OldScienceBuilding(1).jpg": require("../assets/data/28_OldScienceBuilding(1).jpg"),
    "36_MakeshiftFabricationLaboratory(1).jpg": require("../assets/data/36_MakeshiftFabricationLaboratory(1).jpg"),
    "41_ScienceComplexBuilding(1).jpg": require("../assets/data/41_ScienceComplexBuilding(1).jpg"),
    "42_EngineeringComplexA(1).jpg": require("../assets/data/42_EngineeringComplexA(1).jpg"),
    "43_EngineeringComplexB(1).jpg": require("../assets/data/43_EngineeringComplexB(1).jpg"),
    "45_SupplyBuilding.jpg": require("../assets/data/45_SupplyBuilding.jpg"),
    "47_CollegeOfTechnologyBuilding(1).jpg": require("../assets/data/47_CollegeOfTechnologyBuilding(1).jpg"),
    "48_EngineeringDesignFabricationLaboratory(1).jpg": require("../assets/data/48_EngineeringDesignFabricationLaboratory(1).jpg"),
  };

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
        onTouchStart={handleWebViewClick}
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
                  setIsSearchActive(true);
                  openBottomSheet();

                  logSelectionHistory({
                    name: formattedText, // Use the formatted selection name
                  });

                  if (item.type === "building") {
                    setSelectedItem({
                      type: "building",
                      name: item.name,
                      key: item.key,
                      image: item.image,
                      description: item.description,
                    });
                  } else {
                    setSelectedItem({
                      type: "room",
                      id: item.id,
                      name: item.name,
                      location: item.location,
                      image: item.image,
                      room_type: item.room_type,
                    });

                    // Log the selection history to Firestore
                    logSelectionHistory({
                      type: item.type,
                      name: item.name,
                      location: item.location,
                      room_type: item.room_type,
                    });
                  }
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
        index={-1}
        backgroundStyle={styles.bottomSheet}
        handleStyle={styles.handleStyle}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Main Text */}
          <Text style={styles.mainText}>
            {selectedItem
              ? selectedItem.type === "building"
                ? selectedItem.name // Display building name
                : selectedItem.id
                ? `${selectedItem.id} | ${selectedItem.name}` // Display room info with ID
                : selectedItem.name // Display room name only if ID is null
              : "Select a building or room"}
          </Text>

          {/* Sub Text */}
          {selectedItem && selectedItem.type === "building" ? (
            <Text style={styles.subText}>Building {selectedItem.key}</Text> // Show building key
          ) : (
            selectedItem &&
            selectedItem.type === "room" && (
              <Text style={styles.subText}>{selectedItem.location}</Text> // Show room location
            )
          )}

          {/* Image */}

          {selectedItem && selectedItem.image && (
            <TouchableOpacity
              onPress={() => {
                console.log(selectedItem.image);
              }}
              style={styles.imageWrapper}
            >
              <Image
                source={imageMap[selectedItem.image]} // Use the mapped image
                style={styles.image}
              />
            </TouchableOpacity>
          )}

          {/* Description Text */}
          {selectedItem && selectedItem.type === "building" ? (
            <Text style={styles.description}>{selectedItem.description}</Text> // Show building description
          ) : (
            selectedItem &&
            selectedItem.type === "room" && (
              <Text style={styles.description}>{selectedItem.room_type}</Text> // Show room type (or other details)
            )
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

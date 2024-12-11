import React, { useState, useRef, useMemo, useEffect } from "react";
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
  Pressable,
  Button,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import styles from "../styles/InteractiveMapStyles";
import SearchIcon from "../assets/images/icons/magnifying-glass-solid.svg";
import UserIcon from "../assets/images/icons/circle-user-solid.svg";
import LogoutScreen from "./AccountSettingsPopUp";
import BuildingIcon from "../assets/images/icons/building-solid.svg";
import RoomIcon from "../assets/images/icons/door-closed-solid.svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../.firebase/firebaseConfig";
import * as Location from "expo-location";

export default function InteractiveMap({ navigation }) {
  const { width, height } = Dimensions.get("window");

  // SEARCH BAR ==============================================================================
  const searchContainerWidthAnim = useRef(
    new Animated.Value(width - 48 - 48)
  ).current;
  const userContainerAnim = useRef(new Animated.Value(1)).current;
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [selectedItem, setSelectedItem] = useState(null);

  // USER ACCOUNT ============================================================================
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);

  // WEBVIEW =================================================================================
  const webViewRef = useRef(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // BOTTOM SHEET ============================================================================
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "25%", "50%"], []);

  // CAMPUS BUILDINGS AND ROOMS DATA =========================================================
  const data = require("../assets/data/campus_buildings.json");

  const imageMap = {
    "01_ArtsAndCulture(1).jpg": require("../assets/images/buildingImages/01_ArtsAndCulture(1).jpg"),
    "02_ModularClassroom(1).jpg": require("../assets/images/buildingImages/02_ModularClassroom(1).jpg"),
    "03_CollegeOfMedicine(2).jpg": require("../assets/images/buildingImages/03_CollegeOfMedicine(2).jpg"),
    "04_BuildingsAndGroundMaintenanceUnit(1).jpg": require("../assets/images/buildingImages/04_BuildingsAndGroundMaintenanceUnit(1).jpg"),
    "05_OldEngineeringBuilding(2).jpg": require("../assets/images/buildingImages/05_OldEngineeringBuilding(2).jpg"),
    "06_ChildMindingBuilding(1).jpg": require("../assets/images/buildingImages/06_ChildMindingBuilding(1).jpg"),
    "09_ICTBuilding(1).jpg": require("../assets/images/buildingImages/09_ICTBuilding(1).jpg"),
    "10_AdministrationBuilding(1).jpg": require("../assets/images/buildingImages/10_AdministrationBuilding(1).jpg"),
    "14_FinanceAndAccounting(1).jpg": require("../assets/images/buildingImages/14_FinanceAndAccounting(1).jpg"),
    "15_GymnasiumLobby(1).jpg": require("../assets/images/buildingImages/15_GymnasiumLobby(1).jpg"),
    "16_DRERMemorialHall.jpg": require("../assets/images/buildingImages/16_DRERMemorialHall.jpg"),
    "18_CulinaryBuilding.jpg": require("../assets/images/buildingImages/18_CulinaryBuilding.jpg"),
    "19_ROTCBuilding(1).jpg": require("../assets/images/buildingImages/19_ROTCBuilding(1).jpg"),
    "20_CafeteriaBuilding(1).jpg": require("../assets/images/buildingImages/20_CafeteriaBuilding(1).jpg"),
    "21_GuardHouse(1).jpg": require("../assets/images/buildingImages/21_GuardHouse(1).jpg"),
    "23_LearningResourceCenter(1).jpg": require("../assets/images/buildingImages/23_LearningResourceCenter(1).jpg"),
    "24_FoodTradeBuilding(1).jpg": require("../assets/images/buildingImages/24_FoodTradeBuilding(1).jpg"),
    "25_FoodInnovationCenter(2).jpg": require("../assets/images/buildingImages/25_FoodInnovationCenter(2).jpg"),
    "28_OldScienceBuilding(1).jpg": require("../assets/images/buildingImages/28_OldScienceBuilding(1).jpg"),
    "36_MakeshiftFabricationLaboratory(1).jpg": require("../assets/images/buildingImages/36_MakeshiftFabricationLaboratory(1).jpg"),
    "41_ScienceComplexBuilding(1).jpg": require("../assets/images/buildingImages/41_ScienceComplexBuilding(1).jpg"),
    "42_EngineeringComplexA(1).jpg": require("../assets/images/buildingImages/42_EngineeringComplexA(1).jpg"),
    "43_EngineeringComplexB(1).jpg": require("../assets/images/buildingImages/43_EngineeringComplexB(1).jpg"),
    "45_SupplyBuilding.jpg": require("../assets/images/buildingImages/45_SupplyBuilding.jpg"),
    "47_CollegeOfTechnologyBuilding(1).jpg": require("../assets/images/buildingImages/47_CollegeOfTechnologyBuilding(1).jpg"),
    "48_EngineeringDesignFabricationLaboratory(1).jpg": require("../assets/images/buildingImages/48_EngineeringDesignFabricationLaboratory(1).jpg"),
  };

  // SEARCH BAR FUNCTIONALITY ================================================================
  const handleSearch = (text) => {
    setSearchText(text);
    setSelection({ start: text.length, end: text.length });
    const searchQuery = text.toLowerCase();

    if (text.trim() === "") {
      setFilteredSuggestions([]);
      return;
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
        coordinates: building.coordinates,
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
            coordinates: building.coordinates,
          }))
      )
    );

    setFilteredSuggestions(
      [...filteredBuildings, ...filteredRooms].slice(0, 7)
    );
  };

  const ordinalSuffixOf = (i) => {
    const j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  };

  const handleFocus = () => {
    closeBottomSheet();
    setSearchText("");
    setSelection({ start: 0, end: 0 });

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
    openBottomSheet();

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

  // USER ACCOUNT FUNCTIONALITY ==============================================================
  const toggleUserPopup = () => {
    setUserPopupVisible(!isUserPopupVisible);
  };

  const logSelectionHistory = async (selection) => {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user logged in. History not saved.");
      return;
    }

    const historyData = {
      searchTerm: selection.name,
      timestamp: new Date().toISOString(),
    };

    try {
      const historyRef = collection(db, "users", user.uid, "history");
      await addDoc(historyRef, historyData);

      console.log("History saved successfully.");
    } catch (error) {
      console.error("Error saving search history: ", error.message);
    }
  };

  // WEBVIEW FUNCTIONALITY ===================================================================
  // LOG DATA LOCATION TEST, will be removed after debugging
  const handleWebViewMessage = (event: any) => {};
  // ============================================================

  const handleWebViewClick = () => {
    Keyboard.dismiss();
  };

  // BOTTOM SHEET FUNCTIONALITY ==============================================================
  const openBottomSheet = () => {
    bottomSheetRef.current.snapToIndex(1);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };


  const [startCoordinates, setStartCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); 
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setStartCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  // Function to send navigation data to WebView
  const sendNavigationData = () => {
    if (webViewRef.current && startCoordinates.lat && startCoordinates.lng && selectedItem?.coordinates) {
      const navigationData = {
        start: startCoordinates,
        end: selectedItem.coordinates, // Assuming selectedItem holds the destination's coordinates
      };

      webViewRef.current.postMessage(JSON.stringify(navigationData));
      console.log("Sending data to WebView:", navigationData);
    } else {
      console.error("Missing start or end coordinates");
    }
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={require("../assets/index.html")}
        allowFileAccess={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleWebViewMessage}
        style={styles.map}
        debuggingEnabled={true}
        geolocationEnabled={true}
        onTouchStart={handleWebViewClick}
        nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
        startInLoadingState={true}
      />
      <Button title="Start Navigation" />
      <View style={styles.topContainer}>
        <Animated.View
          style={[styles.searchContainer, { width: searchContainerWidthAnim }]}
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
                  setFilteredSuggestions([]);
                  inputRef.current?.blur();

                  logSelectionHistory({
                    name: formattedText,
                  });

                  if (item.type === "building") {
                    setSelectedItem({
                      type: "building",
                      name: item.name,
                      key: item.key,
                      image: item.image,
                      description: item.description,
                      coordinates: item.coordinates || { lat: 0, lng: 0 },
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
                    logSelectionHistory({
                      type: item.type,
                      name: item.name,
                      location: item.location,
                      room_type: item.room_type,
                      coordinates: item.coordinates,
                    });
                  }
                }}
              >
                <View style={styles.suggestionContent}>
                  <View style={styles.suggestionIconContainer}>
                    {item.type === "building" ? <BuildingIcon /> : <RoomIcon />}
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
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.mainText}>
            {selectedItem
              ? selectedItem.type === "building"
                ? selectedItem.name
                : selectedItem.id
                ? `${selectedItem.id} | ${selectedItem.name}`
                : selectedItem.name
              : "Select a building or room"}
          </Text>
          {selectedItem && selectedItem.type === "building" ? (
            <Text style={styles.subText}>Building {selectedItem.key}</Text>
          ) : (
            selectedItem &&
            selectedItem.type === "room" && (
              <Text style={styles.subText}>{selectedItem.location}</Text>
            )
          )}

          {selectedItem && selectedItem.image && (
            <TouchableOpacity
              onPress={() => {
                console.log(selectedItem.image);
              }}
              style={styles.imageWrapper}
            >
              <Image
                source={imageMap[selectedItem.image]}
                style={styles.image}
              />
            </TouchableOpacity>
          )}

          {selectedItem && selectedItem.type === "building" ? (
            <Text style={styles.description}>{selectedItem.description}</Text>
          ) : (
            selectedItem &&
            selectedItem.type === "room" && (
              <Text style={styles.description}>
                This {selectedItem.room_type} is located on the{" "}
                {selectedItem.location}.
              </Text>
            )
          )}
          <TouchableOpacity onPress={sendNavigationData}><Text>Navigate</Text></TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

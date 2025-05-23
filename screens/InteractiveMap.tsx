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

  // BOTTOM SHEET ============================================================================
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

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
  const handleSearch = async (text) => {
    setSearchText(text);
    setSelection({ start: text.length, end: text.length });

    if (text.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    try {
      const response = await fetch("http://<YOUR_BACKEND_URL>/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: text }),
      });

      const results = await response.json();

      // Format the results for display
      const formattedResults = results.slice(0, 10).map((item) => {
        if (item.type === "building") {
          return {
            ...item,
            displayText: `Building ${item.key} | ${item.name}`,
          };
        } else if (item.type === "room") {
          const roomIdPart = item.id ? `Room ${item.id} | ` : "Room ";
          return {
            ...item,
            displayText: `${roomIdPart}${item.name}\n${item.location}`,
          };
        }
        return item; // fallback
      });

      setFilteredSuggestions(formattedResults);
    } catch (error) {
      console.error("Error fetching semantic search results:", error);
      setFilteredSuggestions([]);
    }
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

  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === "building") {
      setSelectedItem(data);
      openBottomSheet(); // Open the bottom sheet
      setSearchText("");
    } else if (data.lat && data.lng) {
      console.log(`[${data.lat}, ${data.lng}],`);
    }
  };

  const handleWebViewClick = () => {
    Keyboard.dismiss();
  };

  // MIRACLE CODE - MAKES THE WEBVIEW DETECT THE LOCATION PERMISSION FOR SOME REASON

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  // MIRACLE CODE - MAKES THE WEBVIEW DETECT THE LOCATION PERMISSION FOR SOME REASON

  // BOTTOM SHEET FUNCTIONALITY ==============================================================
  const openBottomSheet = () => {
    bottomSheetRef.current.snapToIndex(0);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  const [startCoordinates, setStartCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
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

  useEffect(() => {
    if (selectedItem?.coordinates) {
      sendNavigationData(); // Call sendNavigationData when coordinates are available
    }
  }, [selectedItem]);
  const sendNavigationData = () => {
    if (webViewRef.current) {
      const navigationData = {
        end: selectedItem?.coordinates || null, // Send null if no destination is selected
      };
      webViewRef.current.postMessage(JSON.stringify(navigationData));
      console.log("Sending data to WebView:", navigationData);
    } else {
      console.error("Missing start coordinates");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ uri: "https://utrace.netlify.app/" }}
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
                      coordinates: item.coordinates || { lat: 0, lng: 0 },
                    });
                    logSelectionHistory({
                      type: item.type,
                      name: item.name,
                      location: item.location,
                      room_type: item.room_type,
                      coordinates: item.coordinates,
                    });
                  }
                  sendNavigationData();
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
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

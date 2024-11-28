import { popup } from "leaflet";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "FAFAFA",
  },
  map: {
    flex: 1,
    backgroundColor: "FAFAFA",
    width: width,
    height: height,
  },
  topContainer: {
    position: "absolute",
    top: 64,
    width: "100%",
    paddingHorizontal: 24,
    flexDirection: "row",
    gap: 8,
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIconContainer: {
    paddingVertical: 8,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
    color: "#FDB218",
  },
  searchInput: {
    flex: 1,
    height: "100%",
  },
  userContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "white",
  },
  userButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  tryButton: {
    position: "absolute",
    paddingVertical: 15,
    paddingHorizontal: 125,
    backgroundColor: "#FDB218",
    borderRadius: 5,
    alignItems: "center",
    top: "30%",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  gestureHandler: {
    flex: 1,
    zIndex: 5,
  },
  bottomSheetContent: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  bottomSheetText: {
    fontSize: 18,
    marginBottom: 20,
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  popupContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  popupHeaderContainer: {
    paddingRight: 20,
    paddingBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  popupHeaderText: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    textAlign: "left",
  },
  popupInformationContainer: {
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
  },
  popupUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  popupHistoryContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  popupHistoryText: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    textAlign: "left",
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10,
  },
  historyText: {
    marginHorizontal: 10,
    color: "#777",
    fontSize: 12,
  },
  todayText: {
    marginTop: 10,
    marginHorizontal: 10,
    color: "#777",
    fontSize: 14,
  },

  logoutButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#FDB218",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  
  //Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

});

export default styles;

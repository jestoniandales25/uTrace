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
    width: 300,  // Default width
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
    width: "90%",
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

});

export default styles;

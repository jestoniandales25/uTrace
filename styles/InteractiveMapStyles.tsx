import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const searchWidth = width - 48 - 48;

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
    width: searchWidth,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
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
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 16,
  },
  userContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  userButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  suggestionsContainer: {
    position: "absolute",
    paddingTop: 20,
    paddingHorizontal: 12,
    top: 20,
    left: 24,
    right: 24,
    backgroundColor: "white",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    maxHeight: 180,
  },
  suggestionItem: {
    height: 40,
    justifyContent: "center",
  },
  suggestionIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 8,
  },
  suggestionTextsContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  suggestionText: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
    color: "151515",
  },
  suggestionSubText: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 8,
    color: "666666",
  },
  suggestionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tryButton: {
    position: "absolute",
    paddingVertical: 15,
    paddingHorizontal: 125,
    backgroundColor: "#FDB218",
    borderRadius: 5,
    alignItems: "center",
    top: "50%",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  handleStyle: {
    backgroundColor: "#FDB218",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: 30,
  },
  mainText: {
    fontSize: 24,
    paddingTop: 24,
    width: "100%",
    fontWeight: "bold",
    fontFamily: "HankenGrotesk-Regular",
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    width: "100%",
    fontFamily: "HankenGrotesk-Regular",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 16 / 9, // Ensures 16:9 aspect ratio
    borderRadius: 16, // Optional: Apply border-radius for rounded corners
  },
  image: {
    width: "100%",
    height: "100%", // Makes the image fill the container
    borderRadius: 16, // Optional: Apply border-radius for rounded corners
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 16,
  },
});

export default styles;

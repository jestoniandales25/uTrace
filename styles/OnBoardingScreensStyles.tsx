import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 64,
    width: width - 48,
  },
  illustrationContainer: {
    alignItems: "flex-end",
    width: width - 48,
    height: width - 48,
    bottom: 32,
  },
  textContainer: {
    width: "100%",
    gap: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "HankenGrotesk-Regular",
    color: "#151515",
  },
  description: {
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    fontFamily: "HankenGrotesk-Regular",
    color: "#151515",
  },
  bottomContainer: {
    height: 144,
    flexDirection: "column",
    width: "100%",
    gap: 24,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  button: {
    paddingVertical: 11,
    backgroundColor: "#FDB218",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonTextContainer: {
    height: 21,
    alignItems: "center",
    fontFamily: "HankenGrotesk-Regular",
  },
  buttonText: {
    color: "#151515",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;

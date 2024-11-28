import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 50,
  },
  loginButton: {
    padding: 13,
    borderRadius: 8,
    width: "90%",
    backgroundColor: "#FDB218",
    alignItems: "center",
    marginTop: 45,
  },
  guestButton: {
    borderWidth: 1,
    borderColor: "#FDB218",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    marginTop: 25,
  },
  buttonTextLogin: {
    fontSize: 16,
    color: "#151515",
  },
  buttonTextGuest: {
    fontSize: 16,
    color: "#666666",
  },

  //Login Page CSS
  inputText: {
    marginTop: 25,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    width: "90%",
    height: 50,
    borderColor: "#FDB218",
    paddingHorizontal: 15,
  },
  googleButton: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FABB18",
    padding: 10,
    borderRadius: 8,
    width: "90%",
  },
  accountTextContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  textForAccount: {
    fontSize: 16,
    color: "#777777",
  },
  textOpacity: {
    fontSize: 16,
    marginLeft: 10,
    color: "#777777",
    textDecorationLine: "underline",
  },
  googleIcon: {
    marginRight: 10,
  },

  //Divider on Login Page
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
    marginTop: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#777",
    fontSize: 14,
  },
});

export default styles;

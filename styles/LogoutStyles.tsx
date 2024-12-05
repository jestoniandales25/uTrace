import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

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
});

export default styles;
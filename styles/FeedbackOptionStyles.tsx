import { popup } from "leaflet";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 24,
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
    inputText: {
        fontSize: 14,
        color: "#151515",
        borderRadius: 8,
        borderWidth: 1,
        width: "90%",
        height: 150,
        borderColor: "#FDB218",
        paddingHorizontal: 15,
        marginTop: 20,
        textAlignVertical: "top",
        padding: 10,
        textAlign: "left",
    },
    submitButton: {
        marginTop: 20,
        padding: 10,
        maxWidth: "90%",
        backgroundColor: "#FDB218",
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
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
    feedbackText: {
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: 'bold', 
        letterSpacing: 2,  
        textAlign: 'center', 
        fontSize: 18,        
        textTransform: 'uppercase', 
        color: '#333',
      },
      submitButtonText: {
        color: "#fff",
        fontSize: 14,
      },
      
});

export default styles;
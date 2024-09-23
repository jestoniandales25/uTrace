import { StyleSheet } from "react-native";

const OBSfirstpage = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    textOutside: {
        textAlign: 'center',
        color: 'black',
        fontStyle: 'italic',
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom:10 
    },
    ViewFrame: {
        
        borderColor: 'black',
        borderWidth: 1,
        marginBottom:10 
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 4,
        backgroundColor: "black",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default OBSfirstpage;
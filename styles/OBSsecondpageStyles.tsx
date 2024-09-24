import { StyleSheet } from "react-native";

const OBSsecondpage = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 4,
        backgroundColor: "black",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    imageText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageContainer:{
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 80,
        paddingHorizontal: 80,
        marginBottom:10,
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
});
export default OBSsecondpage;
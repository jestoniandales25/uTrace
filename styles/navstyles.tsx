import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',

    },
    header: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        paddingTop: 180,
    },
    searchContainer: {
        position: 'absolute',
        top: '5%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: 350,
        height: 40,
    },
    searchIcon: {
        marginTop: '2%',
        marginRight: 10,
        color: '#4dd76a',
    },
    userInputWithIcon: {
        flex: 1,
        height: '100%'
    },
    userInput: {
        position: 'absolute',
        top: '5%',
        borderWidth: 1,
        borderColor: '#4dd76a',
        padding: 8,
        margin: 16,
        width: 350,
        borderRadius: 50,
        height: 40,
    },
    button: {
        position: 'absolute',
        paddingVertical: 15,
        paddingHorizontal: 125,
        backgroundColor: '#4dd76a',
        borderRadius: 5,
        alignItems: 'center',
        top: '20%',
    },
    tryButton: {
        position: 'absolute',
        paddingVertical: 15,
        paddingHorizontal: 125,
        backgroundColor: '#4dd76a',
        borderRadius: 5,
        alignItems: 'center',
        top: '30%',
    },
    tryButton2: {
        position: 'absolute',
        paddingVertical: 15,
        paddingHorizontal: 125,
        backgroundColor: '#4dd76a',
        borderRadius: 5,
        alignItems: 'center',
        top: '30%',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    animatedContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    containerText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    resizableHeader: {
        top: 0,
        position: 'absolute',
        width: '108%',
        padding: 10,
        backgroundColor: '#4dd76a',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },      

});

export default styles;
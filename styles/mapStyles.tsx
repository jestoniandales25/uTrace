import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gymnasium: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'black',
        width: 120, // Slightly larger for a building feel
        height: 180,
        backgroundColor: '#d3d3d3', // Gray color for a concrete look
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 10, // Adds an elevated shadow
    },
    gymLobby: {
        borderWidth: 2,
        borderColor: 'black',
        width: 70,
        height: 100,
        backgroundColor: '#b0c4de', // Light blue-gray for differentiation
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 8, // Adds a lighter shadow
    },
    content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animatedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;

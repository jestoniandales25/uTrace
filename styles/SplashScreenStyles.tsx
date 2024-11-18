import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: "dotted"
    },
    view: {
        gap: 8,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    text: {
        fontFamily: "HankenGrotesk-Regular",
        textAlign: "center",
        color: "#151515"
    },
    loading: {
        marginTop: 24
    }
});

export default styles;
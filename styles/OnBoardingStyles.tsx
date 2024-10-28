import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    description: {
        fontSize: 13,
        marginTop: 10,
        maxWidth: '85%',
        textAlign: 'center',
        lineHeight: 23,
    },
    onboardingContainer: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        height: 10,
        width: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        marginHorizontal: 15,
    },
    button: {
        bottom: 50,
        paddingVertical: 15,
        paddingHorizontal: 125,
        backgroundColor: '#4dd76a',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
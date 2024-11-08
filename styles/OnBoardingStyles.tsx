import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    descriptionContainer: {
        justifyContent: 'center',
        marginTop: 20,
        flex: 0.3,
        width: 350,
        alignItems: 'center',
    },
    description: {
        fontSize: 14,
        marginTop: 10,
        justifyContent: 'center',
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
    buttonTextContainer: {
        width: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});

export default styles;
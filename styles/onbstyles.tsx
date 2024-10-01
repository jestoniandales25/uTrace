import { StyleSheet } from 'react-native';

const onbstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    image: {
        width: '100%',
        height: '50%',
        aspectRatio: 1,
    },
    image3: {
        width: '100%',
        height: '50%',
        aspectRatio: 1,
        marginBottom: 100,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        height: 50,
    },
    text: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginBottom: 75,
    },
    header2: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        paddingTop: 250,
    },
    text2: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginBottom: 75,
    },
    header3: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        paddingTop: 175,
    },
    text3: {
        position: 'absolute',
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        paddingTop: 285,
    },
    text_mini: {
        position: 'absolute',
        bottom: 15,
        fontSize: 11,
        color: 'grey',
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        paddingVertical: 15,
        paddingHorizontal: 125,
        backgroundColor: '#4dd76a',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default onbstyles;

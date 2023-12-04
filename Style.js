import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SignUpCard: {
        backgroundColor: "lightblue",
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderRadius: 15,
        width: '80%',
        height: 'max-content'
    },
    email: {
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    password: {
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    heading: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    Signupbtn: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 15
    },
    SignupbtnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    }
});


export default styles;
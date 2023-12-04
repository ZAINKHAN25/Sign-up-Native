import { useState } from "react";
import { db, doc, setDoc, createUserWithEmailAndPassword, auth } from "../firebaseConfig.js";
import { View } from "react-native-web";
import { Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../Style.js";

function SignupComponent({ navigation }) {
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [firstName, setfirstName] = useState('')
    let [lastName, setlastName] = useState('')

    function signup() {
        try {

            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    // user ki unique id
                    console.log(user, " ????user");
                    await setDoc(doc(db, "users", user.uid), {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    });
                    // login page pe gaiga
                    navigation.navigate('Login')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error.message);
                    console.log(errorCode);
                    // ..
                });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.mainBody}>
            <View style={styles.SignUpCard}>
                <Text style={styles.heading}>Sign Up</Text>
                <TextInput
                    placeholder='First Name'
                    style={styles.email}
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                />
                <TextInput
                    placeholder='Last Name'
                    style={styles.email}
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                />
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    style={styles.email}
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.password}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <TouchableOpacity
                    style={styles.Signupbtn}
                    onPress={signup}
                >
                    <Text style={styles.SignupbtnTxt}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Signupbtn}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.SignupbtnTxt}>Go to login page</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignupComponent;


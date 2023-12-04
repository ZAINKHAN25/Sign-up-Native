import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, doc, getDoc, signInWithEmailAndPassword } from "../firebaseConfig.js";
import { changeloginPersonData } from "../store/Slices/loginPersonData.js";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../Style.js";

function LoginComponent({ navigation }) {
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
  
    const { loginPersonData } = useSelector((state) => state);
    const dispatch = useDispatch();
  
  
    function Signin() {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
  
  
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const updatecounter = () => {
              dispatch(changeloginPersonData(docSnap.data()));
            };
            updatecounter()
            navigation.navigate('Home')
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
    }
    return (
      <View style={styles.mainBody}>
        <View style={styles.SignUpCard}>
          <Text style={styles.heading}>Login</Text>
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
            onPress={Signin}
          >
            <Text style={styles.SignupbtnTxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  
export default LoginComponent;
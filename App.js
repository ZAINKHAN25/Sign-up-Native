import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createUserWithEmailAndPassword, auth, signInWithEmailAndPassword, setDoc, doc, db, getDoc } from './firebaseConfig.js';

import { useDispatch, useSelector } from "react-redux";
import loginPersonData, { changeloginPersonData } from './store/Slices/loginPersonData.js';
import { Provider } from "react-redux";
import store from "./store/store.js";



// Signup Page
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




// Login page
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

function HomeComponent() {
  const { loginPersonData } = useSelector((state) => state);
  let [loginPersonDataState, setloginPersonDataState] = useState('')
  useEffect(() => {
    setloginPersonDataState(loginPersonData)
  }, [loginPersonData])
  console.log(loginPersonDataState?.loginPersonData?.firstName);

  return (
    <>
      hello it is home page {loginPersonDataState?.loginPersonData?.firstName}
    </>
  )
}


// main Screen
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupComponent} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


// css
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
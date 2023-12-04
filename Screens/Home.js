import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HomeComponent() {
    let { loginPersonData } = useSelector((state) => state);
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

export default HomeComponent;
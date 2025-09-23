import { useProvideAuth } from ".";
import { authContext } from "./context";

export default function ProvideAuth({children} : {children: React.ReactElement}){
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
};
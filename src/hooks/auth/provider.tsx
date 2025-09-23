import { authContext } from "./context";
import { useAuth } from "./useAuth";

export default function ProvideAuth({children} : {children: React.ReactElement}){
    const auth = useAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
};
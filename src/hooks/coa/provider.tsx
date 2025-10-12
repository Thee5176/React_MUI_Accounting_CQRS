import { CoaContext } from "./context";
import { useCoa } from "./useCoa";

export default function ProvideCoa({children} : {children: React.ReactElement}){
    const coa = useCoa();
    return (
        <CoaContext.Provider value={coa}>
            {children}
        </CoaContext.Provider>
    )
};
import React from "react";
import { Route } from "react-router-dom";
import BoxInput from "../view/BoxInput";
import BoxGetTransponder from "../view/BoxGetTransponder";

const AppRouter = () => {
    return(  
        <div>
            <Route
            path="/post" 
            component={BoxInput}/>
            <Route
            path="/get" 
            component={BoxGetTransponder}/>
        </div>
    );
}

export default AppRouter;
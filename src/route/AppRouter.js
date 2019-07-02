import React from "react";
import { Route } from "react-router-dom";
import BoxInput from "../view/BoxInput";
import BoxGetTransponder from "../view/BoxGetTransponder";
import BoxDelete from "../view/BoxDelete";

const AppRouter = () => {
    return(  
        <div>
            <Route
            path="/post" 
            component={BoxInput}/>
            <Route
            path="/get" 
            component={BoxGetTransponder}/>
            <Route
            path="/delete" 
            component={BoxDelete}/>
        </div>
    );
}

export default AppRouter;
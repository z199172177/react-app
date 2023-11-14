import React from "react";
import {Route, Routes} from "react-router-dom";
import PFDataList from "../pages/PFDataList";
import PFProjectView from "../pages/PFProjectView";

function RouterList() {
    return (
        <Routes>
            <Route path="/" element={<PFProjectView />}/>
        </Routes>
    );
}

export default RouterList;
import React from "react";
import {Route, Routes} from "react-router-dom";
import PFDataList from "../pages/PFDataList";

function RouterList() {
    return (
        <Routes>
            <Route path="/" element={<PFDataList />} />
        </Routes>
    );
}

export default RouterList;
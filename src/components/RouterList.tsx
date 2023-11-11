import React from "react";
import {Route, Routes} from "react-router-dom";
import PFDataList from "../pages/PFDataList";

function RouterList() {
    return (
        <Routes>
            <Route path="/react-gh-pages/" element={<PFDataList />} />
            <Route path="/react-gh-pages/PFDataList" element={<PFDataList />} />
        </Routes>
    );
}

export default RouterList;
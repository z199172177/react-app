import React from "react";
import {Route, Routes} from "react-router-dom";
import PFDataList from "../pages/PFDataList";
import PFProjectView from "../pages/PFProjectView";
import SqlDiagnosticPage from "../pages/SqlDiagnosticPage";

function RouterList() {
    return (
        <Routes>
            <Route path="/" element={<SqlDiagnosticPage />}/>
            <Route path="/home" element={<PFProjectView />}/>
            <Route path="/PFDataList" element={<PFDataList />}/>
        </Routes>
    );
}

export default RouterList;
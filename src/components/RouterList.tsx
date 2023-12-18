import React from "react";
import {Route, Routes} from "react-router-dom";
import PFDataList from "../pages/PFDataList";
import PFProjectView from "../pages/PFProjectView";
import SqlDiagnosticLayout from "../features/layout-feature/SqlDiagnosticLayout";
import PFViewerLayout from "../features/layout-feature/PFViewerLayout";
import ErrLogDiagnosticLayout from "../features/layout-feature/ErrLogDiagnosticLayout";
import GitDiffAnalysisLayout from "../features/layout-feature/GitDiffAnalysisLayout";

function RouterList() {
    return (
        <Routes>
            <Route path="/" element={<PFViewerLayout/>}/>
            <Route path="/slowSqlDiagnostic" element={<SqlDiagnosticLayout/>}/>
            <Route path="/errLogDiagnostic" element={<ErrLogDiagnosticLayout/>}/>
            <Route path="/home" element={<PFProjectView/>}/>
            <Route path="/PFViewer" element={<PFViewerLayout/>}/>
            <Route path="/PFDataList" element={<PFDataList/>}/>
            <Route path="/gitDiffAnalysis" element={<GitDiffAnalysisLayout />}/>
        </Routes>
    );
}

export default RouterList;
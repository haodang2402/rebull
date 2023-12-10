import { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Loading from "../components/Loading";

const AppRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<>Test Route</>} />
                <Route path="/test1" element={<>Test Route 2</>} />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;

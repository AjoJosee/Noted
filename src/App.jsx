import {

    BrowserRouter,

    Routes,

    Route,

} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/DashboardPage";

import SubjectsPage from "./pages/SubjectsPage";

import TimetablePage from "./pages/TimetablePage";

import CalendarPage from "./pages/CalendarPage";



export default function App() {

    return (

        <BrowserRouter>

            <div className="flex min-h-screen">

                <Sidebar />

                <main className="flex-1 overflow-auto p-8">

                    <Routes>

                        <Route
                            path="/"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/subjects"
                            element={<SubjectsPage />}
                        />

                        <Route
                            path="/timetable"
                            element={<TimetablePage />}
                        />

                        <Route
                            path="/calendar"
                            element={<CalendarPage />}
                        />

                    </Routes>

                </main>

            </div>

        </BrowserRouter>

    );

}
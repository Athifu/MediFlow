import { Outlet } from "react-router-dom";
import SpotlightSearch from "../../components/common/SpotlightSearch";

export default function PatientLayout() {
    return (
        <div className="font-nunito bg-slate-50 min-h-screen">
            <SpotlightSearch />
            {/* Header omitted for dashboard view, integrated elsewhere */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}

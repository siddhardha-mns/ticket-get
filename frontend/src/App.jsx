import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TicketsSummary from "./pages/TicketsSummary";
import ServiceRequests from "./pages/ServiceRequests";
import TicketDetail from "./pages/TicketDetail";
import CreateRequest from "./pages/CreateRequest";
import ManageCredentials from "./pages/ManageCredentials";
import Reports from "./pages/Reports";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tickets-summary" element={<TicketsSummary />} />
            <Route path="service-requests" element={<ServiceRequests />} />
            <Route path="service-requests/:ticketId" element={<TicketDetail />} />
            <Route path="my-requests" element={<ServiceRequests filter="my" />} />
            <Route path="group-requests" element={<ServiceRequests filter="group" />} />
            <Route path="create-request" element={<CreateRequest />} />
            <Route path="manage-tables" element={<ManageCredentials />} />
            <Route path="reports/*" element={<Reports />} />
            <Route path="monitoring" element={<div className="p-8 text-center text-gray-400 text-sm mt-20">Monitoring — Coming Soon</div>} />
            <Route path="customers" element={<div className="p-8 text-center text-gray-400 text-sm mt-20">Customers — Coming Soon</div>} />
            <Route path="catalogue" element={<div className="p-8 text-center text-gray-400 text-sm mt-20">Catalogue — Coming Soon</div>} />
            <Route path="user-management" element={<div className="p-8 text-center text-gray-400 text-sm mt-20">User Management — Coming Soon</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

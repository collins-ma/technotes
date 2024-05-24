import NotesData from './NotesData';
import ManagerUsers from './ManagerUsers';
import EditNotes from './EditNotes';
import ManagerDashBoard from './ManagerDashBoard';
import ManagerNotesList from './ManagerNotesList';
import ManagerEditUser from './ManagerEditUser';
import EmployeeViewNotes from './EmployeeViewNotes.js';

import Dashboard from './Dashboard';
// import NoteList from './NotesList';
import EmployeeEditNote from './EmployeeEditNote.js';
import Login from "./Login";
import WelcomePage from './WelcomePage';

import AddNewUser from './AddNewUser';
import Layout from "./Layout";
import PersistLogin from './PersistLogin.js';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashBoard from './AdminDashBoard';
import ManageUsers from './ManageUsers';
import EditUser from './EditUser';
import RequireAuth from './RequireAuth';

import {  Route, Routes,} from  'react-router-dom'

const ROLES={
  Employee:"Employee",
  Admin:"Admin",
  Manager:"Manager"
  



}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
       
        <Route index element={<WelcomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        
        {/* Protected Employee Routes */}
        <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth allowedRoles={[ROLES.Employee]} />}>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/notes" element={<EmployeeViewNotes />} />
          <Route path="/employee/edit-note/:id" element={<EmployeeEditNote />} />
        </Route>
        
        {/* Protected Admin Routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/admin/add-user" element={<AddNewUser />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />
          <Route path="/admin/view-notes" element={<NotesData />} />
          <Route path="/admin/edit-note/:id" element={<EditNotes />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
          <Route path="/manager-dashboard" element={<ManagerDashBoard />} />
          <Route path="/manager/manage-users" element={<ManagerUsers />} />
          <Route path="/manager/edit-user/:id" element={<ManagerEditUser />} />
          <Route path="/manager/view-notes" element={<ManagerNotesList />} />
          <Route path="/manager/edit-note/:id" element={<EditNotes />} />
        </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

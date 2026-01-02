import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Insurance from './components/Insurance.jsx'
import LifeInsurance from './components/pages/LifeInsurance.jsx'
import HealthInsurance from './components/pages/HealthInsurance.jsx'
import Loan from './components/Loan.jsx'
import MutualFund from './components/MutualFund.jsx'
import Login from './components/pages/Login.jsx'
import Portfolio from './components/pages/Portfolio.jsx'
import AboutUs from './components/AboutUs.jsx'
// import ContactUs from './components/ContactUs.jsx'
import OtherServices from './components/OtherServices.jsx'
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx'
import Terms from './components/pages/Terms.jsx'
import Support from './components/pages/Support.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import AddUser from './components/admin/AddUser.jsx'
import Users from './components/admin/Users.jsx'
import EditUser from './components/admin/EditUser.jsx'
import Reports from './components/admin/Reports.jsx'
import PersonalAccidentInsurance from './components/pages/PersonalAccidentInsurance.jsx'
import GeneralInsurance from './components/pages/GeneralInsurance.jsx'
import Contact from './components/pages/Contact.jsx'
import SIP from './components/pages/SIP.jsx'
import Lumpsum from './components/pages/Lumpsum.jsx'
import EquityFund from './components/pages/EquityFund.jsx'
import DebtFund from './components/pages/DebtFund.jsx'
import HybridFund from './components/pages/HybridFund.jsx'
import HomeLoans from './components/pages/HomeLoans.jsx'
import MortgaugeLoans from './components/pages/MortgaugeLoans.jsx'
import Bonds from './components/pages/Bonds.jsx'
import FixedDeposite from './components/pages/FixedDeposite.jsx'
import Stocks from './components/pages/Stocks.jsx'
import AddInsurance from './components/admin/AddInsurance.jsx'
import AddHealthInsurance from './components/admin/AddHealthInsurance.jsx'
import EditHealthInsurance from './components/admin/EditHealthInsurance.jsx'
import AddMutualFund from './components/admin/AddMutualFund.jsx'
import EditMF from './components/admin/EditMF.jsx'
import AddLoan from './components/admin/AddLoan.jsx'
import EditLoan from './components/admin/EditLoan.jsx'
import AddOtherServices from './components/admin/AddOtherServices.jsx'
import AddFixedDeposite from './components/admin/AddFixedDeposite.jsx'
import EditFD from './components/admin/EditFD.jsx'
import AddBonds from './components/admin/AddBonds.jsx'
import EditBond from './components/admin/EditBond.jsx'
import AddStocks from './components/admin/AddStocks.jsx'
import EditStocks from './components/admin/EditStocks.jsx'
import EditInsurance from './components/admin/EditInsurance.jsx'
import AddEmailid from './components/admin/AddEmailid.jsx'
import ViewUser from './components/admin/ViewUser.jsx'
import Error from './Error.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path='/insurance' element={<Insurance />} />
        <Route path ='/lifeinsurance' element={<LifeInsurance/>}/>
        <Route path='/healthinsurance' element={<HealthInsurance/>}/>
        <Route path='/personalaccidentinsurance' element={<PersonalAccidentInsurance/>}/>
        <Route path ='/generalinsurance' element={< GeneralInsurance/>}/>
        <Route path='/#loan' element={<Loan />} />
        <Route path='/homeloans' element={<HomeLoans/>}/>
        <Route path='/mortgaugeloans' element={<MortgaugeLoans/>}/>
        <Route path='/mutualfund' element={<MutualFund />} />
        <Route path='/sip' element={<SIP/>}/>
        <Route path='/lumpsum' element={<Lumpsum/>}/>
        <Route path='/equity' element={<EquityFund/>}/>
        <Route path ='/debt' element={<DebtFund/>}/>
        <Route path ='/hybrid' element={<HybridFund/>}/>
        <Route path='/#aboutus' element={<AboutUs />} />
        <Route path='/#otherservices' element={<OtherServices />} />
        <Route path = '/bonds' element ={<Bonds/>}/>
        <Route path='/fixeddeposite' element={<FixedDeposite />} />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/login' element={<Login />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/support' element={<Support />} />
        <Route path='/contact' element={<Contact/>}/>

        <Route path='*' element={<Error />} />

     {/* User protected route */}
       <Route
          path="/portfolio"
          element={
              <ProtectedRoute>
              <Portfolio />
              </ProtectedRoute>
            }
        />

{/* Admin Routes (Protected + Nested) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested admin routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-user/email" element={<AddEmailid />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="users" element={<Users />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path='view-users' element={<ViewUser />} />
          <Route path="reports" element={<Reports />} />

          {/* Add/Edit services */}
          <Route path="addinsurance" element={<AddInsurance />} />
          <Route path="editinsurance/:id" element={<EditInsurance />} />
          <Route path="addhealthinsurance" element={<AddHealthInsurance />} />
          <Route path="edithealthinsurance/:id" element={<EditHealthInsurance />} />
          <Route path="addmutualfund" element={<AddMutualFund />} />
          <Route path="editmf/:id" element={<EditMF />} />
          <Route path="addloan" element={<AddLoan />} />
          <Route path="editloan/:id" element={<EditLoan />} />
          <Route path="addotherservices" element={<AddOtherServices />} />
          <Route path="addfixeddeposite" element={<AddFixedDeposite />} />
          <Route path="edit-fd/:id" element={<EditFD />} />
          <Route path="addbonds" element={<AddBonds />} />
          <Route path="editbonds/:id" element={<EditBond />} />
          <Route path="addstocks" element={<AddStocks />} />
          <Route path="editstocks/:id" element={<EditStocks />} />
        {/* Add other nested admin pages here */}
        </Route>

        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
          

      </Routes>
    </Router>
  </StrictMode>,
)

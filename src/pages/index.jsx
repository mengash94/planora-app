import Layout from "./Layout.jsx";

import Home from "./Home";

import CreateEvent from "./CreateEvent";

import EventDetail from "./EventDetail";

import Tasks from "./Tasks";

import Profile from "./Profile";

import MyEventsList from "./MyEventsList";

import JoinEvent from "./JoinEvent";

import EditEvent from "./EditEvent";

import ChatOverview from "./ChatOverview";

import EventChat from "./EventChat";

import AdminAnnouncements from "./AdminAnnouncements";

import AdminUsers from "./AdminUsers";

import CreateEventManual from "./CreateEventManual";

import WelcomePage from "./WelcomePage";

import VerifiedVenueFinder from "./VerifiedVenueFinder";

import InstaBackTest from "./InstaBackTest";

import HomePage from "./HomePage";

import AdminTemplatesSeed from "./AdminTemplatesSeed";

import AdminTemplatesManage from "./AdminTemplatesManage";

import Auth from "./Auth";

import AdminDashboard from "./AdminDashboard";

import Privacy from "./Privacy";

import Terms from "./Terms";

import MigrateImages from "./MigrateImages";

import NotificationCenter from "./NotificationCenter";

import AppSpecification from "./AppSpecification";

import ForgotPassword from "./ForgotPassword";

import ResetPassword from "./ResetPassword";

import AccessibilityStatement from "./AccessibilityStatement";

import CreateEventAI from "./CreateEventAI";

import AdminSystemMessages from "./AdminSystemMessages";

import LandingPage from "./LandingPage";

import EventRSVP from "./EventRSVP";

import AdminVersions from "./AdminVersions";

import WhatsNew from "./WhatsNew";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    CreateEvent: CreateEvent,
    
    EventDetail: EventDetail,
    
    Tasks: Tasks,
    
    Profile: Profile,
    
    MyEventsList: MyEventsList,
    
    JoinEvent: JoinEvent,
    
    EditEvent: EditEvent,
    
    ChatOverview: ChatOverview,
    
    EventChat: EventChat,
    
    AdminAnnouncements: AdminAnnouncements,
    
    AdminUsers: AdminUsers,
    
    CreateEventManual: CreateEventManual,
    
    WelcomePage: WelcomePage,
    
    VerifiedVenueFinder: VerifiedVenueFinder,
    
    InstaBackTest: InstaBackTest,
    
    HomePage: HomePage,
    
    AdminTemplatesSeed: AdminTemplatesSeed,
    
    AdminTemplatesManage: AdminTemplatesManage,
    
    Auth: Auth,
    
    AdminDashboard: AdminDashboard,
    
    Privacy: Privacy,
    
    Terms: Terms,
    
    MigrateImages: MigrateImages,
    
    NotificationCenter: NotificationCenter,
    
    AppSpecification: AppSpecification,
    
    ForgotPassword: ForgotPassword,
    
    ResetPassword: ResetPassword,
    
    AccessibilityStatement: AccessibilityStatement,
    
    CreateEventAI: CreateEventAI,
    
    AdminSystemMessages: AdminSystemMessages,
    
    LandingPage: LandingPage,
    
    EventRSVP: EventRSVP,
    
    AdminVersions: AdminVersions,
    
    WhatsNew: WhatsNew,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/CreateEvent" element={<CreateEvent />} />
                
                <Route path="/EventDetail" element={<EventDetail />} />
                
                <Route path="/Tasks" element={<Tasks />} />
                
                <Route path="/Profile" element={<Profile />} />
                
                <Route path="/MyEventsList" element={<MyEventsList />} />
                
                <Route path="/JoinEvent" element={<JoinEvent />} />
                
                <Route path="/EditEvent" element={<EditEvent />} />
                
                <Route path="/ChatOverview" element={<ChatOverview />} />
                
                <Route path="/EventChat" element={<EventChat />} />
                
                <Route path="/AdminAnnouncements" element={<AdminAnnouncements />} />
                
                <Route path="/AdminUsers" element={<AdminUsers />} />
                
                <Route path="/CreateEventManual" element={<CreateEventManual />} />
                
                <Route path="/WelcomePage" element={<WelcomePage />} />
                
                <Route path="/VerifiedVenueFinder" element={<VerifiedVenueFinder />} />
                
                <Route path="/InstaBackTest" element={<InstaBackTest />} />
                
                <Route path="/HomePage" element={<HomePage />} />
                
                <Route path="/AdminTemplatesSeed" element={<AdminTemplatesSeed />} />
                
                <Route path="/AdminTemplatesManage" element={<AdminTemplatesManage />} />
                
                <Route path="/Auth" element={<Auth />} />
                
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                
                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/Terms" element={<Terms />} />
                
                <Route path="/MigrateImages" element={<MigrateImages />} />
                
                <Route path="/NotificationCenter" element={<NotificationCenter />} />
                
                <Route path="/AppSpecification" element={<AppSpecification />} />
                
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                
                <Route path="/ResetPassword" element={<ResetPassword />} />
                
                <Route path="/AccessibilityStatement" element={<AccessibilityStatement />} />
                
                <Route path="/CreateEventAI" element={<CreateEventAI />} />
                
                <Route path="/AdminSystemMessages" element={<AdminSystemMessages />} />
                
                <Route path="/LandingPage" element={<LandingPage />} />
                
                <Route path="/EventRSVP" element={<EventRSVP />} />
                
                <Route path="/AdminVersions" element={<AdminVersions />} />
                
                <Route path="/WhatsNew" element={<WhatsNew />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
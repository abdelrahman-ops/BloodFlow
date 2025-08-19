// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  FaBell, FaUserMd, FaTint, FaChartLine, FaCalendarAlt, 
  FaHospital, FaUsers, FaHeartbeat, FaCog, FaSignOutAlt,
  FaRegClock, FaRegChartBar, FaUserFriends, FaExclamationTriangle
} from 'react-icons/fa';
import { MdDashboard, MdLocalHospital, MdBloodtype } from 'react-icons/md';
import { GiBlood, GiHeartPlus } from 'react-icons/gi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import useAuthStore from '../../stores/authStore';
import useAdminStore from '../../stores/adminStore';
import useNotificationStore from '../../stores/notificationStore';
import {useLanguageStore} from '../../stores/languageStore';
import EmergencyRequestManagement from '../../components/admin/EmergencyRequestManagement';

// Mock data for charts
const bloodTypeDistribution = [
  { name: 'O+', value: 38, color: '#ff6b6b' },
  { name: 'A+', value: 34, color: '#4ecdc4' },
  { name: 'B+', value: 9, color: '#1a535c' },
  { name: 'AB+', value: 3, color: '#ffd166' },
  { name: 'O-', value: 7, color: '#06d6a0' },
  { name: 'A-', value: 6, color: '#118ab2' },
  { name: 'B-', value: 2, color: '#ef476f' },
  { name: 'AB-', value: 1, color: '#073b4c' }
];

const donationTrends = [
  { month: 'Jan', donations: 45 },
  { month: 'Feb', donations: 52 },
  { month: 'Mar', donations: 48 },
  { month: 'Apr', donations: 67 },
  { month: 'May', donations: 75 },
  { month: 'Jun', donations: 82 },
  { month: 'Jul', donations: 78 },
  { month: 'Aug', donations: 85 },
];

const emergencyRequests = [
  { id: 1, hospital: 'City Medical Center', bloodType: 'O+', units: 3, time: '2 hours ago', status: 'Pending' },
  { id: 2, hospital: 'Regional Hospital', bloodType: 'AB-', units: 2, time: '4 hours ago', status: 'Approved' },
  { id: 3, hospital: 'Childrens Hospital', bloodType: 'B+', units: 5, time: '6 hours ago', status: 'Pending' },
];

const recentActivities = [
  { id: 1, action: 'New donor registered', time: '10 min ago' },
  { id: 2, action: 'Blood donation completed', time: '25 min ago' },
  { id: 3, action: 'Emergency request approved', time: '1 hour ago' },
  { id: 4, action: 'User account updated', time: '2 hours ago' },
];

const AdminDashboard = () => {
  const { user, token, isAuthenticated, logout, isLoading } = useAuthStore();
  console.log('user', user);
  
  const { 
    adminProfile, 
    getAdminProfile, 
    getSystemOverview, 
    loading: adminLoading,
    error: adminError
  } = useAdminStore();

  console.log('adminProfile', adminProfile);
  const { notifications, unreadCount, fetchNotifications } = useNotificationStore();
  const { language, toggleLanguage } = useLanguageStore();
  
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Stats data
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonations: 0,
    activeRequests: 0,
    pendingRequests: 0,
    hospitalsCount: 0
  });

  useEffect(() => {
    if (isAuthenticated && token && user?.role === 'admin') {
      getAdminProfile();
      getSystemOverview();
      fetchNotifications();
    }
  }, [isAuthenticated, token, user]);

  useEffect(() => {
    if (adminProfile?.stats) {
      setStats(adminProfile.stats);
    } else {
      // Fallback mock data
      setStats({
        totalDonors: 1242,
        totalDonations: 5683,
        activeRequests: 12,
        pendingRequests: 3,
        hospitalsCount: 18
      });
    }
  }, [adminProfile]);

  useEffect(() => {
    if (adminError) {
      toast.error(adminError);
    }
  }, [adminError]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const handleLogout = async () => {
    await logout();
    toast.info('You have been logged out');
  };

  const handleEmergencyAction = (id, action) => {
    toast.success(`Emergency request ${action === 'approve' ? 'approved' : 'rejected'}`);
    // In a real app, you would call the API here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                title="Total Donors" 
                value={stats.totalDonors} 
                icon={<FaUsers className="text-blue-500" />} 
                trend="+12% from last month"
                darkMode={darkMode}
              />
              <StatCard 
                title="Total Donations" 
                value={stats.totalDonations} 
                icon={<FaTint className="text-red-500" />} 
                trend="+8% from last month"
                darkMode={darkMode}
              />
              <StatCard 
                title="Active Requests" 
                value={stats.activeRequests} 
                icon={<FaExclamationTriangle className="text-yellow-500" />} 
                trend="3 new today"
                darkMode={darkMode}
              />
              <StatCard 
                title="Hospitals" 
                value={stats.hospitalsCount} 
                icon={<FaHospital className="text-green-500" />} 
                trend="2 new this month"
                darkMode={darkMode}
              />
            </div>
            
            {/* Donation Trends Chart */}
            <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaChartLine className="text-purple-500" />
                Donation Trends
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={donationTrends}>
                    <defs>
                      <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" className={darkMode ? 'opacity-20' : 'opacity-50'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                        borderColor: darkMode ? "#374151" : "#E5E7EB",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Area type="monotone" dataKey="donations" stroke="#ff6b6b" fillOpacity={1} fill="url(#colorDonations)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Blood Type Distribution */}
            <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <MdBloodtype className="text-red-500" />
                Blood Type Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bloodTypeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {bloodTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                        borderColor: darkMode ? "#374151" : "#E5E7EB",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent Emergency Requests */}
            <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <FaExclamationTriangle className="text-yellow-500" />
                  Emergency Requests
                </h3>
                <span className={`text-sm px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-yellow-100'} text-yellow-600`}>
                  {stats.pendingRequests} pending
                </span>
              </div>
              
              <div className="space-y-3">
                {emergencyRequests.map(request => (
                  <div 
                    key={request.id} 
                    className={`p-3 rounded-lg flex justify-between items-center ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-50 hover:bg-red-100'
                    } transition-colors`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <MdLocalHospital className="text-red-500" />
                        <span className="font-medium">{request.hospital}</span>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className={`px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          Blood Type: <span className="font-bold">{request.bloodType}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          Units: <span className="font-bold">{request.units}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{request.time}</span>
                      {request.status === 'Pending' ? (
                        <div className="flex gap-2 mt-2">
                          <button 
                            onClick={() => handleEmergencyAction(request.id, 'approve')}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-full text-xs"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleEmergencyAction(request.id, 'reject')}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className={`px-2 py-1 rounded-full mt-2 text-xs ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                          Approved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'donors':
        return (
          <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-6">Donor Management</h2>
            <p>Donor management content will go here...</p>
          </div>
        );
      case 'hospitals':
        return (
          <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-6">Hospital Management</h2>
            <p>Hospital management content will go here...</p>
          </div>
        );
      case 'emergency':
        return (
          <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <EmergencyRequestManagement />
          </div>
        );
      case 'analytics':
        return (
          <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-6">Analytics</h2>
            <p>Analytics content will go here...</p>
          </div>
        );
      case 'settings':
        return (
          <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-6">System Settings</h2>
            <p>System settings content will go here...</p>
          </div>
        );
      default:
        return (
          <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            <p>Select a section from the menu</p>
          </div>
        );
    }
  };

  if (isLoading || adminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8 max-w-md">
          <GiBlood className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Admin Access Required</h2>
          <p className="mb-6 text-gray-600">Please log in with an admin account to access this dashboard</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition-all shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} mt-16`}>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md lg:hidden"
      >
        {mobileMenuOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <span className="text-xl">☰</span>
        )}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transition-transform duration-300 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:flex-shrink-0`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <GiBlood className="text-red-500 text-3xl" />
            <h1 className="text-xl font-bold">Bloodflow Admin</h1>
          </div>
        </div>
        
        <div className="p-4 flex items-center gap-3 mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
          <div>
            <p className="font-medium">{user?.name || 'Admin User'}</p>
            <p className="text-sm text-gray-400">Administrator</p>
          </div>
        </div>
        
        <nav className="space-y-1 px-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'dashboard' ? 'bg-red-600' : 'hover:bg-gray-700'
            } transition-colors`}
          >
            <MdDashboard />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('donors')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'donors' ? 'bg-red-600' : 'hover:bg-gray-700'
            } transition-colors`}
          >
            <FaUserFriends />
            <span>Donor Management</span>
          </button>
          
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'hospitals' ? 'bg-red-600' : 'hover:bg-gray-700'
            } transition-colors`}
          >
            <FaHospital />
            <span>Hospital Management</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'emergency' ? 'bg-red-600' : 'hover:bg-gray-700'
            } transition-colors`}
          >
            <FaHospital />
            <span>Emergency Requests</span>
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'analytics' ? 'bg-red-600' : 'hover:bg-gray-700'
            } transition-colors`}
          >
            <FaRegChartBar />
            <span>Analytics</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === 'settings' ? 'bg-red-600' : 'hover:bg-gray-700'
            } transition-colors`}
          >
            <FaCog />
            <span>Settings</span>
          </button>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold capitalize">{activeTab} Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              title="Toggle Language"
            >
              {language === 'en' ? 'EN' : 'AR'}
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              title="Toggle Dark Mode"
            >
              {darkMode ? <span>☀️</span> : <span>🌙</span>}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}
                title="Notifications"
              >
                <FaBell className="text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border dark:border-gray-700">
                  <div className="p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold">Notifications ({notifications.length})</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.slice(0, 5).map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b dark:border-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                      >
                        <div className="flex justify-between">
                          <p className="font-medium">{notification.title}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center bg-gray-50 dark:bg-gray-700/50">
                    <button className="text-sm text-blue-500 hover:underline">View All</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
              <span className="hidden md:inline font-medium">{user?.name?.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-4 md:p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white mb-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name || 'Admin'}!</h2>
                <p className="opacity-90">
                  Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <FaCalendarAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Next scheduled report</p>
                  <p className="font-bold">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {renderContent()}
          
          {/* Recent Activity */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaRegClock className="text-purple-500" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-full mt-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Blood Donation Impact */}
            <div className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <GiHeartPlus className="text-red-500" />
                Blood Donation Impact
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                  <p className="text-sm">Lives Potentially Saved</p>
                  <p className="text-2xl font-bold mt-2">1,842</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <p className="text-sm">Hospitals Supported</p>
                  <p className="text-2xl font-bold mt-2">28</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                  <p className="text-sm">Communities Reached</p>
                  <p className="text-2xl font-bold mt-2">14</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <p className="text-sm">Emergency Responses</p>
                  <p className="text-2xl font-bold mt-2">67</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, trend, darkMode }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`rounded-xl p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {icon}
        </div>
      </div>
      <p className={`text-xs mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {trend}
      </p>
    </motion.div>
  );
};

export default AdminDashboard;
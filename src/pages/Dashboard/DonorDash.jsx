import { LineChart, PieChart, Pie, Line, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { 
  FaBell, FaCalendarAlt, FaTint, FaMoon, FaSun, FaChartLine, 
  FaTrophy, FaAward, FaHeartbeat, FaSignOutAlt 
} from "react-icons/fa";
import { AiOutlineLoading, AiFillStar } from "react-icons/ai";
import { GiHealthPotion } from "react-icons/gi";
import { IoMdRibbon } from "react-icons/io";
import { IoPieChartSharp } from "react-icons/io5";
import { MdHealthAndSafety, MdManageHistory, MdLocalHospital } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingModal from "../../components/donorDashboard/modals/BookingModal";
import Notification from "../../components/donorDashboard/Notifications/Notification";
import AiModal from "../../components/donorDashboard/modals/AiModal";
import { useDonorDashboard } from "../../controller/donorDashboardController";
import { 
    donationTrends, 
    bloodHealthData, 
    donorAchievements, 
    donorCoupons, 
    bloodTypeDistribution 
} from "../../utils/donationUtils";

const DonorDashboard = () => {
  const {
    // State
    nextDonationDate,
    daysUntilNextDonation,
    showBookingModal,
    setShowBookingModal,
    showNotifications,
    setShowNotifications,
    showAiModal,
    setShowAiModal,
    darkMode,
    activeTab,
    setActiveTab,
    user,
    isAuthenticated,
    authLoading,
    donationsLoading,
    notifications,
    notificationsLoading,
    
    // Handlers
    toggleNotifications,
    toggleDarkMode,
    handleMarkNotificationAsRead,
    handleConfirmBooking,
    handleLogout,
  } = useDonorDashboard();

  console.log('/auth/me user: ', user);
  const donations = user.donorInfo.donationHistory;
  console.log('donations: ', donations);
  console.log('notifications: ', notifications);

  const chartData = donationTrends.labels.map((label, index) => ({
    month: label,
    donations: donationTrends.data[index],
  }));

  const handleLogoutClick = async () => {
    const { success, message } = await handleLogout();
    if (!success && message) {
      toast.error(message);
    }
  };

  const handleBookingConfirm = (bookingDetails) => {
    const { message } = handleConfirmBooking(bookingDetails);
    toast.success(message);
    setShowBookingModal(false);
  };

  const handleNotificationRead = async (id) => {
    const { message } = await handleMarkNotificationAsRead(id);
    toast.success(message);
  };

  // Icon component mapping
  const iconComponents = {
    FaTint: FaTint,
    FaTrophy: FaTrophy,
    IoMdRibbon: IoMdRibbon,
    FaAward: FaAward,
    RiCoupon2Fill: RiCoupon2Fill,
  };

  if (authLoading || donationsLoading || notificationsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading className="animate-spin text-red-600 text-5xl" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center mt-10 text-lg">
        Please login to view your dashboard
      </div>
    );
  }

  

  return (
    <div className={`min-h-screen p-4 mt-14 md:p-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-red-50 to-gray-50 text-gray-800"}`}>
      {/* Header Section */}
      <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text py-3">
            Welcome, {user.name || "Hero"}!
          </h1>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-md`}
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </button>
          
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-md relative`}
              aria-label="Notifications"
            >
              <FaBell className={darkMode ? "text-gray-300" : "text-gray-700"} />
              {/* {notifications.some((notif) => !notif.read) && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )} */}
              {Array.isArray(notifications) && notifications.some((notif) => !notif.read) && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
            {showNotifications && (
              <Notification
                notifications={notifications.notifications}
                onMarkAsRead={handleNotificationRead}
                onDismiss={() => setShowNotifications(false)}
                darkMode={darkMode}
              />
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative group">
              <img
                src={user.avatar || "https://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png"}
                alt="Profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl  cursor-pointer"
              />
              <div className="absolute right-0 bottom-0 bg-white rounded-full p-1 shadow-md">
                <button 
                  onClick={handleLogoutClick}
                  className="text-red-600 hover:text-red-800"
                  title="Logout"
                >
                  <FaSignOutAlt size={14} />
                </button>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="font-medium">{user.name}<span className="ml-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text py-3">{user.bloodType}</span></p>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Level {user.donorInfo.donorLevel || "1"} Donor
              </p>
            </div>
          </div>
        </div>
      </header>


      {/* Progress Overview */}
      <section className="mb-8">
        <div className={`rounded-xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaTint className="text-red-500" />
              Your Donation Progress
            </h2>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                {user.donorInfo.donationCount || 0} Donations
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                {user.donorInfo.points || 0} Points
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Donation Eligibility */}
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-50"} border-l-4 border-red-500`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Next Donation</h3>
                <FaCalendarAlt className="text-red-500" />
              </div>
              <p className={`text-lg font-bold ${daysUntilNextDonation > 0 ? "text-red-600" : "text-green-600"}`}>
                {nextDonationDate}
              </p>
              {daysUntilNextDonation > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, 100 - (daysUntilNextDonation / 90 * 100))}%` }}
                  ></div>
                </div>
              )}
              <button
                onClick={() => setShowBookingModal(true)}
                className="mt-4 w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <MdLocalHospital /> Book Donation
              </button>
            </div>
            
            {/* Blood Health */}
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"} border-l-4 border-blue-500`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Blood Health</h3>
                <GiHealthPotion className="text-blue-500" />
              </div>
              <p className="text-lg font-bold text-blue-600">
                {bloodHealthData.hemoglobin}
              </p>
              <p className="text-sm">Hemoglobin Level</p>
              <button
                onClick={() => setShowAiModal(true)}
                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <FaHeartbeat /> Health Insights
              </button>
            </div>
            
            {/* Donor Level */}
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-purple-50"} border-l-4 border-purple-500`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Donor Level</h3>
                <AiFillStar className="text-yellow-500" />
              </div>
              <p className="text-lg font-bold text-purple-600">
                {user.donorInfo.donorLevel || "Bronze"}
              </p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <AiFillStar 
                    key={star} 
                    className={`text-${star <= (user.donorInfo.donorLevel === "Elite" ? 5 : user.donorInfo.donorLevel === "Silver" ? 3 : 1) ? "yellow-500" : "gray-300"}`} 
                  />
                ))}
              </div>
              <button
                className="mt-4 w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                <IoMdRibbon /> View Rewards
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Tabs */}
      <section className="mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-4 py-2 font-medium ${activeTab === "progress" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Your Progress
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-4 py-2 font-medium ${activeTab === "achievements" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`px-4 py-2 font-medium ${activeTab === "rewards" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 font-medium ${activeTab === "history" ? "border-b-2 border-red-500 text-red-600" : darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            History
          </button>
        </div>
      </section>

      {/* Tab Content */}
      <div className={`rounded-xl p-6 shadow-lg mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {activeTab === "progress" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donation Trends */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FaChartLine className="text-orange-500" />
                Donation Trends
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="donations"
                      stroke="#FF8042"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                        borderColor: darkMode ? "#374151" : "#E5E7EB",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Blood Type Distribution */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <IoPieChartSharp className="text-green-500" />
                Blood Type Impact
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bloodTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "achievements" && (
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Your Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {donorAchievements.map((achievement) => {
                const IconComponent = iconComponents[achievement.icon];
                return (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${achievement.earned ? 
                      (darkMode ? "border-yellow-500 bg-gray-700" : "border-yellow-300 bg-yellow-50") : 
                      (darkMode ? "border-gray-600 bg-gray-700 opacity-50" : "border-gray-200 bg-gray-50 opacity-50")}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className={`text-${achievement.color}-500 text-2xl`} />
                      <h4 className={`font-medium ${achievement.earned ? "text-yellow-600" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {achievement.name}
                      </h4>
                    </div>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {achievement.earned ? "Earned" : "In Progress"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {activeTab === "rewards" && (
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <RiCoupon2Fill className="text-green-500" />
              Your Rewards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {donorCoupons.map((coupon) => {
                const IconComponent = iconComponents[coupon.icon];
                return (
                  <div 
                    key={coupon.id}
                    className={`p-4 rounded-lg border ${darkMode ? "border-purple-500 bg-gray-700" : "border-purple-300 bg-purple-50"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className={`text-${coupon.color}-500 text-2xl`} />
                      <h4 className="font-medium text-purple-600">{coupon.name}</h4>
                    </div>
                    <p className={`text-lg font-bold mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {coupon.value}
                    </p>
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Expires: {new Date(coupon.expiry).toLocaleDateString()}
                    </p>
                    <button
                      className={`mt-3 w-full py-2 px-4 rounded-lg ${darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"} text-white transition`}
                    >
                      Claim Reward
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {activeTab === "history" && (
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MdManageHistory className="text-blue-500" />
              Donation History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} text-left`}>
                    <th className="p-3">Date</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Points</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length > 0 ? (
                    donations.map((donation, index) => (
                      <tr 
                        key={index} 
                        className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                      >
                        <td className="p-3">
                          {new Date(donation.date).toLocaleDateString()}
                        </td>
                        <td className="p-3">{donation.location?.name || "Unknown"}</td>
                        <td className="p-3 font-medium text-green-600">
                          +{donation.points || 10}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            donation.status === "Completed" ? 
                            (darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800") : 
                            (darkMode ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-800")
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-center">
                        No donation history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Blood Health Quick View */}
      <section className={`rounded-xl p-6 shadow-lg mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <MdHealthAndSafety className="text-blue-500" />
          Blood Health Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Object.entries(bloodHealthData).map(([key, value]) => (
            <div 
              key={key}
              className={`p-3 rounded-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} uppercase`}>
                {key.replace(/([A-Z])/g, ' $1')}
              </p>
              <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingConfirm}
          darkMode={darkMode}
        />
      )}
      
      {showAiModal && (
        <AiModal 
          onClose={() => setShowAiModal(false)}
          darkMode={darkMode}
        />
      )}

      <ToastContainer position="bottom-right" theme={darkMode ? "dark" : "light"} />
    </div>
  );
};

export default DonorDashboard;
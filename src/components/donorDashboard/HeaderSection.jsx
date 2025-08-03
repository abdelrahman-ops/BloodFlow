// import { FaBell, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';

// // import NotificationBell from './notifications/NotificationBell';
// // import UserProfile from './ui/UserProfile';
// // import ThemeToggle from './ui/ThemeToggle';
// import { useDonorStore } from '../../stores/donor.store';

// const HeaderSection = () => {
//   const { user, darkMode, toggleDarkMode } = useDonorStore();

//   return (
//     <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
//       <div>
//         <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text py-3">
//           Welcome, {user?.name || "Hero"}!
//         </h1>
//         <div className="flex items-center gap-2">
//           <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//             {new Date().toLocaleDateString()}
//           </span>
//           <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? "bg-gray-700" : "bg-red-100"} text-red-500`}>
//             {user?.donorInfo?.bloodType || "Unknown"} Type
//           </span>
//         </div>
//       </div>
      
//       <div className="flex items-center gap-4">
//         {/* <ThemeToggle /> */}
//         {/* <NotificationBell /> */}
//         {/* <UserProfile /> */}
//       </div>
//     </header>
//   );
// };

// export default HeaderSection;
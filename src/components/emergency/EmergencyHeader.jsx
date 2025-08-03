/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { MdOutlineContactEmergency } from 'react-icons/md';

const EmergencyHeader = ({ title, subtitle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="bg-red-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
        <MdOutlineContactEmergency className="text-red-600 text-3xl" />
      </div>
      <h1 className="text-3xl font-bold text-red-600 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </motion.div>
  );
};

export default EmergencyHeader;
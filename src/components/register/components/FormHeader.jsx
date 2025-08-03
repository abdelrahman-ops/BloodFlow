import { FiDroplet } from "react-icons/fi";
import { motion } from "framer-motion";

const FormHeader = ({ title, subtitle }) => (
    <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
    >
        <div className="bg-red-50 p-5 rounded-full inline-flex items-center justify-center mb-4 shadow-sm">
            <FiDroplet className="text-red-600 text-4xl" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
            {title}
        </h3>
        <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
            {subtitle}
        </p>
    </motion.div>
);

export default FormHeader;
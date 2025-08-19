import React, { useEffect, useState, useMemo } from 'react';
import { 
  FaExclamationTriangle, 
  FaHospital, 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt,
  FaClock,
  FaCheck,
  FaTimes,
  FaBell,
  FaUserClock,
  FaTint,
  FaSearch
} from 'react-icons/fa';
import { MdBloodtype, MdOutlineEmergency } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdminStore from '../../stores/adminStore';
import useDonorStore from '../../stores/donorStore';
import { useLanguageStore } from '../../stores/languageStore';
import { motion } from 'framer-motion';

const EmergencyRequestManagement = ({ darkMode }) => {
  const { language } = useLanguageStore();
  const { 
    emergencies, 
    loading, 
    error, 
    getEmergencyRequests, 
    handleEmergencyRequest 
  } = useAdminStore();
  const { donorList, getAllDonors } = useDonorStore();
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDonorList, setShowDonorList] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getEmergencyRequests();
  }, [getEmergencyRequests]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Process emergencies data to match expected structure
  const processedEmergencies = useMemo(() => {
    return emergencies.map(emergency => {
      // Ensure the emergency object has all required properties
      return {
        id: emergency.id || emergency._id,
        hospital: emergency.hospitalName || emergency.hospital || 'Unknown Hospital',
        bloodType: emergency.bloodType || emergency.bloodGroup || 'Unknown',
        units: emergency.units || emergency.unitsNeeded || 1,
        urgency: emergency.urgency || 'medium',
        status: emergency.status || 'pending',
        createdAt: emergency.createdAt || emergency.date || new Date().toISOString(),
        location: {
          governorate: emergency.location?.governorate || emergency.city || 'Unknown',
          district: emergency.location?.district || emergency.area || 'Unknown',
          coordinates: emergency.location?.coordinates || null
        },
        notes: emergency.notes || emergency.description || '',
        contactPhone: emergency.contactPhone || emergency.phone || '',
        donorResponses: emergency.donorResponses || []
      };
    });
  }, [emergencies]);

  const filteredRequests = useMemo(() => {
    return processedEmergencies.filter(request => {
      const matchesFilter = filter === 'all' || request.status === filter;
      const matchesSearch = request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           request.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [processedEmergencies, filter, searchTerm]);

  const handleRequestAction = async (id, action) => {
    try {
      await handleEmergencyRequest(id, action);
      toast.success(
        language === 'en' 
          ? `Request ${action === 'approve' ? 'approved' : 'rejected'} successfully`
          : `تم ${action === 'approve' ? 'الموافقة على' : 'رفض'} الطلب بنجاح`
      );
      
      // If approved, fetch matching donors
      if (action === 'approve') {
        const approvedRequest = processedEmergencies.find(req => req.id === id);
        if (approvedRequest) {
          await getAllDonors({
            bloodType: approvedRequest.bloodType,
            city: approvedRequest.location.governorate,
            availability: true
          });
        }
      }
    } catch (err) {
      toast.error(
        language === 'en'
          ? `Failed to ${action} request`
          : `فشل ${action === 'approve' ? 'الموافقة على' : 'رفض'} الطلب`
      );
    }
  };

  const notifyDonors = async (requestId) => {
    try {
      toast.info(
        language === 'en'
          ? 'Notifying eligible donors...'
          : 'جارٍ إعلام المتبرعين المؤهلين...'
      );
      
      // Simulate notification
      setTimeout(() => {
        toast.success(
          language === 'en'
            ? 'Notifications sent to eligible donors'
            : 'تم إرسال الإشعارات إلى المتبرعين المؤهلين'
        );
      }, 2000);
    } catch (err) {
      toast.error(
        language === 'en'
          ? 'Failed to notify donors'
          : 'فشل في إعلام المتبرعين'
      );
    }
  };

  const renderStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'pending':
      case 'hospital_pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>
          <FaClock className="inline mr-1" />
          {language === 'en' ? 'Pending' : 'قيد الانتظار'}
        </span>;
      case 'approved':
      case 'verified':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
          <FaBell className="inline mr-1" />
          {language === 'en' ? 'Approved' : 'تمت الموافقة'}
        </span>;
      case 'rejected':
        return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>
          <FaTimes className="inline mr-1" />
          {language === 'en' ? 'Rejected' : 'مرفوض'}
        </span>;
      case 'fulfilled':
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
          <FaCheck className="inline mr-1" />
          {language === 'en' ? 'Fulfilled' : 'تم الوفاء'}
        </span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}>
          {status}
        </span>;
    }
  };

  const renderUrgencyBadge = (urgency) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (urgency) {
      case 'critical':
        return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>
          <MdOutlineEmergency className="inline mr-1" />
          {language === 'en' ? 'Critical' : 'حرج'}
        </span>;
      case 'high':
        return <span className={`${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`}>
          {language === 'en' ? 'High' : 'عالي'}
        </span>;
      case 'medium':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>
          {language === 'en' ? 'Medium' : 'متوسط'}
        </span>;
      case 'low':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
          {language === 'en' ? 'Low' : 'منخفض'}
        </span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}>
          {urgency}
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaExclamationTriangle className="text-red-500" />
            {language === 'en' ? 'Emergency Requests' : 'طلبات الطوارئ'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {language === 'en' 
              ? 'Manage and respond to emergency blood requests' 
              : 'إدارة والرد على طلبات الدم الطارئة'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'en' ? 'Search requests...' : 'بحث الطلبات...'}
              className="pl-8 pr-4 py-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <select
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">{language === 'en' ? 'All' : 'الكل'}</option>
            <option value="pending">{language === 'en' ? 'Pending' : 'قيد الانتظار'}</option>
            <option value="approved">{language === 'en' ? 'Approved' : 'تمت الموافقة'}</option>
            <option value="rejected">{language === 'en' ? 'Rejected' : 'مرفوض'}</option>
            <option value="fulfilled">{language === 'en' ? 'Fulfilled' : 'تم الوفاء'}</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FaExclamationTriangle className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'No emergency requests found' : 'لا توجد طلبات طارئة'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {language === 'en' 
                  ? 'When new emergency requests come in, they will appear here'
                  : 'عند وصول طلبات طارئة جديدة، ستظهر هنا'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all ${
                    selectedRequest?.id === request.id
                      ? 'border-2 border-red-500 bg-red-50 dark:bg-gray-800'
                      : 'border border-gray-200 dark:border-gray-700 hover:border-red-300 bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        <FaHospital className="text-red-500" />
                        {request.hospital}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {renderStatusBadge(request.status)}
                        {renderUrgencyBadge(request.urgency)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(request.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <MdBloodtype className="text-red-500" />
                      <span className="font-medium">{request.bloodType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTint className="text-red-500" />
                      <span className="font-medium">
                        {request.units} {language === 'en' ? 'units' : 'وحدات'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>
                        {request.location.district}, {request.location.governorate}
                      </span>
                    </div>
                    {request.contactPhone && (
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-red-500" />
                        <span>{request.contactPhone}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Request Details */}
        <div className="space-y-4">
          {selectedRequest ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">
                  {language === 'en' ? 'Request Details' : 'تفاصيل الطلب'}
                </h3>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {language === 'en' ? 'Hospital' : 'المستشفى'}
                  </h4>
                  <p className="font-medium">{selectedRequest.hospital}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {language === 'en' ? 'Blood Type' : 'فصيلة الدم'}
                    </h4>
                    <p className="font-medium">{selectedRequest.bloodType}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {language === 'en' ? 'Units Needed' : 'الوحدات المطلوبة'}
                    </h4>
                    <p className="font-medium">{selectedRequest.units}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {language === 'en' ? 'Location' : 'الموقع'}
                  </h4>
                  <p>
                    {selectedRequest.location.district}, {selectedRequest.location.governorate}
                  </p>
                  {selectedRequest.location.coordinates && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      ({selectedRequest.location.coordinates.lat}, {selectedRequest.location.coordinates.lng})
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {language === 'en' ? 'Urgency' : 'الاستعجال'}
                  </h4>
                  {renderUrgencyBadge(selectedRequest.urgency)}
                </div>
                
                {selectedRequest.notes && (
                  <div>
                    <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {language === 'en' ? 'Notes' : 'ملاحظات'}
                    </h4>
                    <p className="whitespace-pre-line">{selectedRequest.notes}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {language === 'en' ? 'Status' : 'الحالة'}
                  </h4>
                  {renderStatusBadge(selectedRequest.status)}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {language === 'en' ? 'Created At' : 'وقت الإنشاء'}
                  </h4>
                  <p>{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  {(selectedRequest.status === 'pending' || selectedRequest.status === 'hospital_pending') && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRequestAction(selectedRequest.id, 'approve')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FaCheck />
                        {language === 'en' ? 'Approve' : 'موافقة'}
                      </button>
                      <button
                        onClick={() => handleRequestAction(selectedRequest.id, 'reject')}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FaTimes />
                        {language === 'en' ? 'Reject' : 'رفض'}
                      </button>
                    </div>
                  )}
                  
                  {(selectedRequest.status === 'approved' || selectedRequest.status === 'verified') && (
                    <button
                      onClick={() => {
                        notifyDonors(selectedRequest.id);
                        setShowDonorList(true);
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                    >
                      <FaBell />
                      {language === 'en' ? 'Notify Eligible Donors' : 'إعلام المتبرعين المؤهلين'}
                    </button>
                  )}
                  
                  {selectedRequest.donorResponses && selectedRequest.donorResponses.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FaUserClock className="text-blue-500" />
                        {language === 'en' ? 'Donor Responses' : 'ردود المتبرعين'}
                      </h4>
                      <div className="space-y-2">
                        {selectedRequest.donorResponses.map((response, index) => (
                          <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex justify-between">
                              <span className="font-medium">{response.donorName}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(response.responseTime).toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-sm">{response.phone}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                response.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}>
                                {response.status === 'confirmed' 
                                  ? (language === 'en' ? 'Confirmed' : 'مؤكد') 
                                  : (language === 'en' ? 'Pending' : 'قيد الانتظار')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <FaExclamationTriangle className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'Select a request' : 'حدد طلبًا'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {language === 'en' 
                  ? 'Click on a request to view details and take action'
                  : 'انقر فوق طلب لعرض التفاصيل واتخاذ الإجراء'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Eligible Donors Modal */}
      {showDonorList && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {language === 'en' 
                  ? `Eligible Donors for ${selectedRequest.bloodType}`
                  : `المتبرعون المؤهلون لفصيلة ${selectedRequest.bloodType}`}
              </h3>
              <button 
                onClick={() => setShowDonorList(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              {donorList?.donors && donorList.donors.length > 0 ? (
                <div className="space-y-3">
                  {donorList.donors.map(donor => (
                    <div key={donor.id} className="p-3 border dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                            <FaUser className="text-gray-500 dark:text-gray-300" />
                          </div>
                          <div>
                            <h4 className="font-medium">{donor.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {donor.bloodType} • {donor.city}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a 
                            href={`tel:${donor.phone}`}
                            className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                            title={language === 'en' ? 'Call donor' : 'اتصال بالمتبرع'}
                          >
                            <FaPhone />
                          </a>
                          <button
                            onClick={() => {
                              toast.success(
                                language === 'en'
                                  ? `Notification sent to ${donor.name}`
                                  : `تم إرسال الإشعار إلى ${donor.name}`
                              );
                            }}
                            className="p-2 bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
                            title={language === 'en' ? 'Notify donor' : 'إعلام المتبرع'}
                          >
                            <FaBell />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaUser className="mx-auto text-gray-400 text-4xl mb-4" />
                  <h4 className="text-lg font-medium">
                    {language === 'en' ? 'No eligible donors found' : 'لا يوجد متبرعون مؤهلون'}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {language === 'en'
                      ? 'Try expanding your search criteria'
                      : 'حاول توسيع معايير البحث الخاصة بك'}
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setShowDonorList(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {language === 'en' ? 'Close' : 'إغلاق'}
              </button>
              <button
                onClick={() => {
                  notifyDonors(selectedRequest.id);
                  setShowDonorList(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                {language === 'en' ? 'Notify All' : 'إعلام الكل'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyRequestManagement;
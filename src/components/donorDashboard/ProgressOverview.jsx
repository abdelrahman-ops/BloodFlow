const ProgressOverview = ({ user, darkMode, setShowBookingModal, setShowAiModal, nextDonationDate, daysUntilNextDonation }) => {
  const progressCards = [
    {
      title: "Next Donation",
      value: nextDonationDate,
      icon: <FaCalendarAlt className="text-red-500" />,
      color: "red",
      action: () => setShowBookingModal(true),
      actionText: "Book Donation",
      actionIcon: <MdLocalHospital />,
      progress: Math.min(100, 100 - (daysUntilNextDonation / 90 * 100))
    },
    // Other cards...
  ];

  return (
    <section className="mb-8">
      <div className={`rounded-xl p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaTint className="text-red-500" />
            Your Donation Journey
          </h2>
          <DonorBadges user={user} darkMode={darkMode} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressCards.map((card, index) => (
            <ProgressCard key={index} darkMode={darkMode} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
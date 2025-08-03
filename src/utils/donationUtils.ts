// utils/donationUtils.ts
export const calculateNextDonation = (lastDate) => {
    if (!lastDate) {
        return { nextDate: "You can donate now!", daysLeft: 0 };
    }
    
    const nextDate = new Date(lastDate);
    nextDate.setMonth(nextDate.getMonth() + 3);
    const today = new Date();
    const daysLeft = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    return { nextDate, daysLeft };
};

// Sample data - could be moved to a separate constants file
export const donationTrends = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    data: [2, 3, 1, 5, 4, 3, 2],
};

export const bloodHealthData = {
    hemoglobin: "13.5 g/dL",
    ironLevels: "Normal",
    plateletsCount: "250,000/µL",
    cholesterol: "180 mg/dL",
    vitaminD: "30 ng/mL",
    bloodPressure: "120/80 mmHg",
};

export const donorAchievements = [
    { id: 1, name: "First Donation", earned: true, icon: "FaTint", color: "red" },
    { id: 2, name: "5 Donations", earned: true, icon: "FaTrophy", color: "yellow" },
    { id: 3, name: "Life Saver", earned: false, icon: "IoMdRibbon", color: "blue" },
    { id: 4, name: "Regular Donor", earned: true, icon: "FaAward", color: "purple" },
];

export const donorCoupons = [
    { id: 1, name: "Coffee Voucher", value: "$5", expiry: "2023-12-31", icon: "RiCoupon2Fill", color: "green" },
    { id: 2, name: "Movie Ticket", value: "1 Free", expiry: "2023-11-30", icon: "RiCoupon2Fill", color: "blue" },
    { id: 3, name: "Restaurant Discount", value: "20% Off", expiry: "2024-01-15", icon: "RiCoupon2Fill", color: "purple" },
];

export const bloodTypeDistribution = [
    { name: "O+", value: 38, color: "#FF6384" },
    { name: "A+", value: 34, color: "#36A2EB" },
    { name: "B+", value: 18, color: "#FFCE56" },
    { name: "AB+", value: 10, color: "#4BC0C0" },
];
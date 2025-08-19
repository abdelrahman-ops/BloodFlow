// utils/donationUtils.ts

// Utility functions
export const calculateNextDonation = (lastDate: Date | string | null) => {
    if (!lastDate) {
        return { nextDate: "You can donate now!", daysLeft: 0 };
    }
    
    const nextDate = new Date(lastDate);
    nextDate.setMonth(nextDate.getMonth() + 3);
    const today = new Date();
    const daysLeft = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    return { 
        nextDate: nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        daysLeft: Math.max(0, daysLeft)
    };
};

// Sample data
export const donationTrends = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [2, 3, 1, 5, 4, 3, 2, 4, 3, 2, 1, 4],
};

export const bloodHealthData = {
    hemoglobin: "14.2 g/dL",
    ironLevels: "Normal",
    plateletsCount: "255,000/µL",
    cholesterol: "175 mg/dL",
    vitaminD: "32 ng/mL",
    bloodPressure: "118/78 mmHg",
    whiteBloodCells: "6.5 K/µL",
    redBloodCells: "4.8 M/µL",
};

export const bloodTypeDistribution = [
    { 
        name: "O+", 
        value: 38, 
        color: "#FF6384",
        description: "Most common blood type (37.4% of population)",
        compatibility: ["O+", "A+", "B+", "AB+"],
        demand: "High"
    },
    { 
        name: "A+", 
        value: 28, 
        color: "#36A2EB",
        description: "Second most common blood type (28.3% of population)",
        compatibility: ["A+", "AB+"],
        demand: "Moderate"
    },
    { 
        name: "B+", 
        value: 20, 
        color: "#FFCE56",
        description: "Third most common blood type (20.6% of population)",
        compatibility: ["B+", "AB+"],
        demand: "Moderate"
    },
    { 
        name: "AB+", 
        value: 5, 
        color: "#4BC0C0",
        description: "Universal recipient (5.6% of population)",
        compatibility: ["AB+"],
        demand: "Low"
    },
    { 
        name: "O-", 
        value: 7, 
        color: "#9966FF",
        description: "Universal donor (6.6% of population)",
        compatibility: ["All types"],
        demand: "Very High"
    },
    { 
        name: "A-", 
        value: 6, 
        color: "#FF9F40",
        description: "Can donate to A and AB blood types (5.7% of population)",
        compatibility: ["A+", "A-", "AB+", "AB-"],
        demand: "High"
    },
    { 
        name: "B-", 
        value: 4, 
        color: "#8AC24A",
        description: "Can donate to B and AB blood types (4.2% of population)",
        compatibility: ["B+", "B-", "AB+", "AB-"],
        demand: "High"
    },
    { 
        name: "AB-", 
        value: 2, 
        color: "#F06292",
        description: "Rarest blood type (1.5% of population)",
        compatibility: ["AB+", "AB-"],
        demand: "Low"
    },
];

export const donationImpactData = [
    {
        title: "Lives Potentially Saved",
        value: "12",
        description: "Each donation can save up to 3 lives",
        icon: "heart"
    },
    {
        title: "Total Donations",
        value: "4",
        description: "Times you've donated blood",
        icon: "tint"
    },
    {
        title: "Liters Donated",
        value: "1.8L",
        description: "Approximate total blood volume donated",
        icon: "beaker"
    },
    {
        title: "Communities Impacted",
        value: "3",
        description: "Different locations where you've donated",
        icon: "users"
    },
    {
        title: "Hours Volunteered",
        value: "8",
        description: "Time spent in donation centers",
        icon: "clock"
    },
    {
        title: "Health Benefits",
        value: "Excellent",
        description: "Your regular donations improve your health",
        icon: "heartbeat"
    }
];

export const healthMetrics = [
    {
        date: "2023-01-15",
        hemoglobin: "13.8",
        ironLevel: "120 µg/dL",
        status: "Normal",
        notes: "Pre-donation checkup"
    },
    {
        date: "2023-03-22",
        hemoglobin: "14.1",
        ironLevel: "125 µg/dL",
        status: "Normal",
        notes: "Post-donation follow-up"
    },
    {
        date: "2023-06-10",
        hemoglobin: "14.5",
        ironLevel: "130 µg/dL",
        status: "Excellent",
        notes: "Routine check"
    },
    {
        date: "2023-09-05",
        hemoglobin: "14.2",
        ironLevel: "128 µg/dL",
        status: "Normal",
        notes: "Pre-donation checkup"
    },
    {
        date: "2023-11-18",
        hemoglobin: "14.0",
        ironLevel: "122 µg/dL",
        status: "Normal",
        notes: "Post-donation follow-up"
    }
];

export const donorAchievements = [
    { 
        id: 1, 
        name: "First Donation", 
        earned: true, 
        icon: "FaTint", 
        color: "red",
        description: "Completed your first blood donation",
        points: 50,
        dateEarned: "2023-01-15"
    },
    { 
        id: 2, 
        name: "Bronze Donor", 
        earned: true, 
        icon: "FaTrophy", 
        color: "yellow",
        description: "Completed 3 donations",
        points: 100,
        dateEarned: "2023-06-10"
    },
    { 
        id: 3, 
        name: "Life Saver", 
        earned: false, 
        icon: "IoMdRibbon", 
        color: "blue",
        description: "Potentially saved 10+ lives",
        points: 250,
        requiredDonations: 4
    },
    { 
        id: 4, 
        name: "Regular Donor", 
        earned: true, 
        icon: "FaAward", 
        color: "purple",
        description: "Donated every quarter for a year",
        points: 150,
        dateEarned: "2023-11-18"
    },
    { 
        id: 5, 
        name: "Community Hero", 
        earned: false, 
        icon: "FaMedal", 
        color: "gold",
        description: "Donated at 3 different locations",
        points: 200,
        requiredLocations: 3,
        currentProgress: 2
    }
];

export const donorCoupons = [
    { 
        id: 1, 
        name: "Coffee Voucher", 
        value: "$5", 
        expiry: "2023-12-31", 
        icon: "RiCoupon2Fill", 
        color: "green",
        pointsRequired: 50,
        description: "Enjoy a coffee on us!",
        available: true
    },
    { 
        id: 2, 
        name: "Movie Ticket", 
        value: "1 Free", 
        expiry: "2023-11-30", 
        icon: "RiCoupon2Fill", 
        color: "blue",
        pointsRequired: 100,
        description: "Free movie ticket to your favorite cinema",
        available: true
    },
    { 
        id: 3, 
        name: "Restaurant Discount", 
        value: "20% Off", 
        expiry: "2024-01-15", 
        icon: "RiCoupon2Fill", 
        color: "purple",
        pointsRequired: 75,
        description: "Discount at participating restaurants",
        available: true
    },
    { 
        id: 4, 
        name: "Health Check", 
        value: "Free", 
        expiry: "2024-03-01", 
        icon: "RiCoupon2Fill", 
        color: "red",
        pointsRequired: 150,
        description: "Complimentary basic health screening",
        available: false
    },
    { 
        id: 5, 
        name: "Gift Card", 
        value: "$25", 
        expiry: "2024-02-28", 
        icon: "RiCoupon2Fill", 
        color: "orange",
        pointsRequired: 200,
        description: "Redeemable at major retailers",
        available: false
    }
];

// Additional utility functions
export const calculateDonationImpact = (donationCount: number) => {
    return {
        livesSaved: donationCount * 3,
        litersDonated: donationCount * 0.45,
        communitiesImpacted: Math.min(donationCount, 5)
    };
};

export const getNextMilestone = (donationCount: number) => {
    const milestones = [1, 3, 5, 10, 20, 50];
    const next = milestones.find(m => m > donationCount) || null;
    return next ? { target: next, remaining: next - donationCount } : null;
};

export const formatBloodType = (bloodType: string) => {
    return bloodType.replace(/([+-])/g, '$1');
};
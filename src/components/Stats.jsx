import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useLanguage } from "../hooks/LanguageContext";

const Stats = () => {
    const { language } = useLanguage();

    const textContent = {
        en: {
            statsTitle: "Our Impact in Numbers",
            stats: [
                { label: "Donors", value: 10234, target: 15000 },
                { label: "Requests Fulfilled", value: 8451, target: 10000 },
                { label: "Lives Saved", value: 15893, target: 20000 },
                { label: "Volunteers", value: 5678, target: 8000 },
            ],
        },
        ar: {
            statsTitle: "تأثيرنا بالأرقام",
            stats: [
                { label: "المتبرعين", value: 10234, target: 15000 },
                { label: "الطلبات المُلباة", value: 8451, target: 10000 },
                { label: "الأرواح المُنقذة", value: 15893, target: 20000 },
                { label: "المتطوعين", value: 5678, target: 8000 },
            ],
        },
    };

    const content = textContent[language];
    const [progressValues, setProgressValues] = useState(
        content.stats.map(() => 0)
    );

    useEffect(() => {
        const intervals = content.stats.map((stat, index) => {
            return setInterval(() => {
                setProgressValues((prev) => {
                    const newValues = [...prev];
                    const percentage = Math.round((stat.value / stat.target) * 100);
                    if (newValues[index] < percentage) {
                        newValues[index] += 1;
                    }
                    return newValues;
                });
            }, 20);
        });

        return () => {
            intervals.forEach((interval) => clearInterval(interval));
        };
    }, [content.stats]);

    return (
        <section>
            <div className="py-2 px-6 rounded-lg relative z-20">
                <h2 className="text-center text-2xl sm:text-4xl font-bold text-gray-800 mb-3">
                    {content.statsTitle}
                </h2>
                
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {content.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-0 rounded-lg transform transition duration-300 hover:scale-105 blood"
                        >
                            <div className="w-24 h-24 sm:w-28 sm:h-28 mb-2">
                                <CircularProgressbar
                                    value={progressValues[index]}
                                    text={`${progressValues[index]}%`}
                                    styles={buildStyles({
                                        pathColor: `rgba(220, 38, 38, ${progressValues[index] / 100})`,
                                        textColor: "#DC2626",
                                        trailColor: "#E5E7EB",
                                        textSize: "16px",
										fontSize:"20rem"
                                    })}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-md sm:text-lg font-bold text-gray-800">
                                        {stat.value.toLocaleString()}
                                    </p>
                                    {/* <p className="text-xs sm:text-sm text-gray-500">
                                        / {stat.target.toLocaleString()}
                                    </p> */}
                                </div>
                            </div>
                            <p className="mt-4 text-lg font-medium text-gray-600">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;

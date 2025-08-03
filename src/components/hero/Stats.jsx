import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { useLanguageStore } from "../../stores/languageStore";

const Stats = () => {
    const { language } = useLanguageStore();

    const textContent = {
        en: {
            statsTitle: "Our Impact in Numbers",
            stats: [
                { label: "Donors", value: 12542, target: 20000 },
                { label: "Requests Fulfilled", value: 32156, target: 40000 },
                { label: "Lives Saved", value: 247, target: 500 },
            ],
        },
        ar: {
            statsTitle: "تأثيرنا بالأرقام",
            stats: [
                { label: "المتبرعين", value: 12542, target: 20000 },
                { label: "الطلبات المُلباة", value: 32156, target: 40000 },
                { label: "الأرواح المُنقذة", value: 247, target: 500 },
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
        <section className="py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {content.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 mb-4">
                                        <CircularProgressbar
                                            value={progressValues[index]}
                                            text={`${stat.value.toLocaleString()}+`}
                                            styles={buildStyles({
                                                pathColor: `rgba(220, 38, 38, ${progressValues[index] / 100})`,
                                                textColor: "#fff",
                                                trailColor: "rgba(255, 255, 255, 0.2)",
                                                textSize: "16px",
                                                pathTransitionDuration: 0.5,
                                            })}
                                        />
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-2">
                                        {stat.value.toLocaleString()}+
                                    </div>
                                    <div className="text-lg font-medium text-white/90">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
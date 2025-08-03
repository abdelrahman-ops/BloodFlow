/* eslint-disable react/prop-types */
const EmergencyProgressSteps = ({ step, steps, language }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between relative">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex flex-col items-center z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                ${step >= stepNumber ? 'bg-red-600 text-white' : 'bg-white border-2 border-red-300 text-red-400'}`}>
              {step > stepNumber ? '✓' : stepNumber}
            </div>
            <span className="mt-2 text-sm font-medium">
              {steps[Object.keys(steps)[stepNumber-1]][language]}
            </span>
          </div>
        ))}
        <div className="absolute top-6 left-1/4 right-1/4 h-1 bg-gray-200 z-0"></div>
        <div className={`absolute top-6 left-1/4 h-1 bg-red-600 z-10 transition-all duration-500 
            ${step >= 2 ? 'w-2/4' : step === 1 ? 'w-0' : 'w-full'}`}></div>
      </div>
    </div>
  );
};

export default EmergencyProgressSteps;
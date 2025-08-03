import { useState } from 'react';

const useDonorSearch = () => {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const resultsPerPage = 8;

    const handleSearch = async ({ location, bloodType }) => {
        setError("");
        setResults([]);
        setIsLoading(true);
        setShowResults(false);

        if (!bloodType) {
            setError("Please select a blood type to search");
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            try {
                // Mock data - in a real app you would fetch from an API
                const mockData = Array.from({ length: 24 }, (_, i) => ({
                    id: i + 1,
                    name: `Donor ${i + 1}`,
                    bloodType: bloodType,
                    city: location || (i % 2 === 0 ? "Cairo" : "Alex"),
                    phone: `05${Math.floor(10000000 + Math.random() * 90000000)}`,
                    lastDonation: `${Math.floor(Math.random() * 12) + 1} months ago`,
                    available: Math.random() > 0.3
                }));

                setResults(mockData);
                setShowResults(true);
            } catch {
                setError("Failed to load donor data");
            } finally {
                setIsLoading(false);
            }
        }, 800);
    };

    // Calculate pagination
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(results.length / resultsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return {
        showResults,
        setShowResults,
        results,
        error,
        currentPage,
        isLoading,
        handleSearch,
        paginate,
        totalPages,
        indexOfFirstResult,
        indexOfLastResult,
        currentResults
    };
};

export default useDonorSearch;
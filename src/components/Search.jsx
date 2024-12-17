/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Search = () => {
    const [location, setLocation] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const resultsPerPage = 20; // Number of results per page

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setResults([]); // Clear previous results

        if (!bloodType) {
            setError("Please select a blood type.");
            return;
        }

        try {
            // Dynamically import the JSON file based on the selected blood type
            const data = await import(`../assets/data/${bloodType}.json`);

            // Filter data based on location
            const filteredResults = data.default.filter((donor) => {
                return location
                    ? donor.City.toLowerCase().includes(location.toLowerCase())
                    : true;
            });

            setResults(filteredResults);
        } catch (err) {
            setError("Failed to load data for the selected blood type.");
        }
    };

    // Calculate which results to display based on the current page
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="pt-8">
            <div className="container mx-auto text-center ">
                <h2 className="text-2xl font-bold text-red-600">Quick Search</h2>
                <p className="mt-2 text-gray-700">Find donors or blood banks near you.</p>

                {/* Search Form */}
                <form className="mt-6 flex flex-wrap justify-center gap-4 " onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Enter your location"
                        className="px-4 py-2 rounded shadow w-full sm:w-1/3"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 rounded shadow w-full sm:w-1/4"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                    >
                        <option value="">Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
                    >
                        Search
                    </button>
                </form>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/* Results Section */}
                <div className={`mt-8 w-auto p-4 scrollbar-custom flex flex-wrap justify-center gap-4 pl-0 md:ml-52 md:mr-52 ${results.length > 0 ? "shadow" : ""} ${results.length === 0 ? "h-auto" : "h-64 overflow-y-auto"}`}>
                    {results.length > 0 ? (
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {currentResults.map((donor, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white shadow rounded-lg text-left"
                                >
                                    <h3 className="text-lg font-bold text-red-600">
                                        {donor["Blood Type"]} Donor
                                    </h3>
                                    <p className="text-gray-700">
                                        <strong>City:</strong> {donor.City}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Phone 1:</strong>{" "}
                                        {String(donor["Phone 1"])}
                                    </p>
                                    {donor["Phone 2"] && (
                                        <p className="text-gray-700">
                                            <strong>Phone 2:</strong> {donor["Phone 2"]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 ">
                            {results.length === 0 && !error
                                ? "Enter your search criteria to find donors."
                                : null}
                        </p>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-center gap-4 ">
                    {currentPage > 1 && (
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className="px-4 py-2 bg-gray-300 text-[#0D1321] rounded"
                        >
                            Previous
                        </button>
                    )}
                    {currentPage < Math.ceil(results.length / resultsPerPage) && (
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className="px-4 py-2 bg-gray-300 text-[#0D1321] rounded"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Search;

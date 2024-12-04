// import React from 'react'



const Search = () => {
    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl font-bold text-red-600">Quick Search</h2>
                <p className="mt-2 text-gray-700">Find donors or blood banks near you.</p>
                <form className="mt-6 flex flex-wrap justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Enter your location"
                        className="px-4 py-2 rounded shadow w-full sm:w-1/3"
                    />
                    <select className="px-4 py-2 rounded shadow w-full sm:w-1/4">
                        <option>Blood Type</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                    </select>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
                    >
                        Search
                    </button>
                </form>
                
            </div>
        </section>
    )
}

export default Search

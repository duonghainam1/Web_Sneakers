
const Pagination = () => {
    return (
        <div className="flex justify-center">
            <div className="flex  items-center gap-4 my-8">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                </span>
                <button className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white  rounded">1</button>
                <button className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white rounded">2</button>
                <button className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white rounded">3</button>
                <button className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white rounded">4</button>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
                </span>
            </div>
        </div>
    )
}

export default Pagination
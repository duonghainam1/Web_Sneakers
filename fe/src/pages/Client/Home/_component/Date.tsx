
const Date = () => {
    return (
        <div className="month dhn-container grid grid-cols-2 gap-4 items-center">
            <div>
                <h2 className="text-3xl font-medium mb-4">Deals of the Month</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta officia aliquam
                    veritatis
                    molestias architecto, itaque sed corrupti animi similique perferendis. Ab deserunt
                    quibusdam
                    cumque ullam alias voluptatum sunt nemo? Perferendis?
                </p>
                <div className="flex gap-5 my-4">
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">120</h1>
                        <span>Days</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">18</h1>
                        <span>Hours</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">15</h1>
                        <span>Mins</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">10</h1>
                        <span>Secs</span>
                    </div>
                </div>
                <button className="dhn-btn w-44 h-12 text-sm flex justify-center items-center gap-3 mt-8">View All
                    Products <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                    </span></button>
            </div>
            <div>
                <img src="../img/Rectangle 3463273.png" alt="" />
            </div>
        </div>
    )
}

export default Date
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Description = ({ data_Detail }: any) => {
    const [activeTab, setActiveTab] = useState<string>("description");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="my-8">
            <div className="flex gap-4 mb-4 pb-2 border-b-2 border-gray-100">
                <h1
                    className={`cursor-pointer ${activeTab === "description" ? "border-b-2 border-black" : ""}`}
                    onClick={() => handleTabClick("description")}
                >
                    Mô tả
                </h1>
                {/* <h1
                    className={`cursor-pointer ${activeTab === "information" ? "border-b-2 border-black" : ""}`}
                    onClick={() => handleTabClick("information")}
                >
                    Additional Information
                </h1> */}
                <h1
                    className={`cursor-pointer ${activeTab === "reviews" ? "border-b-2 border-black" : ""}`}
                    onClick={() => handleTabClick("reviews")}
                >
                    Đánh giá
                </h1>
            </div>

            {activeTab === "description" && (
                <p id="description" className="ha-content">
                    {data_Detail?.product?.description}
                </p>
            )}

            {/* {activeTab === "information" && (
                <div id="information" className="border-b-2 ha-content">
                    <div className="flex gap-4">
                        <h3 className="font-bold mb-3 w-14">Color</h3>
                        <p className="mb-2">Red, Blue, Orange, Black</p>
                    </div>
                    <div className="flex gap-4 mb-2 ">
                        <h3 className="w-14 font-bold mb-3">Size</h3>
                        <p>S, M, XL, XXL</p>
                    </div>
                </div>
            )} */}

            {activeTab === "reviews" && (
                <div id="reviews" className="ha-content">
                    <div>
                        <h3 className="font-bold mb-3 text-xl">Customer Reviews</h3>
                        <div className="py-6 border-b-2">
                            <div className="flex gap-4">
                                <img src="../img/avatar-hai.jpg" className="w-10 h-10" alt="Avatar" />
                                <div>
                                    <p>Mark Williams</p>
                                    <span className="flex gap-2 text-yellow-300">
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-medium mb-3 mt-2">Excellent Product, I Love It</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, odio temporibus.
                                Quibusdam recusandae mollitia tempore quo, totam commodi a reprehenderit maxime,
                                tempora dicta quam eveniet veritatis quis harum blanditiis sint.
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-300">Review by</span> Krist
                                <span className="text-gray-300">Posted on</span> June 05, 2023
                            </p>
                        </div>
                        <div className="py-6 border-b-2">
                            <div className="flex gap-4">
                                <img src="../img/avatar-hai.jpg" className="w-10 h-10" alt="Avatar" />
                                <div>
                                    <p>Mark Williams</p>
                                    <span className="flex gap-2 text-yellow-300">
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-medium mb-3 mt-2">Excellent Product, I Love It</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, odio temporibus.
                                Quibusdam recusandae mollitia tempore quo, totam commodi a reprehenderit maxime,
                                tempora dicta quam eveniet veritatis quis harum blanditiis sint.
                            </p>
                            <p className="mt-2">
                                <span className="text-gray-300">Review by</span> Krist
                                <span className="text-gray-300">Posted on</span> June 05, 2023
                            </p>
                        </div>
                    </div>
                    <div className="my-6">
                        <h3 className="font-bold mb-[30px] text-xl">Add your Review</h3>
                        <div className="mb-[35px]">
                            <span className="px-5 border-r-2">
                                <i className="fa-regular fa-star" />
                            </span>
                            <span className="px-5 border-r-2">
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                            </span>
                            <span className="px-5 border-r-2">
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                            </span>
                            <span className="px-5 border-r-2">
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                            </span>
                            <span className="px-5 border-r-2">
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                                <i className="fa-regular fa-star" />
                            </span>
                        </div>
                        <form>
                            <div className="pb-[25px]">
                                <label>Name</label> <br />
                                <input
                                    type="text"
                                    className="border border-black outline-none w-full h-10 rounded-lg px-3 my-2"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div className="pb-[25px]">
                                <label>Email Address</label> <br />
                                <input
                                    type="text"
                                    className="border border-black outline-none w-full h-10 rounded-lg px-3 my-2"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div className="pb-[25px]">
                                <label>Your Review</label> <br />
                                <textarea
                                    className="border border-black outline-none w-full h-20 rounded-lg p-3 my-2"
                                    placeholder="Enter Your Review"
                                />
                            </div>
                            <button type="submit" className="dhn-btn w-[137px] h-[55px]">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Description;

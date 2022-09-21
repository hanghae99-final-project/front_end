import React, { useEffect } from "react";
import { __getDday } from "../../app/slice/DdaySlice";
import { useDispatch, useSelector } from "react-redux";

const DdayList = () => {
    const dispatch = useDispatch();
    const dDay = useSelector((state) => state.dDay.myDday);
    
    useEffect(() => {
        dispatch(__getDday());
    }, []);
    
    return (
        <ul>
            {dDay.map((data) => {
                const today = new Date().getTime();
                const deadline = new Date(data.deadline).getTime();
                const dDay = Math.ceil((deadline - today) / (1000 * 60 *60 *24))
                
                return (
                    <div>
                        <li>
                            <div>
                                <div>
                                    <div>
                                        <p>{ dDay === 0 ? "D-day" : `D-${dDay}` }</p>
                                        <p>{ data.content }</p>
                                        <p>{data.deadline}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button></button>
                                <button></button>
                            </div>
                        </li>
                    </div>
                )
            })
            }
        </ul>
    );
};

export default DdayList;

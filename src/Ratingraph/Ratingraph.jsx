import { useState, useEffect } from "react";
import "../Ratingraph/Ratingraph.css"
import { LineChart } from "@mui/x-charts/LineChart";

export default function Ratingraph() {
    const [ratingchange, setrating] = useState({});
    useEffect(() => {
        const navsearchicon = document.querySelector(".nav-search-icon");
        navsearchicon.addEventListener('click', async () => {
            const username = document.querySelector(".nav-search-name");
            await fetch(`https://codeforces.com/api/user.rating?handle=${username.value}`)
                .then((response) => {
                    return response.json();
                })
                .then((apidata) => {
                    setrating(apidata);
                })
        })
    })
    useEffect(() => {
        console.log(ratingchange);
    }, [ratingchange])
    return (
        <>
            <div className="ratingplot">
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
        </>
    );
}
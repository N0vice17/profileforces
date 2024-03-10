import { useEffect, useState } from "react";
import "../Home/Home.css"
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Home() {
    const [cfdata, setdata] = useState({
        country: "country",
        handle: "cf_handle",
        maxRank: "max_rank",
        maxRating: "max_rating",
        rank: "rank",
        rating: "rating",
        city: "city",
    });
    const [apiprobrating, setprobrating] = useState([]);
    const [diffrating, setdiffrating] = useState(0);
    const [trend, settrend] = useState("\u2191");
    const [rating, setrating] = useState([]);
    const [problemcount, setproblemcount] = useState([]);
    const data = {
        labels: rating,
        datasets: [
            {
                label: 'Problems',
                backgroundColor: ['#BFBFBF', '#BFBFBF', '#BFBFBF', '#BFBFBF', '#84EC63', '#84EC63', '#81F1BF', '#81F1BF', '#8C89FE', '#8C89FE', '#8C89FE', '#E478FE', '#E478FE'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: problemcount,
            },
        ],
    }
    useEffect(() => {
        const navsearchicon = document.querySelector(".nav-search-icon");
        navsearchicon.addEventListener('click', () => {
            const username = document.querySelector(".nav-search-name");
            const fetchprofdata = async () => {
                try {
                    await fetch(`https://codeforces.com/api/user.info?handles=${username.value}`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((apidata) => {
                            setdata(apidata.result[0]);
                        })
                } catch (error) {

                }
            }
            const fetchproblemcount = async () => {
                try {
                    await fetch(`https://codeforces.com/api/user.status?handle=${username.value}`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((apidata) => {
                            setprobrating(apidata.result);
                        })
                } catch (error) {

                }
            }
            fetchprofdata();
            fetchproblemcount();
        })
    }, [])
    useEffect(() => {
        var problem_count = new Array(13).fill(0);
        var problem_rating = [];
        for (var i = 800; i <= 2000; i += 100) {
            problem_rating.push(`${i}`);
        }
        setrating(problem_rating);
        for (var i = 0; i < apiprobrating.length; i++) {
            if (apiprobrating[i].verdict == "OK" && apiprobrating[i].problem.rating <= 2000) {
                problem_count[(apiprobrating[i].problem.rating / 100) - 8] += 1;
            }
        }
        setproblemcount(problem_count);
    }, [apiprobrating])
    useEffect(() => {
        const rank = document.querySelector(".profile-normal-rank");
        const maxrank = document.querySelector(".profile-max-rank");
        const rating = document.querySelector(".profile-normal-rating");
        const maxrating = document.querySelector(".profile-max-rating");
        setdiffrating(parseInt(cfdata.rating) - parseInt(cfdata.maxRating));
        if (diffrating < 0) {
            settrend("\u2193");
        }
        else {
            settrend("\u2191")
        }
        var ranks =
            [
                ["newbie", "#808298"],
                ["pupil", "#008020"],
                ["specialist", "#03A89E"],
                ["expert", "#0000FF"],
                ["candidate master", "#AA04AA"],
                ["master", "#FF8C00"],
                ["international master"],
                ["grandmaster", "#FF0000"],
                ["international grandmaster", "#FF3333"],
                ["legendary grandmaster", "#AA0000"]
            ];
        for (var i = 0; i < ranks.length; i++) {
            if (ranks[i][0] == cfdata.rank) {
                rank.style.color = ranks[i][1];
                rating.style.color = ranks[i][1];
            }
            if (ranks[i][0] == cfdata.maxRank) {
                maxrank.style.color = ranks[i][1];
                maxrating.style.color = ranks[i][1];
            }
        }
    }, [cfdata])
    return (
        <>
            <div className='container'>
                <div className="profile-section">
                    <div className="profile-id">
                        <div className="cf_id">
                            {"Codeforces ID: " + cfdata.handle}
                        </div>
                    </div>
                    <div className="profile-rank">
                        <p>Maximum Rating :</p>
                        <div className="profile-max-rating">
                            {cfdata.maxRating}
                        </div>
                        <div className="profile-max-rank">
                            {"Maximum Rank: " + cfdata.maxRank}
                        </div>
                    </div>
                    <div className="profile-rating">
                        <div className="profile-normal-rank">
                            {"Current Rank: " + cfdata.rank}
                        </div>
                        <div className="profile-normal-rating">
                            {"Current Rating: " + cfdata.rating} {"(" + diffrating + ")" + trend}
                        </div>

                    </div>
                </div>
                <div className="problem-count">
                    <Bar
                        data={data}
                        options={{
                            responsive: true,
                            animation: {
                                duration: 1000,
                                easing: 'easeInOutQuart',
                                // from: 0,
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );
}

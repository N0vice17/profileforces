import { useEffect, useState } from "react";
import "../Home/Home.css"

export default function Home() {
    const [cfdata, setdata] = useState({
        contribution: "0",
        country: "country",
        handle: "cf_handle",
        maxRank: "max_rank",
        maxRating: "max_rating",
        rank: "rank",
        rating: "rating",
        organization: "organization",
    });
    useEffect(() => {
        const navsearchicon = document.querySelector(".nav-search-icon");
        navsearchicon.addEventListener('click', () => {
            const username = document.querySelector(".nav-search-name");
            fetch(`https://codeforces.com/api/user.info?handles=${username.value}`)
                .then((response) => {
                    return response.json();
                })
                .then((apidata) => {
                    setdata(apidata.result[0]);
                })
        })
    })
    useEffect(() => {
        const rank = document.querySelector(".profile-normal-rank");
        const maxrank = document.querySelector(".profile-max-rank");
        const rating = document.querySelector(".profile-normal-rating");
        const maxrating = document.querySelector(".profile-max-rating");
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
            <div className="profile-section">
                <div className="profile-id">
                    <div className="cf_id">
                        {"Codeforces ID: " + cfdata.handle}
                    </div>
                    <div className="cf-organization">
                        {"Oraganization: " + cfdata.organization}
                    </div>
                    <div className="cf-contribution">
                        {"Contribution: " + cfdata.contribution}
                    </div>
                </div>
                <div className="profile-rank">
                    <div className="profile-normal-rank">
                        {"Current Rank: " + cfdata.rank}
                    </div>
                    <div className="profile-max-rank">
                        {"Maximum Rank: " + cfdata.maxRank}
                    </div>
                </div>
                <div className="profile-rating">
                    <div className="profile-normal-rating">
                        {"Current Rating: " + cfdata.rating}
                    </div>
                    <div className="profile-max-rating">
                        {"Maximum Rating: " + cfdata.maxRating}
                    </div>
                </div>
            </div>
        </>
    );
}

import { useEffect, useState } from "react";
import "../Problems/Problemgraph.css"
import { BarChart } from "@mui/x-charts/BarChart";

export default function Problemgraph() {
    const [cfproblemset, setdata] = useState({});
    const [problems, setproblems] = useState(new Array(10).fill(0));
    const [rank, setrank] = useState(new Array(36).fill(0));
    useEffect(() => {
        const navsearchicon = document.querySelector(".nav-search-icon")
        navsearchicon.addEventListener('click', () => {
            const username = document.querySelector(".nav-search-name");
            fetch(`https://codeforces.com/api/user.status?handle=${username.value}`)
                .then((response) => {
                    return response.json();
                })
                .then((apidata) => {
                    setdata(apidata.result);
                })
                .catch(error => {

                })
        })
    })
    useEffect(() => {
        var datasize = cfproblemset.length;
        for (var i = 0; i < 7; i++) {
            problems[i] = 0;
        }
        for (var i = 0; i < 21; i++) {
            rank[i] = 0;
        }
        for (var i = 0; i < datasize; i++) {
            var index = cfproblemset[i].problem.index[0];
            if (cfproblemset[i].verdict == "OK") {
                if (index == 'A') problems[0] += 1;
                if (index == 'B') problems[1] += 1;
                if (index == 'C') problems[2] += 1;
                if (index == 'D') problems[3] += 1;
                if (index == 'E') problems[4] += 1;
                if (index == 'F') problems[5] += 1;
                if (index == 'G') problems[6] += 1;
                if (index == 'H') problems[7] += 1;
            }
        }
        for (var i = 0; i < datasize; i++) {
            if (cfproblemset[i].verdict == "OK") {
                rank[parseInt(cfproblemset[i].problem.rating) / 100] += 1;
            }
        }
    }, [cfproblemset])
    return (
        <>
            <div className="graph-section">
                <div className="graph">
                    <BarChart
                        title="Levels Of Probelms"
                        xAxis={[{
                            scaleType: 'band',
                            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
                        }]}
                        series={[{ data: [problems[0], problems[1], problems[2], problems[2], problems[3], problems[4], problems[5], problems[6]] }]}
                        width={540}
                        height={330}
                    />
                </div>
                <div className="problem-rating-graph">
                    <BarChart
                        xAxis={[{
                            scaleType: 'band',
                            data: ['800', '900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200'],
                        }]}
                        series={[{ data: [rank[8], rank[9], rank[10], rank[11], rank[12], rank[13], rank[14], rank[15], rank[16], rank[17], rank[18], rank[19], rank[20], rank[21], rank[22]] }]}
                        width={650}
                        height={330}
                    />
                </div>
            </div>
        </>
    );
}
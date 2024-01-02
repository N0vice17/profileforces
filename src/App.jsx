import { useState, useEffect } from "react"
import Navbar from "./Navbar/Navabr.jsx"

function App() {
  const [data, setdata] = useState(null);

  // useEffect(
  //   () => {
  //     fetch('https://codeforces.com/api/user.info?handles=DP_is_tough')
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((apidata) => {
  //         console.log(apidata);
  //         setdata(apidata.result[0].city);
  //       })
  //   }
  // )

  // const Fetch = () => {
  //   console.log(data);
  // }
  // console.log(data);
  return (
    <>
      <Navbar />
    </>
  )
}

export default App

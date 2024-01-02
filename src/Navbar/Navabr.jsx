import '../Navbar/Navbar.css'
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';

export default function Navbar() {
    async function SearchUser() {
        const username = document.querySelector(".nav-search-name");
        await fetch(`https://codeforces.com/api/user.info?handles=${username.value}`)
            .then((response) => {
                return response.json();
            })
            .then((apidata) => {
                console.log(apidata);
            })
    }
    return (
        <>
            <div className="navbar">
                <div className="nav-title">
                    <div className="nav-title-first">Prof</div>
                    <div className="nav-title-second">ileF</div>
                    <div className="nav-title-third">orces</div>
                </div>
                <div className="nav-search">
                    <input className="nav-search-name" type="text" placeholder="Codeforces ID"></input>
                    <div className="nav-search-icon" onClick={SearchUser}>
                        <PersonSearchSharpIcon />
                    </div>
                </div>
            </div>
        </>
    );
}

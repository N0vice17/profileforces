import '../Navbar/Navbar.css'
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';

export default function Navbar() {
    const SearchUser= () => {
        console.log("Why are you pressing MAOW")
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
                    <input type="text" placeholder="Codeforces ID"></input>
                    <div className="nav-search-icon" onClick={SearchUser}>
                        <PersonSearchSharpIcon />
                    </div>
                </div>
            </div>
        </>
    );
}

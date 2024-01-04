import '../Navbar/Navbar.css'
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';

export default function Navbar() {

    return (
        <>
            <div className="navbar">
                <div className="nav-title">
                    <div className="nav-title-first">Pro</div>
                    <div className="nav-title-second">file</div>
                    <div className="nav-title-third">Forces</div>
                </div>
                <div className="nav-search">
                    <input className="nav-search-name" type="text" placeholder="Codeforces ID"></input>
                    <div className="nav-search-icon">
                        <PersonSearchSharpIcon />
                    </div>
                </div>
            </div>
        </>
    );
}

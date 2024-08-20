import './Header.css';
import LOGO from '/images/logo/Netflix_Logo_RGB.png';
import AVATAR from '/images/logo/Netflix-avatar.png';

interface HeaderProps {
    black: boolean;
}

export default function Header({ black }: HeaderProps) {
    return (
        <header className={ black ? "black": ""}>
            <div className="header--logo">
                <a href="/">
                    <img src={LOGO} alt="Logo" />
                </a>
            </div>
            <div className="header--user">
                <a href="#">
                    <img src={AVATAR} alt="User" />
                </a>
            </div>
        </header>
    );
}
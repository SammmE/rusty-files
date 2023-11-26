import { pallete } from "../Pallete";
import { useState } from "react";

const Navbar = ({ titleComponent, leftComponents, rightComponents }) => {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const handleSvgClick = () => {
        setIsContentVisible(!isContentVisible);
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                {leftComponents.map((component) => (
                    <div className="navbar-component">{component}</div>
                ))}
            </div>
            <div className="navbar-title">{titleComponent}</div>
            <div className="navbar-right">
                {rightComponents.map((component) => (
                    <div className="navbar-component">{component}</div>
                ))}
                <svg
                    width={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleSvgClick}
                >
                    <path
                        d="M7 3.34132C8.47087 2.48824 10.1786 2 12 2C17.5228 2 22 6.48884 22 12.0261C22 20.178 13.8385 14.4192 12.2619 16.9268C11.8674 17.5541 12.2938 18.3364 12.8168 18.8607C13.4703 19.5159 13.4703 20.5781 12.8168 21.2333C12.2938 21.7576 11.5816 22.0709 10.8468 21.9863C5.86713 21.413 2 17.1723 2 12.0261C2 10.1945 2.48985 8.47765 3.34537 7"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <circle
                        cx="17.5"
                        cy="11.5"
                        r="1.5"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                    />
                    <circle
                        cx="6.5"
                        cy="11.5"
                        r="1.5"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M11.085 6.99976C11.085 7.82818 10.4134 8.49976 9.58496 8.49976C8.75653 8.49976 8.08496 7.82818 8.08496 6.99976C8.08496 6.17133 8.75653 5.49976 9.58496 5.49976C10.4134 5.49976 11.085 6.17133 11.085 6.99976Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M16 7C16 7.82843 15.3284 8.5 14.5 8.5C13.6716 8.5 13 7.82843 13 7C13 6.17157 13.6716 5.5 14.5 5.5C15.3284 5.5 16 6.17157 16 7Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                    />
                </svg>
                <div className={`themeSettings ${isContentVisible ? "themeSettingsVisible" : "themeSettingsHidden"}`}>
                    <svg
                        width={24}
                        className="dice"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => pallete.randomize()}
                    >
                        <path
                            d="M8 8H8.01M8 12H8.01M16 12H16.01M16 8H16.01M16 16H16.01M8 16H8.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

const Navbar = ({ titleComponent, leftComponents, rightComponents }) => {
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
            </div>
        </div>
    );
};

export default Navbar;

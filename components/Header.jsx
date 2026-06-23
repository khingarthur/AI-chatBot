export const Header = () => {
    return (
        <header className="bg-primary text-white text-center py-3 rounded-top-4 position-relative"
                style={{
                    zIndex: 10,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                }}>
            <div className="d-flex align-items-center ">
                <img 
                    src="/robot.png" 
                    alt="logo" 
                    className="rounded-circle me-2 align-self-end ms-3" 
                    width="60" height="60" 
                />

                <span 
                    className="ms-3 fs-4" 
                        style={{ 
                            fontFamily: "'Orbitron', sans-serif", 
                            fontWeight: 900, 
                            letterSpacing: '1px'
                    }}>
                    Ask KOBBY
                </span>
            </div>
        </header>
    );
}
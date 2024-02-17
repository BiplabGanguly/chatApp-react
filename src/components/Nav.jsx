import React from 'react'

function Nav({logout}) {

     
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <div className="navbar-brand">ChatWIthAI</div>
                <form className="d-flex">
                    <button className="btn logout-btn" type="button" onClick={logout} >
                        logout
                    </button>
                </form>
            </div>
        </nav>
    )
}

export default Nav
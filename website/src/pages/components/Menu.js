import React from 'react'
import "../../styles/Menu.css"

function Menu(props) {

  return (
    <div className='Menu'>
        <div className='ShowCreate'>
            <button type="button" onClick={() => {props.setMenu("Show")}}>
                Show
            </button>
            <button type="button" onClick={() => {props.setMenu("Create")}}>
                Create
            </button>
        </div>
        <div>
            <button type="button" onClick={() => {props.onLogout()}}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Menu
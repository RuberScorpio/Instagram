import React from 'react'
import "../../styles/Menu.css"
import { useNavigate } from 'react-router-dom';
import HomeInactive from "../../assets/Home-Inactive.svg";
import HomeActive from "../../assets/Home-Active.svg";
import PlusInactive from "../../assets/Plus-Inactive.svg";
import PlusActive from "../../assets/Plus-Active.svg";

function Menu(props) {
    
    const navigate = useNavigate();
    
  return (
    <div className='Menu'>
        <div className='ShowCreate'>
                <button type="button" onClick={() => {props.setMenu("Show")}}>
                <img src= {props.menu === "Show" ? HomeActive : HomeInactive} alt={"Home"} />
                </button>
                <button type="button" onClick={() => {props.setMenu("Create")}}>
                <img src= {props.menu === "Create" ? PlusActive : PlusInactive} alt={"Home"} />
                </button>
                <button type="button" onClick={() => {navigate("/user/" + props.username)}}>
                Profile
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
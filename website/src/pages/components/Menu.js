import React, {useContext} from 'react'
import "../../styles/Menu.css"
import { useNavigate } from 'react-router-dom';
import HomeInactive from "../../assets/Home-Inactive.svg";
import HomeActive from "../../assets/Home-Active.svg";
import PlusInactive from "../../assets/Plus-Inactive.svg";
import PlusActive from "../../assets/Plus-Active.svg";
import { AuthContext } from '../../services/AuthContext'
import { toast } from 'react-toastify';

function Menu(props) {
    
    const navigate = useNavigate();
    const {login, setLogin} = useContext(AuthContext);

    const onLogout = () => {
      localStorage.removeItem("AuthToken")
      navigate("/entry")
      setLogin(false)
      toast.success("You have logged out")
     }
    
  return (
    <div className='Menu'>
        <div className='ShowCreate'>
          <button type="button" onClick={() => {props.setMenu("Show"); navigate("/home", {
            state: {
              menuState: "Show"
            }
          });}}>
            <img src= {props.menu === "Show" ? HomeActive : HomeInactive} alt={"Home"} />
          </button>
          <button type="button" onClick={() => {props.setMenu("Create");  navigate("/home",{
            state: {
              menuState: "Create"
            }
          });}}>
            <img src= {props.menu === "Create" ? PlusActive : PlusInactive} alt={"Home"} />
          </button>
          <button type="button" onClick={() => {navigate("/user/" + login.username)}}>
            Profile
          </button>
        </div>
        <div>
          <button type="button" onClick={() => {onLogout()}}>
            Logout
          </button>
        </div>
    </div>
  )
}

export default Menu
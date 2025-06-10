
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../apiCalls/userCall';
import { HiddenSpinner, ShowSpinner } from '../Redux/spinnerSlice';
import { SetUser } from '../Redux/usersSlice';
import './PR.css';

function ProtectedRoutes({ children }) {
  const { user } = useSelector((state) => state.users);

  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userMenu = [
    {
      title: "Home",
      paths: ["/dashboard","/user/write/exam"],
      icon: <i className="ri-home-line"></i>,
      onclick: () => navigate("/dashboard")
    },
    {
      title: "Results",
      paths: ["/user/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onclick: () => navigate("/user/reports")
    },
    // {
    //   title: "Profile",
    //   paths: ["/profile"],
    //   icon: <i className="ri-file-user-line"></i>,
    //   onclick: () => navigate("/profile")
    // },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-line"></i>,
      onclick: () => {
        localStorage.removeItem("token");
        navigate("/login")
      }
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      paths: ["/dashboard","/user/write/exam"],
      icon: <i className="ri-home-line"></i>,
      onclick: () => navigate("/dashboard")
    },
    {
      title: "Exams",
      paths: ["/admin/exams", "/admin/exams/add"],
      icon: <i class="ri-bar-chart-horizontal-line"></i>,
      onclick: () => navigate("/admin/exams")
    },
    {
      title: "Results",
      paths: ["/admin/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onclick: () => navigate("/admin/reports")
    },
    // {
    //   title: "Profile",
    //   paths: ["/profile"],
    //   icon: <i className="ri-file-user-line"></i>,
    //   onclick: () => navigate("/admin/profile")
    // },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-line"></i>,
      onclick: () => {
        localStorage.removeItem("token");
        navigate("/login")
      }
    }
  ];

  const getUserData = async () => {
    try {
      dispatch(ShowSpinner());
      const response = await getUserInfo();
      dispatch(HiddenSpinner());
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate('/login');
      dispatch(HiddenSpinner());
      message.error(error.message)
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getUserData();
    } else {
      navigate('/login');
    }
    }, []);

  const activeRoute = window.location.pathname;

  const getActiveRoute = (paths) => {
    if(paths.includes(activeRoute)){
      return true;
    } else {
      if(activeRoute.includes('/admin/exams/edit') && paths.includes("/admin/exams")){
        return true;
      }
      if(activeRoute.includes("/user/write/exam") && paths.includes("/user/write/exam")){
        return(true);
      }
    }
    return false;
  }

  return (
    <div className='layout'>
      <div className='separate'>
        <div className='sidebar'>
          <div className='menu'>
            {menu.map((item, index) => {
              return (
                <div
                  className={
                    `menu-item ${
                      // activeRoute === item.paths[0] 
                      getActiveRoute(item.paths)
                      && "active-menu-item"
                    }`
                  }
                  key={index}
                  onClick={item.onclick}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </div>
              )
            })}
          </div>
        </div>
        <div className='both'>
          <div className='header'>
            {!collapsed && <i className="ri-close-line"
              onClick={() => setCollapsed(true)}
            ></i>}
            {collapsed && <i className="ri-menu-line"
              onClick={() => setCollapsed(false)}
            ></i>}
            <h1>Quizzoooo</h1>
            {/* <p className='title1'>Quizzoooo</p> */}
            <div className='user'>
            <i className="ri-user-line"></i>
            <p className='underline'>{user?.name}</p>
            </div>
          </div>
          <div className='body'>
            {children}
          </div>
        </div>
      </div>
      {/* {user?.name}
      {user?.email}
      {children} */}
    </div>
  )
}


export default ProtectedRoutes;
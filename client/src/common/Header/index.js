import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { ROUTE_PATH } from "../../constant/urlConstant";
import { NavLink, useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { LOGO, NAME_LOGO, WINGROW_LOGO } from "../../assets/images/index";
import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import "./index.css";
import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { logout } from "../../redux/Action/Auth/auth";

const Header = (props) => {
  // eslint-disable-next-line
  const { t } = useTranslation();
  // eslint-disable-next-line
  const { isLoggedIn } = props;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  // const dispatch = useDispatch();
  const customHeader = (
    <NavLink
      className="p-ripple no-underline  "
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <img src={LOGO} alt="winagrow_logo.png" /> */}
      {/* <Avatar
        image="https://media.licdn.com/dms/image/D4D0BAQESbH4BRPcZDg/company-logo_200_200/0/1703788496436/multigenesys_logo?e=1723680000&v=beta&t=DPJfsOYIpxBWcVHkj5srgqfe0hLq9UtSZtXG6jhEVAg"
        shape="circle"
        style={{ marginRight: "0.5rem" }}
      /> */}
      {/* <span className="font-bold">KRD Taxation</span> */}
    </NavLink>
  );

  const handleNavigation = (route) => {
    navigate(route);
    setVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
  };
  const sidebarItems = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      route: ROUTE_PATH.BASE.HOME,
    },
    {
      label: "About",
      icon: "pi pi-fw pi-info-circle",
      route: ROUTE_PATH.BASE.HOME,
    },
    {
      label: "Login",
      icon: "pi pi-fw pi-user",
      route: ROUTE_PATH.BASE.LOGIN,
    },
    {
      label: "Register",
      icon: "pi pi-fw pi-user-plus",
      route: ROUTE_PATH.BASE.REGISTER,
    },
    {
      label: "Customer",
      icon: "pi pi-fw pi-user-plus",
      route: ROUTE_PATH.CUSTOMER.HOME,
    },
    { separator: true },

    { label: "Settings", icon: "pi pi-fw pi-cog", route: ROUTE_PATH.BASE.HOME },
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off p-error ",
      command: handleLogout,
    },
  ];

  const start = (
    <div>
      <img src={WINGROW_LOGO} alt="winagrow_agritech_logo.png" className="w-5rem" />
      {/* <img src={WINGROW_LOGO} alt="winagrow_agritech_logo.png" className="h-3rem" /> */}
    </div>
  );
  const end = (
    <>
      <Button
        label="Home"
        icon="pi pi-home"
        severity="danger"
        className=" button-font rounded"
        onClick={() => navigate(ROUTE_PATH.BASE.HOME)}
      />
      <Button
        label="About"
        icon="pi pi-info-circle"
        severity="danger"
        className=" button-font rounded ml-2"
        onClick={() => navigate(ROUTE_PATH.BASE.HOME)}
      />
      <Button
        label="Login"
        icon="pi pi-user"
        severity="danger"
        className=" button-font rounded ml-2"
        onClick={() => navigate(ROUTE_PATH.BASE.LOGIN)}
      />
      <Button
        label="Register"
        icon="pi pi-user-plus"
        severity="danger"
        className=" button-font rounded ml-2"
        
        onClick={() => navigate(ROUTE_PATH.BASE.REGISTER)}
      />
         <Button
        label="Customer"
        icon="pi pi-user-plus"
        severity="danger"
        className=" button-font rounded ml-2"
        onClick={() => navigate(ROUTE_PATH.CUSTOMER.HOME)}
      />
    </>
    //     <>
    //     <Button label="Primary" rounded />
    // <Button label="Secondary" severity="secondary " rounded  className="rounded"/>
    // <Button label="Success" severity="success" rounded />
    // <Button label="Info" severity="info" rounded />
    // <Button label="Warning" severity="warning" rounded />
    // <Button label="Help" severity="help" rounded />
    // <Button label="Danger" severity="danger" rounded /></>
  );

  return (
    <div>
      <div className="flex align-items-center justify-content-between p-1 block md:hidden ">
        <img src={LOGO} alt="winagrow_logo.png " />
        <Button
          icon="pi pi-bars"
          className="p-button-text p-button-white "
          onClick={() => setVisible(true)}
        />
      </div>

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="p-sidebar p-sidebar-right p-sidebar-active"
        position="right"
        baseZIndex={1000}
        header={customHeader}
        modal
      >
        <div className="p-sidebar-content">
          <div className="sidebar-menu">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="sidebar-item p-3 cursor-pointer flex align-items-center"
                onClick={
                  item.command
                    ? item.command
                    : () => handleNavigation(item.route)
                }
              >
                <i
                  className={item.icon}
                  style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                ></i>
                <span className="ml-1 button-font ">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="p-sidebar-footer  ">
            <hr className="mb-3 " />
            <div className="sidebar-item">
              <NavLink className="flex align-items-center no-underline">
                {/* <Avatar
                    image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                    shape="circle"
                  /> */}
                <Avatar
                  icon="pi pi-user"
                  style={{ backgroundColor: "#28a745", color: "#ffffff" }}
                  shape="circle"
                />
                <span className="font-bold ml-2">Amy Elsner</span>
              </NavLink>
            </div>
          </div>
        </div>
      </Sidebar>

      <div className="hidden md:block">
        <Menubar start={start} end={end} className="bg-green-400" />
      </div>
    </div>
  );
};

export default Header;

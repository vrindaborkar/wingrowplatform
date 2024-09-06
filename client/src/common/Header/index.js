import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/urlConstant";
import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { LOGO, WINGROW_LOGO } from "../../assets/images/index";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../redux/action/translator";
import { Dropdown } from "primereact/dropdown";

const Header = ({ isLoggedIn, userRole, isVerify }) => {
  const VerifyLogin = sessionStorage.getItem("isVerifyLogin");
  const VerifyRole = sessionStorage.getItem("role");
  const isLoggedInCheck = sessionStorage.getItem("isLoggedIn");

  console.log("isLoggedInCheck", isLoggedInCheck);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleNavigation = (route) => {
    navigate(route);
    setVisible(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(ROUTE_PATH.BASE.HOME);
  };

  const currentLanguage = useSelector(
    (state) => state.translatorReducer.language
  );

  const handleChangeLanguage = (e) => {
    const newLanguage = e.value;
    dispatch(changeLanguage(newLanguage));
  };
  const languageOptions = [
    { label: t("en"), value: "en" },
    { label: t("hi"), value: "hi" },
    { label: t("mr"), value: "mr" },
  ];

  const sidebarItems = [
    { label: t("home"), icon: "pi pi-fw pi-home", route: ROUTE_PATH.BASE.HOME },
    {
      label: t("about_heading"),
      icon: "pi pi-fw pi-info-circle",
      route: ROUTE_PATH.BASE.HOME,
    },
    !VerifyLogin && {
      label: t("login"),
      icon: "pi pi-fw pi-user",
      route: ROUTE_PATH.BASE.LOGIN,
      visible: !isVerify,
    },
    !VerifyLogin && {
      label: t("register"),
      icon: "pi pi-fw pi-user-plus",
      route: ROUTE_PATH.BASE.REGISTER,
      visible: !isVerify,
    },
    {
      label: t("customers"),
      icon: "pi pi-fw pi-users",
      route: ROUTE_PATH.CUSTOMER.HOME,
      visible: !isVerify,
    },
    VerifyLogin &&
      VerifyRole === "farmer" && {
        label: t("farmer"),
        icon: "pi pi-fw pi-users",
        route: ROUTE_PATH.FARMER.HOME,
      },
    VerifyLogin &&
      VerifyRole === "admin" && {
        label: t("admin"),
        icon: "pi pi-user-plus",
        route: ROUTE_PATH.ADMIN.HOME,
      },
    // { separator: true },
    {
      label: t("Settings"),
      icon: "pi pi-fw pi-cog",
      route: ROUTE_PATH.BASE.HOME,
    },
    VerifyLogin && {
      label: t("logout"),
      icon: "pi pi-fw pi-power-off p-error",
      command: handleLogout,
      visible: !isLoggedIn,
    },
  ].filter(Boolean);

  const start = (
    <div>
      <img
        src={WINGROW_LOGO}
        alt="winagrow_agritech_logo.png"
        className="w-5rem"
      />
    </div>
  );

  const end = (
    <div className="flex gap-2">
      <Button
        label={t("home")}
        icon="pi pi-home"
        text
        className="text-white no-outline font-bold  rounded"
        onClick={() => navigate(ROUTE_PATH.BASE.HOME)}
      />
      <Button
        label={t("about_heading")}
        icon="pi pi-info-circle"
        text
        className="text-white no-outline font-bold rounded"
        onClick={() => navigate(ROUTE_PATH.BASE.HOME)}
      />
      {!VerifyLogin && (
        <Button
          label={t("login")}
          icon="pi pi-user"
          text
          className="text-white no-outline font-bold rounded"
          onClick={() => navigate(ROUTE_PATH.BASE.LOGIN)}
        />
      )}
      {!VerifyLogin && (
        <Button
          label={t("register")}
          icon="pi pi-user-plus"
          text
          className="text-white no-outline font-bold  rounded"
          onClick={() => navigate(ROUTE_PATH.BASE.REGISTER)}
        />
      )}
      <Button
        label={t("customers")}
        icon="pi pi-users"
        text
        className="text-white no-outline font-bold  rounded"
        onClick={() => navigate(ROUTE_PATH.CUSTOMER.HOME)}
      />

      {VerifyLogin && VerifyRole === "farmer" && (
        <>
          <Button
            label={t("farmer")}
            icon="pi pi-users"
            text
            className="text-white no-outline font-bold rounded"
            onClick={() => navigate(ROUTE_PATH.FARMER.HOME)}
          />
        </>
      )}
      {VerifyLogin && VerifyRole === "admin" && (
        <>
          <Button
            label={t("admin")}
            icon="pi pi-user-plus"
            text
            className="text-white no-outline font-bold  rounded"
            onClick={() => navigate(ROUTE_PATH.ADMIN.HOME)}
          />
        </>
      )}
      {VerifyLogin && (
        <>
          <Button
            label={t("logout")}
            icon="pi pi-power-off"
            text
            className="text-white no-outline font-bold  rounded"
            onClick={handleLogout}
          />
        </>
      )}
      <Dropdown
        value={currentLanguage}
        options={languageOptions}
        onChange={handleChangeLanguage}
        placeholder={t("language")}
        autoFocus={false}
        className="rounded  bg-transparent "
      />
    </div>
  );

  return (
    <div className="border-bottom-1 border-400">
      <div className="flex bg-green-400 align-items-center justify-content-between p-1 block md:hidden">
        <img src={WINGROW_LOGO} alt="winagrow_logo.png" className="w-5rem" />
        <Button
          icon="pi pi-bars"
          className="p-button-text text-white"
          onClick={() => setVisible(true)}
        />
      </div>

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="p-sidebar p-sidebar-right p-sidebar-active"
        position="right"
        baseZIndex={1000}
        header={
          <div className="flex align-items-center justify-content-between p-1 block md:hidden">
            <img src={LOGO} alt="winagrow_logo.png" />
            <NavLink className="p-ripple no-underline">
              <span className="font-bold">Wingrow Market</span>
            </NavLink>
          </div>
        }
        modal
      >
        <div className="p-sidebar-content flex flex-column justify-content-between">
          <div className="sidebar-menu">
            {sidebarItems.map(
              (item, index) =>
                item.visible !== false && (
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
                    <span className="ml-1">{item.label}</span>
                  </div>
                )
            )}
          </div>

          <div className="p-sidebar-footer ">
            <div className="sidebar-item">
              <Dropdown
                value={currentLanguage}
                options={languageOptions}
                onChange={handleChangeLanguage}
                placeholder={t("language")}
                autoFocus={false}
                className="rounded bg-transparent w-full"
              />
            </div>
            <hr className="mb-3" />
            <div className="sidebar-item mt-3">
              <NavLink className="flex align-items-center no-underline">
                <Avatar
                  icon="pi pi-user"
                  style={{ backgroundColor: "#28a745", color: "#ffffff" }}
                  shape="circle"
                />
                <span className="font-bold">Jon</span>
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

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../api/auth";
import { selectCartCount } from "../redux/shoppingReducer";
import { useMenu } from "../context/MenuContext";
import '../styles/NavBar.css'

// ... importaciones y código anterior ...

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = useSelector(selectCartCount);

  const { toggleNav, isNavOpen } = useMenu();

  const handleLogout = async () => {
    dispatch(logoutRequest());
    navigate("/");
    toggleNav(); // Cerrar el menú desplegable al hacer clic en Logout
  };

  const handleHome = async () => {
    navigate("/homepage");
    // Solo cerrar el menú desplegable al hacer clic en Home
    if (isNavOpen) {
      toggleNav();
    }
  };

  const handleDrawerLinkClick = () => {
    toggleNav(); // Cerrar el menú desplegable al hacer clic en cualquier enlace del Drawer
  };

  return (
    <AppBar position="static" id="MuiAppBar-root">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleNav}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleHome}
        >
          Your Brand
        </Typography>

        <div className="navbar-div-right">
          <Link to="/cart" className="cart-link">
            <i className="fa-solid fa-cart-shopping cart-icon"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
     
          <i
            className="fa-solid fa-arrow-right-from-bracket"
            onClick={handleLogout}
          ></i>
        </div>
      </Toolbar>
      <Drawer
        anchor="left"
        open={isNavOpen}
        onClose={toggleNav}
        className="drawer"
      >
        <List>
          <ListItem button>
            <ListItemText>
              <Link to="/homepage" className="drawer-link" onClick={handleDrawerLinkClick}>
                Home
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/profile" className="drawer-link" onClick={handleDrawerLinkClick}>
                Profile
              </Link>
            </ListItemText>
          </ListItem>
          {/* Agrega otros elementos de navegación según sea necesario */}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;


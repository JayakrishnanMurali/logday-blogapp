import { Bookmark, Logout, Person, Settings } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { stringAvatar } from "../utils/stringAvatar";
import BasicButton from "./common/Button";
import Typo from "./common/Title";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenProfileMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  let left = (
    <div>
      <Link href="/">
        <Typo text="LogDay" bold type="LINK" />
      </Link>
    </div>
  );

  let right = null,
    mid = null;

  if (status === "loading") {
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = <BasicButton text="Log In" link="/api/auth/signin" />;
  }

  const profileMenu = (
    <Menu
      open={open}
      onClose={handleCloseProfileMenu}
      anchorEl={anchorEl}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <Avatar /> Profile
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={() => signOut()}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  if (session) {
    right = (
      <div className="flex items-center">
        <Link href="/">
          <Bookmark className="!text-4xl mr-4 !cursor-pointer" />
        </Link>

        <IconButton
          onClick={handleOpenProfileMenu}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {session.user.image ? (
            <Avatar alt="Remy Sharp" src={session.user.image} />
          ) : (
            <Avatar {...stringAvatar(session.user.name)} />
          )}
        </IconButton>
        {profileMenu}
      </div>
    );

    mid = (
      <div className="flex gap-16">
        <Link href="/">
          <Typo text="Home" type="MENU" />
        </Link>
        <Link href="/">
          <Typo text="Blog" type="MENU" />
        </Link>
        <Link href="/">
          <Typo text="Podcast" type="MENU" />
        </Link>
        <Link href="/">
          <Typo text="Book" type="MENU" />
        </Link>
        <Link href="/">
          <Typo text="About" type="MENU" />
        </Link>
      </div>
    );
  }

  return (
    <nav className="flex justify-between items-center">
      {left}
      {mid}
      {right}
    </nav>
  );
};

export default Header;

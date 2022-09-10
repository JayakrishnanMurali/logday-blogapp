import { Bookmark, Person } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Typo from "./common/Title";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

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
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    right = (
      <div>
        <Link href="/">
          <Bookmark className="!text-4xl mr-4 !cursor-pointer" />
        </Link>
        <Link href="/">
          <Person className="!text-4xl !cursor-pointer" />
        </Link>
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

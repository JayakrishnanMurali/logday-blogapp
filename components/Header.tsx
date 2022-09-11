import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsBookmark } from "react-icons/bs";
import AvatarDropDown from "./AvatarDropDown";
import BasicButton from "./common/Button";
import Typo from "./common/Title";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  let left = (
    <div>
      <Link href="/">
        <Typo text="LogDay" logo bold type="LINK" />
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

  if (session) {
    right = (
      <div className="flex items-center">
        <Link href="/">
          <BsBookmark size={25} cursor="pointer" />
        </Link>
        <AvatarDropDown img={session.user.image} logout={() => signOut()} />
      </div>
    );

    mid = (
      <nav className="flex gap-16">
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
      </nav>
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

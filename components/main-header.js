import React from "react";
import Link from "next/link";
const MainHeader = () => {
  return (
    <header id="main-header">
      <div id="logo"> 
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul className="news-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/news ">News</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

"use client"

import React ,{ useState, useEffect} from "react";
import HomePage from "./component/HomePage/page";
import { useRouter } from "next/navigation";
import EventPage from "./component/EventPage/page";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("1");
    return (
        <>
          <HomePage />
          {/* <EventPage /> */}
        </>
    );
};

export default App;
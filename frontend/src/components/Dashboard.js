import React from "react";
import "./Dashboard.css";
import SideBar from "./SideBar";
import Chat from "./Chat";

function Dashboard() {
  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
}

export default Dashboard;

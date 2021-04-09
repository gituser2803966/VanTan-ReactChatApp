import React, { useEffect } from "react";
import { useConversation } from "../contexts/ConversationContext";
import "./Dashboard.css";
import SideBar from "./SideBar";
import OpenChat from "./OpenChat";

function Dashboard() {
  const { selectedConversation } = useConversation();
  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        {selectedConversation && <OpenChat />}
      </div>
    </div>
  );
}

export default Dashboard;

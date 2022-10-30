import React from "react";
import Header from "../components/Header";

interface Props {}

function Profile(props: Props) {
  const {} = props;

  return (
    <div className="h-screen bg-gray-800 overflow-y-auto">
      <Header />
    </div>
  );
}

export default Profile;

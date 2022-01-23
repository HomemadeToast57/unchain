import React, { useEffect, useState } from "react";
import "../css/Ranks.css";
import { useTime } from "../../contexts/TimeContext";
import { useAuth } from "../../contexts/AuthContext";

const Ranks = () => {
  const [currentRank, setCurrentRank] = useState();
  const { timeObj } = useTime();
  const { setCurrentPage } = useAuth();

  useEffect(() => {
    setCurrentPage({
      page: "rank",
      title: "My Rank",
    });
  }, [setCurrentPage]);

  const ranks = [
    {
      id: 0,
      name: "Scout",
      days: 1,
    },
    {
      id: 1,
      name: "Private",
      days: 3,
    },
    {
      id: 2,
      name: "Corporal",
      days: 5,
    },
    {
      id: 3,
      name: "Sergeant",
      days: 7,
    },
    {
      id: 4,
      name: "Lieutenant",
      days: 10,
    },
    {
      id: 5,
      name: "Captain",
      days: 14,
    },
    {
      id: 6,
      name: "Major",
      days: 20,
    },
    {
      id: 7,
      name: "Colonel",
      days: 30,
    },
    {
      id: 8,
      name: "General",
      days: 60,
    },
    {
      id: 9,
      name: "Marshal",
      days: 90,
    },
    {
      id: 10,
      name: "Field Marshal",
      days: 120,
    },
    {
      id: 11,
      name: "Grand Marshal",
      days: 150,
    },
    {
      id: 12,
      name: "King",
      days: 180,
    },
    {
      id: 13,
      name: "Emperor",
      days: 240,
    },
    {
      id: 14,
      name: "The Immortal",
      days: 300,
    },
    {
      id: 15,
      name: "A God",
      days: 365,
    },
    {
      id: 16,
      name: "A Free Person",
      days: 366,
    },
    {
      id: 17,
      name: "What are you still doing here?",
      days: 367,
    },
  ];

  //eslint-disable-next-line
  useEffect(() => {
    let days = timeObj.d;
    for (let i = 0; i < ranks.length; i++) {
      //find current rank
      if (days >= ranks[i].days) {
        setCurrentRank(i);
      }
    }
  });

  return (
    <div className="ranksDiv">
      <div className="ranksContainer">
        {ranks.map((rank) => (
          <div
            className={
              "rank " +
              (currentRank === rank.id ? "currentRank " : " ") +
              (rank.id === 17 ? "lastRank" : "")
            }
            id={currentRank === rank.id ? "currentRank" : " "}
            key={rank.id}
          >
            <h1 className="rankName">{rank.name}</h1>
            <div className="horizontalLine"></div>
            <h2 className="rankDays">
              Reach {rank.days} {rank.days !== 1 ? "days" : "day"}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranks;

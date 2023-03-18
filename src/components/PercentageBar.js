import React from "react";
import "../App.css";

export default function PercentageBar(props) {
  const { name, percentage } = props;

  return (
    <div className="percentage-bar-container">
      <span className="percentage-bar-name">{name}</span>
      <div className="percentage-bar">
        <div
          className="percentage-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="percentage-bar-percentage">{percentage}</span>
    </div>
  );
}

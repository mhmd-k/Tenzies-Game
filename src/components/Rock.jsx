import React from "react";

function Rock(props) {
  const s = {
    backgroundColor: props.isHeld ? "#009688" : "white",
    color: props.isHeld ? "white" : "#343c40",
  };
  return (
    <div className="rock" style={s} onClick={props.handleToggle}>
      {props.value}
    </div>
  );
}

export default Rock;

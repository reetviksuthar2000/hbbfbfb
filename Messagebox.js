import React from "react";
import homestyle from "../pages/HomePage/Homepage.module.css";
import arrow from "../assets/arrow.png";

function Messagebox({
  data,
  text,
  setText,
  submit,
  selectedGroup,
  setSelectedGroup,
}) {

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      {selectedGroup ? (
        <>
          <div className={homestyle.aboutsection}>
            <button>←</button>
            <p
              className={homestyle.toplogo}
              style={{ backgroundColor: selectedGroup.color }}
            >{selectedGroup.name.substr(0, 2).toUpperCase()}</p>
            <p className={homestyle.toptext}>{selectedGroup.name}</p>
          </div>

          <div className={homestyle.meassagesection}>
          {selectedGroup.messages.map((message) => (
            <div className={homestyle.messagearea} key={message.id}>
              <p>
              
                <span>{message.time}</span>
                <span>{message.date}</span>
              </p>
              <p className={homestyle.typetext}>{message.content}</p>
            </div>
            ))}
          </div>
          <div className={homestyle.textsection}>
            <textarea
              placeholder="Enter your text here..........."
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            ></textarea>
            <img src={arrow} onClick={submit} alt="" />
          </div>
        </>
      ) : (
        <p>Select a group to start conversation</p>
      )}
      
    </>
  );
}

export default Messagebox;

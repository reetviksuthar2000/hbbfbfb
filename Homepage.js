import React, { useState, useEffect } from "react";
import Messagebox from "../../component/Messagebox";
import homestyle from "../HomePage/Homepage.module.css";
import image from "../../assets/backround img.png";
import vector from "../../assets/Vector.png";

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const [massagebox, setMassagebox] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [text, setText] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const storedGroups = localStorage.getItem("Groups");
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Groups", JSON.stringify(groups));
  }, [groups]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const openMassagebox = (group) => {
    setMassagebox(true);
    
    setSelectedGroup(group);
    
  };

  const handleNameChange = (e) => {
    setGroupName(e.target.value);
  };


  const handleCreateGroup = () => {
    const newGroup = {
      name: groupName,
      color: groupColor,
      messages: [],
    };
    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
    // Clear input fields
    setGroupName("");
    setGroupColor("");
    // Close the popup
    togglePopup();
  };

  const sendMessage = () => {
    if (selectedGroup && text.trim() !== '') {
      const newMessage = {
        id: Date.now().toString(),
        content: text,
        
        time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date:new Date().toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' }),
      };
        
      const updatedGroups = groups.map((group) => {
        if (group.id === selectedGroup.id) {
          const updatedGroup = {
            ...group,
            messages: [...group.messages, newMessage],
          };
          setSelectedGroup(updatedGroup);
          return updatedGroup;
        }
        return group;
      });

      setGroups(updatedGroups);
      setText('')
    }
  };
      

  return (
    <>
      <div className={homestyle.Homepage}>
        <div className={homestyle.leftsection}>
          <h2>Pocket Notes</h2>
          <button onClick={togglePopup}>+ Create Notes Group</button>
          <div className={homestyle.innercontent}>
            {groups.map((group) => (
              <div
                className={homestyle.card}
                // className={`${homestyle.card} ${selectedGroup && selectedGroup.id === group.id ? homestyle.selected : ''}`}
                key={group.id}
                onClick={() => openMassagebox(group)}
              >
                <p
                  className={homestyle.logo}
                  style={{ backgroundColor: group.color }}
                > {group.name.substr(0, 2).toUpperCase()}</p>
                <p className={homestyle.name}>{group.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={homestyle.rightsection}>
          <div className={homestyle.middle}>
            <img src={image} alt="" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          <div className={homestyle.bottom}>
            <img src={vector} alt="" />
            <p>end-to-end encrypted</p>
          </div>
        </div>
      </div>

      {massagebox && (
        <div className={homestyle.massagebox}>
          
          <Messagebox data={groups} text={text} setText={setText} submit={sendMessage} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
        </div>
      )}

      {isOpen && (
        <div className={homestyle.popup}>
          <div className={homestyle.popupcontent}>
            <h2>Create New Notes group</h2>
            <div className={homestyle.gname}>
              <p>Group Name</p>
              <input
                type="text"
                placeholder="Enter your group name...."
                value={groupName}
                onChange={handleNameChange}
              />
            </div>
            <div className={homestyle.color}>
              <p>Choose colour</p>
              <button
                style={{ backgroundColor: "#B38BFA" }}
                onClick={() => {
                  setGroupColor("#B38BFA");
                }}
              ></button>
              <button
                style={{ backgroundColor: "#FF79F2" }}
                onClick={() => {
                  setGroupColor("#FF79F2");
                }}
              ></button>
              <button
                style={{ backgroundColor: "#43E6FC" }}
                onClick={() => {
                  setGroupColor("#43E6FC");
                }}
              ></button>
              <button
                style={{ backgroundColor: "#F19576" }}
                onClick={() => {
                  setGroupColor("#F19576");
                }}
              ></button>
              <button
                style={{ backgroundColor: "#0047FF" }}
                onClick={() => {
                  setGroupColor("#0047FF");
                }}
              ></button>
              <button
                style={{ backgroundColor: "#6691FF" }}
                onClick={() => {
                  setGroupColor("#6691FF");
                }}
              ></button>
            </div>
            <button className={homestyle.createbtn} onClick={handleCreateGroup}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;

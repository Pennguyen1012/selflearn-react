import MenuList from "./menu-list";
import "./styles.css";
import { useEffect, useState } from "react";

export default function Menu({ menus = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {}, []);
  return (
    <div className={`menu ${isOpen ? "" : "closed"}`}>
      {isOpen && (
        <div className="tree-view-container">
          {<MenuList list={menus}></MenuList>}
        </div>
      )}
      <button onClick={handleToggleMenu} className="menu-btn">
        {isOpen ? "<" : ">"}
      </button>
    </div>
  );
}

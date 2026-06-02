import React, { useState } from "react";
import "./App.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="logo" onClick={"#"}>SAHILDEV</div>
      <ul className={open ? "active" : ""}>
        {["Home", "About", "Skills", "Projects", "Services", "Experience", "Hire Me", "Contact"].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-toggle" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </div>
    </nav>
  )
}

export default Navbar;

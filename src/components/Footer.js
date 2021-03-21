import React from "react";
import styles from "./Footer.css";

const Footer = () => {
  const onMouseOut = (e) => {
    e.target.style.color = "#cccccc";
  };

  const SocialWidget = [
    {
      SocialMediaName: "LinkedIn",
      ProfileLink: "https://www.linkedin.com/in/mahamat-nour-mahamat-abdraman-b44385175",
      fontAwesomeIconName: "fab fa-linkedin",
      OnMouseOverColor: "#4875B4",
    },
    {
      SocialMediaName: "GitHub",
      ProfileLink: "https://github.com/manirDev",
      fontAwesomeIconName: "fab fa-github",
      OnMouseOverColor: "#211F1F",
    },
    
    
    {
      SocialMediaName: "Gmail",
      ProfileLink: "mailto:mhtnourmhtmjr@gmail.com",
      fontAwesomeIconName: "far fa-envelope",
      OnMouseOverColor: "#D44638",
      _comment: "OnMouseOverColor for yahoo mail: #720e9e",
    },
    
   
   
  ];

  return (
    <React.Fragment>
      
      <div className="container">
       
        <ul className="list" style={{ listStyleType: "none" }}>
          {SocialWidget.map((data, key) => {
            return (
              <li
                key={key}
                style={{ display: "inline-block", marginRight: "17px" }}
              >
                <a
                  onMouseOver={(e) => {
                    e.target.style.color = `${data.OnMouseOverColor}`;
                  }}
                  onMouseOut={onMouseOut}
                  href={data.ProfileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#cccccc", fontSize: "40px" }}
                >
                  <i className={`${data.fontAwesomeIconName}`}></i>
                </a>
              </li>
            );
          })}
        </ul>
        
        </div>
       <div className="container">
       <h6
          style={{
            display: "block",
            marginBottom: "0px",
            fontSize: 16,
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Made by 🚀 
          <a
            href="https://github.com/mahamatnou/coivd-19-tracke-reactjs.git"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(0,0,255,0.6)", textDecoration: "none" }}
          >
            ManirDev(Mahamat Nour Mahamat)
          </a>
        </h6>
       </div>
      
     
    </React.Fragment>
  );
};

export default Footer;
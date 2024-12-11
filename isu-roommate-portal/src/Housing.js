import Navbar from "./Navbar";
import "./styles/housing.css";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";

export default function Housing({ userData, setUserData, viewer, setViewer }) {
  const [housingData, setHousingData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selectedHouses, setSelectedHouses] = useState([]);  // State for selected houses

  const toggleDescription = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleAddToSelection = (housing) => {
    setSelectedHouses((prevSelected) => [...prevSelected, housing]);
    console.log("House added to selection:", housing);
  };

  useEffect(() => {
    fetch("http://localhost:8081/housing")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHousingData(data);
      })
      .catch((error) => {
        console.error("Error fetching housing data: ", error);
      });
  }, []);

  return (
    <div>
      <body className="housing prevent-select" style={{ backgroundColor: "#F5F5F5" }}>

        <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} />

        <header>
          <div className="mx-auto" style={{ padding: "20px", margin: "auto", backgroundColor: "#C8102E", color: "#F5F5F5", overflow: "hidden", textAlign: "center", marginBottom: "20px" }}>
            <h1 className="mx-auto" style={{ fontSize: "50px", fontFamily: "Merriweather, serif" }}>University Housing</h1>
          </div>
        </header>

        <div className="card-columns">
          <div className="container">
            <div id="col" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {housingData.map((housing) => {
                const isExpanded = expanded[housing.id] || false;

                return (
                  <div key={housing.id} className="col">
                    <div className="card shadow-sm" style={{ position: "relative" }}>
                      <img src={housing.URL} className="card-img-top" alt={housing.name} />
                      <div className="card-body">
                        <p className="card-text">
                          <strong>{housing.name}</strong>, ${housing.price} <br />
                          Air Conditioned: {housing.airConditioned} <br />
                          Open for Winter Break: {housing.OpenDuringWinterBreak} <br />

                          {/* Button to toggle description */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <button onClick={() => toggleDescription(housing.id)} className="btn btn-link">
                              {isExpanded ? "Show Less" : "Show More"}
                            </button>

                            {/* Button to add housing to selections */}
                            <button
                              className="btn btn-primary select-btn"
                              onClick={() => handleAddToSelection(housing)}
                              style={{
                                borderRadius: "5px",  
                                padding: "6px 14px",  
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                fontSize: "12px", 
                                cursor: "pointer",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              Add to Selection
                            </button>
                          </div>
                          {/* Expandable Description */}
                          <div
                            className="expanded-description"
                            style={{
                              padding: isExpanded ? "10px" : "0",
                              height: isExpanded ? "auto" : "0",
                              overflow: "hidden",
                              transition: "height 0.3s ease-out",
                            }}
                          >
                            {housing.Description}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </body>
      <style>
        {`
          .expanded-description {
            background-color: #f1f1f1;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .btn-link {
            padding: 0;
            border: none;
            background: none;
            color: #007bff;
            text-decoration: underline;
            cursor: pointer;
          }

          .select-btn {
            border-radius: 5px;
            padding: 6px 14px;
            background-color: #007bff;
            color: #fff;
            border: none;
            font-size: 12px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .select-btn:hover {
            background-color: #0056b3;  // Darker blue when hovered
          }
        `}
      </style>
    </div>
  );
}
import Navbar from "./Navbar";
import "./styles/housing.css";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";

export default function Housing({ userData, setUserData, viewer, setViewer }) {

  const [housingData, setHousingData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [houseQuery, setHouseQuery] = useState("");
  const [begunSearch, setBegunSearch] = useState(0);
  const[searchedHouses, setSearchedHouses] = useState([]);

  if (houseQuery==="" && begunSearch===1){
    setBegunSearch(0);
  }

  const toggleDescription = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleAddToSelection = (housing) => {
    addPreference(housing);
  };

  
const addPreference = async (housing) => {
  try {
    // Create a FormData object to hold the fields and the file
    const formData = new FormData();
    formData.append("userId", userData[0].id);
    formData.append("housingId", housing.id);

    // Send the FormData object to the backend
    const response = await fetch("http://localhost:8081/user/housing_preference", {
      method: "POST",
      body: formData, 
    });
    if (!response.ok) {
        const errorData = await response.json(); 
        alert("Error: " + errorData.error);
    } else {
        const successMessage = await response.text(); 
        alert(successMessage);
    }
  } catch (err) {
    alert("An error occurred :"+err)
  }
};


  useEffect(() => {
    fetch("http://localhost:8081/housing")
      .then((response) => response.json())
      .then((data) => {
        setHousingData(data);
      })
      .catch((error) => {
        console.error("Error fetching housing data: ", error);
      });
  }, []);


  // get houses for the search bar
  const fetchHouses = async () => {
    setBegunSearch(1);
    if (!houseQuery.trim()) {
        alert("Please enter a house name");
        return;
    }
    try {
        const response = await fetch(`http://localhost:8081/house/${encodeURIComponent(houseQuery)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", }
        });
        if (!response.ok) { 
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setSearchedHouses(data);
    } catch (err) {
        alert("There was an Error loading one user "+err);
    }
};


  

  return (
    <div>
      <body className="housing prevent-select" style={{ backgroundColor: "#F5F5F5" }}>

        <Navbar userData={userData} setUserData={setUserData} viewer={viewer} setViewer={setViewer} />

        <header>
          <div className="mx-auto" style={{ padding: "20px", margin: "auto", backgroundColor: "#C8102E", color: "#F5F5F5", overflow: "hidden", textAlign: "center", marginBottom: "20px" }}>
            <h1 className="mx-auto" style={{ fontSize: "50px", fontFamily: "Merriweather, serif" }}>University Housing</h1>
            <div className="input-group mb-3 justify-content-center my-5">
                <input type="text" className="form-control" placeholder="Search for housing" value={houseQuery} style={{maxWidth:500+'px'}}
                onChange={(e) => setHouseQuery(e.target.value.toLowerCase())}
                />
                <button className="btn btn-primary btn-warning" onClick={fetchHouses}>
                Search
                </button>
            </div>
          </div>
        </header>

        <div className="card-columns">
          <div className="container">
            <div id="col" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {begunSearch===0 && housingData.map((housing) => {
                const isExpanded = expanded[housing.id] || false;
                return (
                  <div key={housing.id} className="col">
                    <div className="card shadow-sm" style={{ position: "relative" }}>
                      <img src={`http://localhost:8081${housing.URL}`} className="card-img-top" alt={housing.name} />
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
                            {/* only display if signed in */}
                            {userData[0]?.id &&
                            <button
                              className="btn btn-danger select-btn my-3"
                              onClick={() => handleAddToSelection(housing)}
                              style={{
                                borderRadius: "5px",  
                                padding: "6px 14px",  
                                border: "none",
                                fontSize: "12px", 
                                cursor: "pointer",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              Add to Selection
                            </button>
                            }
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
              {/* if searched */}
              {begunSearch===1 && searchedHouses.map((housing) => {
                const isExpanded = expanded[housing.id] || false;

                return (
                  <div key={housing.id} className="col">
                    <div className="card shadow-sm" style={{ position: "relative" }}>
                      <img src={`http://localhost:8081${housing.URL}`} className="card-img-top" alt={housing.name} />
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
                            {userData[0]?.id &&
                            <button
                              className="btn btn-danger select-btn my-3"
                              onClick={() => handleAddToSelection(housing)}
                              style={{
                                borderRadius: "5px",  
                                padding: "6px 14px",  
                                border: "none",
                                fontSize: "12px", 
                                cursor: "pointer",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              Add to Selection
                            </button>
              }
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

          .select-btn:hover {
            background-color: #0056b3;  // Darker blue when hovered
          }
        `}
      </style>
    </div>
  );
}
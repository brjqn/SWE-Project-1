import { Link } from "react-router-dom";
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './General.css';


//This file is to update the /exercise-list page and populate with a searching function and drop down exercise list
//also has buttons to add exercise
    

const DropDownComponent = () => {
    const [allData, setAllData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [suggestion, setSuggestion] = useState("");
    
    useEffect(() => {
        const fetchData = async() =>{
            try{
                const response = await axios.get('http://localhost:5001/exercise-list/');
                setAllData(response.data);
                setFilteredData(response.data);
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //to filter data for the drop down selection
    useEffect(() => {
        const filtered = allData.filter((item) =>
        (item.name || item.Exercise).toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
    }, [searchText, allData]);

    //for the searching of data
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchText(event.target.value); // Update the search query
        const match = allData.find((item) =>
            item.Exercise?.toLowerCase().startsWith(value.toLowerCase())
        );

        // Set the suggestion or clear it if no match
        if (match) {
            setSuggestion(match.Exercise);
        } else {
            setSuggestion("");
        }
    };

    const handleKeyDown = (e) => {
        // Autofill with suggestion if the user presses Tab or Enter
        if ((e.key === "Tab" || e.key === "Enter") && suggestion) {
            e.preventDefault(); // Prevent default Tab/Enter behavior
            setSearchText(suggestion);
            setSuggestion(""); // Clear suggestion once applied
        }
    };

    const handleSelectChange = (event) => {
        const selectedId = event.target.value; // Get the selected ID
        setSelectedValue(selectedId);

        // Find the selected exercise from the filtered data
        const selectedExercise = filteredData.find(item => item._id === selectedId);
        if (selectedExercise) {
            setSelectedItem(selectedExercise); // Store the selected exercise data
        } // Update the selected option
    };
   
    return (
        <div className="d-flex bg-secondary vh-100 justify-content-center align-items-center" style={{
            // Makes it responsive
            overflow: "auto",
        }}>
            <div className="header ">
                
                <label htmlFor="search">Search for an Exercise:</label>
                <input
                    id="Exercise"
                    type="text"
                    placeholder="Type to search..."
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: "150px", 
                        padding: "10px",
                        fontSize: "16px",
                        position: "relative",
                        caretColor: "black"
                    }}
                />
                <div className="box1 justify-content-center">
                    <span> Suggested Exercise: </span>
                    <span>{searchText}</span>   
                    <span>{suggestion.slice(searchText.length)}</span>
                </div>
                
                    
            </div>
            <div className="box1">
            <label htmlFor="dropdown">Select the Exercise: </label>
            <select 
                id="dropdown" 
                value={selectedValue} 
                onChange={handleSelectChange}>
                <option value="" disabled>
                    -- Select an Exercise --
                </option>
                {filteredData.map((item) => (
                    <option key={item._id} value={item._id}>
                        {item.name || item.Exercise} 
                    </option>
                ))}
            </select>
            <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
                    <li>Exercise Name: {selectedItem ? selectedItem.Exercise : 'No exercise selected'}</li>
                    <li>Exercise Equiptment: {selectedItem ? selectedItem.Equiptment : ''}</li>
                    <li>Exercise Type: {selectedItem ? selectedItem.Exercise_Type : ''}</li>
                    <li>Major Muscle: {selectedItem ? selectedItem.Major_Muscle : ''}</li>
                    {selectedItem?.Minor_Muscle && (
                        <li>Minor Muscle: {selectedItem.Minor_Muscle}</li>
                    )}
                    {selectedItem?.Example && (

                        <li>
                        Example: 
                        <br />
                        <img 
                            src ={selectedItem.Example} 
                            alt="Example" 
                            style={{ maxWidth: "50%", height: "auto", border: "1px solid #ccc", borderRadius: "4px" }} 
                        />
                        </li>
                    )}
                    
                    {selectedItem?.Notes && (
                        <li>Notes: {selectedItem.Notes}</li>
                    )}
                    {selectedItem?.Modifications && (
                        <li>Modifications: {selectedItem.Modifications}</li>
                    )}
                    
                    
                </ul>
            </div>
            <Link to="../track-workout" style={{ textDecoration: 'none', color: 'black' }}>
                <div className = "box2 d-flex flex-column justify-content-center align-items-center">
                <span>Add exercise to workout </span>
                
                
                </div>
            </Link>
            <Link to="./add-exercise" style={{ textDecoration: 'none', color: 'black' }}>
                <div className = "box2 d-flex flex- justify-content-center align-items-center">
                <span>Add New Exercise </span>
                
                
                </div>
            </Link>
            <Link to="../dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                <div className = "dashButton d-flex flex- justify-content-center align-items-center">
                <span> Dashboard </span>
                </div>
            </Link>
    </div>
    );
};

export default DropDownComponent;
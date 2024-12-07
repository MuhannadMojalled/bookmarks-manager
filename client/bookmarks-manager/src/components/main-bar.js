import { useState } from "react";
import Bookmarks from "./bookmark";
import './style/main-bar.css';

const MainBar = () => {
    const [trigger, setTrigger] = useState(false);
    const [inputValueURL, setInputValueURL] = useState("");
    const [inputValueTitle, setInputValueTitle] = useState("");

    const createBookmark = () => {
        const bookmark = { url: inputValueURL, title: inputValueTitle }; // Use state directly
        return bookmark;
    }

    // Reset the input value
    const resetInput = () => {
        setInputValueURL("");
        setInputValueTitle(""); // Reset state to an empty string
    };

    const [data, setData] = useState([]);

    const handelButtonClick = async () => {
        resetInput();
        const bookmark = createBookmark();
        const body = { "URL": bookmark.url, "title": bookmark.title };
        try {
            const response = await fetch(`http://localhost:3000/api/create.php`,
                { method: 'POST', body: JSON.stringify(body), },);
            if (!response.ok) {
                throw new Error("error cannot fetch data");
            }
            const respObj = await response.json();
            setData(respObj);
            console.log(data);
            setTrigger(!trigger);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }


    return (
        <div className='main-bar'>
            <input
                className="url-input"
                value={inputValueURL}
                onChange={(e) => setInputValueURL(e.target.value)} // Update state on input change
                placeholder="Enter the URL"
            />

            <input
                className="title-input"
                value={inputValueTitle}
                onChange={(e) => setInputValueTitle(e.target.value)} // Update state on input change
                placeholder="Enter the Title"
            />
            <button className="add-button" onClick={handelButtonClick} >Add Bookmark</button>
            <Bookmarks trigger={trigger} />

        </div>
    )

}

export default MainBar;
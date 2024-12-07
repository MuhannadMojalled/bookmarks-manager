import { useState, useEffect } from "react";
import './style/bookmark.css';

const Bookmarks = ({ trigger }) => {

    const createBookmark = (item) => {
        const url = item.URL;
        const title = item.title;
        const id = item.id;
        const bookmark = { url: url, title: title, id: id };

        const handleUpdateURL = () => {
            const newURL = prompt("Enter new URL:", url);
            if (newURL) {
                updateURL(id, newURL);
            }
        };

        const handleUpdateTitle = () => {
            const newTitle = prompt("Enter new title:", title);
            if (newTitle) {
                updateTitle(id, newTitle);
            }
        };

        return (
            <div key={bookmark.id} className="bookmark">
                <div className="title-url">
                    <h3>{bookmark.title}</h3>
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                        {bookmark.url}
                    </a>
                </div>
                <div className="buttons">
                    <button onClick={handleUpdateURL} className="update-url-button">Edit URL</button>
                    <button onClick={handleUpdateTitle} className="update-title-button">Edit Title</button>
                    <button className="delete-button" onClick={() => DeleteBookmark(bookmark.id)}>Delete</button>
                </div>
            </div>
        );
    }

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/readAll.php`);
            if (response.status === 404) {
                setError("No bookmarks were found...");

            }
            else if (!response.ok) {
                setError("An error occurred while fetching data...");
                throw new Error("error cannot fetch data");
            }
            const respObj = await response.json();
            setData(respObj);

        } catch (error) {
            setError("An error occurred while fetching data...");
            throw new Error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [trigger]);

    const DeleteBookmark = async (id) => {
        const body = { "id": id };
        try {
            const response = await fetch(`http://localhost:3000/api/delete.php`,
                { method: 'DELETE', body: JSON.stringify(body), },);
            if (!response.ok) {
                throw new Error("error cannot fetch data");
            }
            const respObj = await response.json();
            setData(respObj);
            fetchData();
        } catch (error) {
            throw new Error("Error fetching data:", error);
        }
    }

    const updateURL = async (id, newURL) => {
        try {
            const response = await fetch(`http://localhost:3000/api/updateURL.php`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, URL: newURL }),
            });
            if (!response.ok) {
                throw new Error("Error updating URL");
            }
            await fetchData(); // Refetch the data to get updated list
        } catch (error) {
            console.error("Error updating URL:", error);
        }
    };

    const updateTitle = async (id, newTitle) => {
        try {
            const response = await fetch(`http://localhost:3000/api/updateTitle.php`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, title: newTitle }),
            });
            if (!response.ok) {
                throw new Error("Error updating title");
            }
            await fetchData(); // Refetch the data to get updated list
        } catch (error) {
            console.error("Error updating title:", error);
        }
    };


    return (
        <div className="App">
            {data.length > 0 ? (
                data.map((item) => createBookmark(item))
            ) : (
                <p>{error}</p>
            )}
        </div>
    );
};

export default Bookmarks;

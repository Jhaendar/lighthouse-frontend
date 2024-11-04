import { useEffect, useState } from "react";
import Book from "./Book";

const tabNameTransformation = {
  Ongoing: "reading",
  Priority: "dropped",
  Stacking: "re_reading",
  "Plant to Read": "plan_to_read",
  Completed: "completed",
  "On Hold": "on_hold",
};

function BookPage({ tabName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 10;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function processBooks(data) {
    setBooks(data.data);
    setTotalPages(Math.ceil(data.total / booksPerPage));
  }

  useEffect(() => {
    let ignore = false;

    // Define an async function for fetching data
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data", tabName);
        if (ignore) return;

        const response = await fetch(
          `http://127.0.0.1:5000/mangadex/manga/${
            tabNameTransformation[tabName]
          }/cards?limit=${booksPerPage}&offset=${currentPage - 1}`
        );

        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        processBooks(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {currentBooks.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}
export default BookPage;

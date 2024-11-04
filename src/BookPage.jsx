import { useEffect, useState } from "react";
import Book from "./Book";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const tabNameTransformation = {
  Ongoing: "reading",
  Priority: "dropped",
  Stacking: "re_reading",
  "Plant to Read": "plan_to_read",
  Completed: "completed",
  "On Hold": "on_hold",
};

function BookPage({ tabName, pageNumber = 0 }) {
  const [currentPage, setCurrentPage] = useState(5);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 10;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(books.length);
  console.log(currentPage, totalPages);
  function processBooks(data) {
    setBooks(data.data);
    setTotalPages(Math.ceil(data.total / booksPerPage));
  }

  function changePage(pageNumber) {
    if (pageNumber < 1) {
      setCurrentPage(1);
      return;
    }
    if (pageNumber > totalPages) {
      setCurrentPage(totalPages);
      return;
    }

    setCurrentPage(pageNumber);
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
          }/cards?limit=${booksPerPage}&offset=${
            booksPerPage * (currentPage - 1)
          }`
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
  }, [currentPage]); // Empty dependency array to run only once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {books.map((book) => (
        <Book
          key={book.id}
          bookTitle={
            book.attributes.title.en ||
            book.attributes.title.ja ||
            book.attributes.title.zh
          }
          bookDescription={
            book.attributes.description.en ||
            book.attributes.description.ja ||
            book.attributes.description.zh
          }
          bookReadChapters={book.read}
          bookTotalChapters={book.total}
          bookId={book.id}
        />
      ))}
      {/* pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            />
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => changePage(1)}>1</PaginationLink>
            </PaginationItem>
          )}

          {currentPage - 1 > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPage - 1 > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => changePage(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>

          {totalPages - currentPage > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => changePage(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {totalPages - currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPage != totalPages && (
            <PaginationItem>
              <PaginationLink onClick={() => changePage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
export default BookPage;

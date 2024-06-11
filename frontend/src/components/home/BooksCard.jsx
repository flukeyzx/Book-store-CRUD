import BookSingleCard from "./BookSingleCard.jsx";
import { useState } from "react";
import DeleteModal from "./ConfirmDeleteModal";

const BooksCard = ({ books, setBooks }) => {
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleDeleteSuccess = (deletedBookId) => {
    setBooks(books.filter((book) => book._id !== deletedBookId));
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {books.map((item) => (
          <BookSingleCard
            key={item._id}
            book={item}
            openModal={() => setBookToDelete(item)}
          />
        ))}
      </div>
      {bookToDelete && (
        <DeleteModal
          bookToDelete={bookToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
};

export default BooksCard;

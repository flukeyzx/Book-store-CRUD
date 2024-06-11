import BookSingleCard from "./BookSingleCard.jsx";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const BooksCard = ({ books, setBooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const openModal = (book) => {
    setBookToDelete(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  const deleteBook = () => {
    console.log("Hi");
    console.log(bookToDelete._id);
    if (bookToDelete) {
      axios
        .delete(`http://localhost:3000/books/${bookToDelete._id}`)
        .then((_) => {
          setBooks(books.filter((book) => book._id !== bookToDelete._id));
          closeModal();
        })
        .catch((error) => {
          console.log(error.message);
          closeModal();
        });
    }
  };
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} openModal={openModal} />
      ))}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-0 px-2">Confirm Deletion</h2>
        <p className="mb-2 text-sm px-2">
          Do you want to delete {bookToDelete?.title}?
        </p>
        <div className="flex justify-around items-center">
          <button onClick={closeModal} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={deleteBook} className="btn btn-danger">
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BooksCard;

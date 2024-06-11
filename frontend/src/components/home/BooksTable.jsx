import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const BooksTable = ({ books, setBooks }) => {
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
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, idx) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {idx + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <MdOutlineDelete
                  className="text-2xl text-red-600 cursor-pointer"
                  onClick={() => openModal(book)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
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
    </table>
  );
};

export default BooksTable;

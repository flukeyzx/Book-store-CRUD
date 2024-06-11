import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

Modal.setAppElement("#root");

const DeleteModal = ({ bookToDelete, onDeleteSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteBook = () => {
    if (bookToDelete) {
      axios
        .delete(`http://localhost:3000/books/${bookToDelete._id}`)
        .then((_) => {
          onDeleteSuccess(bookToDelete._id);
          closeModal();
        })
        .catch((error) => {
          console.log(error.message);
          closeModal();
        });
    }
  };

  return (
    <>
      <button onClick={openModal} className="btn btn-danger">
        Open Delete Modal
      </button>
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
    </>
  );
};

export default DeleteModal;

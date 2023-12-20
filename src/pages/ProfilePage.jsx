import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import '../styles/Profile.css';
import UpdateProfileModal from '../modal/UpdateProfileModal'
import Navbar from "../components/Navbar";

function ProfilePage() {
  // Utiliza useSelector para obtener el estado del usuario desde el almacenamiento global
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");

  const truncateEmail = (email) => {
    const maxLength = 23;
    return email.length > maxLength ? email.substring(0, maxLength - 3) + "..." : email;
  };

  const handleEdit = (fieldName, originalValue) => {
    setSelectedField(fieldName);
    setUpdatedValue(originalValue);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedField("");
    setUpdatedValue("");
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-name">Cuenta</h1>
        </div>
        <ul className="profile-list">
          {/* Muestra los detalles del perfil utilizando el estado del usuario */}
          <li className="profile-list-item">
            <div className="profile-data">
              <span className="profile-label">Nombre:</span>
              <span className="profile-value">{user.name}</span>
            </div>
            <div className="profile-buttons">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleEdit("Nombre", user.name)}
                className="edit-icon"
              />
            </div>
          </li>
          <li className="profile-list-item">
            <div className="profile-data">
              <span className="profile-label">Apellido:</span>
              <span className="profile-value">{user.last_name}</span>
            </div>
            <div className="profile-buttons">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleEdit("Apellido", user.last_name)}
                className="edit-icon"
              />
            </div>
          </li>
          <li className="profile-list-item">
            <div className="profile-data">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{truncateEmail(user.email)}</span>
            </div>
            <div className="profile-buttons">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleEdit("Email", user.email)}
                className="edit-icon"
              />
            </div>
          </li>
          {/* Agrega más detalles del perfil según sea necesario */}
        </ul>

        {showModal && (
          <UpdateProfileModal
            field={selectedField}
            value={updatedValue}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

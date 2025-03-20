import { modalState } from "@/atoms/modalAtom";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";

function Modal() {
  const { showModal, setShowModal } = useRecoilState(modalState);

  const handleClose = () => {};

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>Modal</>
    </MuiModal>
  );
}

export default Modal;

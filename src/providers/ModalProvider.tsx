import { createContext, useContext, useState } from 'react';
import type { Product } from 'api/services/products';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';

interface IModalContext {
  showModal: (product: Product) => void;
  hideModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<IModalContext>({
  showModal: () => void 0,
  hideModal: () => void 0,
  isOpen: false
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4
  //   '@media (min-width: 700px)': {
  //     backgroundColor: 'red !important'
  //   }
};

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showModal = (product: Product) => {
    setProduct(product);
    setIsOpen(true);
  };

  const hideModal = () => {
    setProduct(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, showModal, hideModal }}>
      <Modal open={isOpen} onClose={hideModal}>
        <Card sx={style}>
          <Typography>ID: {product?.id}</Typography>
          <Typography>Name: {product?.name}</Typography>
          <Typography>Year: {product?.year}</Typography>
          <Typography>Color: {product?.color}</Typography>
          <Typography>Pantone value: {product?.pantone_value}</Typography>
        </Card>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export default ModalProvider;

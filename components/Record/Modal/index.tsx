import firebase from 'firebase/compat/app';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

interface Props {
  setIsOpen: (arg1: boolean) => void;
  record: any;
}

const Modal: React.FC<Props> = ({ setIsOpen, record }) => {
  const ref = useRef<HTMLDivElement>();
  const [mounted, setMounted] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    ref.current = document.querySelector('#modal') as HTMLDivElement;
    document.body.style.overflow = 'hidden';
    if (window.innerWidth > 1024) {
      document.body.style['padding-right'] = '15px';
    }
    setMounted(true);
    setWindowHeight(window.innerHeight);
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style['padding-right'] = '0';
    };
  }, []);

  const handleDeleteBtnCLick = async () => {
    await firebase.firestore().collection('weights').doc(record.id).delete();
    window.location.reload();
  };
  return mounted
    ? createPortal(
        <OverLay
          windowHeight={windowHeight}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <ModalPlacer
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <ModalBox>
              <p>
                {record.date.format('MM/DD')}&nbsp;
                {record.weight.toFixed(1)}kg
                <br />
                の記録を削除しますか？
              </p>
              <Button
                isMain
                onClick={() => {
                  handleDeleteBtnCLick();
                }}
              >
                はい
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                いいえ
              </Button>
            </ModalBox>
          </ModalPlacer>
        </OverLay>,
        ref.current as Element,
      )
    : null;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const OverLay = styled.div<{ windowHeight: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${({ windowHeight }) => `${windowHeight}px`};
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  opacity: 0;
  animation: 0.2s ${fadeIn} forwards;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalPlacer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled.div`
  background: white;
  width: calc(100vw - 40px);
  position: relative;
  max-width: 800px;
  padding: 30px 20px;
  max-height: calc(100% - 40px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background: white;
  }
  p {
    text-align: center;
    font-size: 17px;
    margin-bottom: 20px;
  }
`;

const Button = styled.button<{ isMain?: boolean }>`
  border-radius: 5px;
  border: ${({ isMain }) =>
    isMain ? '#ff5470 3px solid' : '#00214d 2px solid'};
  color: ${({ isMain }) => (isMain ? '#ff5470' : 'inherit')};
  font-size: 20px;
  padding: 5px 30px;
  text-align: center;
  margin: 10px auto;
  display: block;
  width: 200px;
`;

export default Modal;

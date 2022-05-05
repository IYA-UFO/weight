import styled from 'styled-components';
import { useContext } from 'react';
import { DataContext } from 'context/DataContextProvider';

const Controller = () => {
  const { currentView, setCurrentView } = useContext(DataContext);

  const menuItems = [
    {
      id: 'record',
      text: '記録',
    },
    {
      id: 'home',
      text: 'ホーム',
    },
    {
      id: 'account',
      text: 'アカウント',
    },
  ];

  return (
    <Wrap>
      {menuItems.map(({ id, text }) => {
        const isActive = id === currentView;
        return (
          <MenuItem
            key={id}
            onClick={() => {
              setCurrentView(id);
            }}
          >
            <img
              src={`/menu/${id}--${isActive ? 'active' : 'inactive'}.png`}
              alt=""
            />
            <span>{text}</span>
          </MenuItem>
        );
      })}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: rgba(0, 33, 77, 0.3) 1px solid;
  height: 66px;
`;

const MenuItem = styled.button`
  padding: 8px 10px;
  img {
    width: 30px;
  }
  span {
    font-size: 12px;
    line-height: 1;
    display: block;
    color: #00214d;
    margin-top: 5px;
  }
`;

export default Controller;

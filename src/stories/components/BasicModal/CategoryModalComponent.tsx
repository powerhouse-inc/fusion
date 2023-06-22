import styled from '@emotion/styled';
import { useCategoriesModalContext } from '@ses/core/context/CategoryModalContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BasicModal from './BasicModal';
import ContainerModal from './ContainerModal';

const CategoryModalComponent: React.FC = () => {
  const {
    checkOut,
    handleChangeItemAccordion,
    handleCheckedExpandedAll,
    headCountCategories,
    noHeadCountCategories,
    handleCloseModal,
    openModal,
  } = useCategoriesModalContext();
  const { isLight } = useThemeContext();
  return (
    <BasicModalExtended
      handleClose={handleCloseModal}
      open={openModal}
      backdropProps={{
        style: {
          background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1)',
          backdropFilter: isLight ? 'blur(2px);' : 'blur(4px)',
        },
      }}
    >
      <ContainerModal
        headCountCategories={headCountCategories}
        noHeadCountCategories={noHeadCountCategories}
        isCheckedExpandedAll={checkOut}
        handleCloseModal={handleCloseModal}
        setIsCheckedExpandedAll={handleCheckedExpandedAll}
        handleChangeItemAccordion={handleChangeItemAccordion}
      />
    </BasicModalExtended>
  );
};

export default CategoryModalComponent;

const BasicModalExtended = styled(BasicModal)({
  position: 'absolute',
  left: '50%',
  height: 'calc(100% - 64px)',
  maxHeight: '100%',
  marginTop: 64,
  marginBottom: 0,
  // This to hidden border in safari
  outline: 'none',
  transform: 'translateX(-50%)',
  width: 'max(100%, 375px)',
  [lightTheme.breakpoints.up('table_834')]: {
    width: 'max(90%, 770px)',
    height: 'calc(100% - 128px)',
    marginBottom: 64,
    maxHeight: 813,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 1114,
    maxHeight: 847,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 1184,
  },
});
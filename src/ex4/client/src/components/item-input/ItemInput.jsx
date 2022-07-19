import { Flex, TextField } from 'monday-ui-react-core';
import { AddSmall } from 'monday-ui-react-core/dist/allIcons';
import { useRef } from 'react';
import 'monday-ui-react-core/dist/main.css';
import { PropTypes } from 'prop-types';

const ItemInput = ({ onAdd }) => {
  const inputRef = useRef('');

  const addItemsHandler = () => {
    onAdd(inputRef.current.value);
  };

  return (
    <Flex style={{ margin: '5px 0' }}>
      <TextField
        ref={inputRef}
        iconName={AddSmall}
        labelIconName="Add task"
        placeholder="Add task..."
        clearOnIconClick={true}
        onIconClick={addItemsHandler}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addItemsHandler();
            inputRef.current.value = '';
          }
        }}
      />
    </Flex>
  );
};

export default ItemInput;

ItemInput.propTypes = {
  onAdd: PropTypes.func,
};
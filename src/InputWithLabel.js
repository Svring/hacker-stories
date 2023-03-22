import * as React from 'react';
import { StyledLabel, StyledInput } from './StyledComponent';

const InputWithLabel = ({ id, type = 'text', value, onInputChange, children }) => (
    <>
        <StyledLabel htmlFor={id}>{children}</StyledLabel>
        &nbsp;
        <StyledInput
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
        />
    </>
);

export { InputWithLabel };
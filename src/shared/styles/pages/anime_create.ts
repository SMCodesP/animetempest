import styled from 'styled-components';

export const ThumbnailUpload = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed #ccc;
  border-radius: 10px;

  & svg {
    stroke-width: 5px;
  }
`;

export const InputTitle = styled.input`
  font-size: 3em;
  font-weight: bold;
  font-family: 'Rubik';
  width: 100%;
  background-color: transparent;
  border: 0;
`;

export const SummaryInput = styled.input`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Rubik';
  line-height: 30px;
  background: transparent;
  height: 30px;
  border: 0;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SinopseEdit = styled.textarea`
  width: 75%;
  height: 100%;
  margin-top: 25px;
  resize: none;
  font-family: 'Rubik';
  font-size: 16px;
  background: transparent;
  border: 0;
  outline: 0;
`;

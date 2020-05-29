import styled from "styled-components";

export const Well = styled.div`
  display: flex;
  padding: 10px;
  border: solid 1px #ddd;
  border-radius: 10px;
  margin-bottom: 15px;
  -webkit-box-shadow: 5px 5px 10px -10px rgba(0, 0, 0, 0.75);

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const Username = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Text = styled.div``;

import styled from 'styled-components';
import { device } from '../../mixins/breakpoint';

export const StyledForm = styled.div`
  display: flex;
  justify-content: center;
  .input-styled{
    display:block;
    width: 50%;
    background-color:#ff234f;
    transform: skewX( 
        10deg);
    input{
      width: 100%;
      color:#FFF;    
      background-color:transparent;
      padding: 20px;
      box-sizing:border-box;
      border:none;
      font-size: 1.5em;
      text-align: center;       
      transform: skewX( 
        -10deg);
      &:focus{
          outline: none;
          border: none;
      }
      ::placeholder,
      ::-webkit-input-placeholder {
        color: #FFF;
      }
      :-ms-input-placeholder {
         color: #FFF;
      }
    }
  }
  .mobile-addtodo-button{
    transform: skewX(0);
    background-color: #ff234f;
    border: none;
    color: #36a945;
    font-size: 1em;
    text-transform: uppercase;
    width: 100%;
    background-color: #f7f7f7;
    display: none;
    @media ${device.tablet}{
      display: block;
    }
  }
  
`;
import styled from 'styled-components';
import { device } from '../mixins/breakpoint';

export const Title = styled.div`
  text-align:center;
  margin-bottom:60px;
  h1{
    font-size: 4em;
    text-align: center;
    color: #FFF;  
    padding:0;
    margin:0;
    font-weight:200;
  }
  span{
    display: inline-block;
    color: #FFF;
    font-size: 4em;
    font-weight: 800;
    background-color: #ff234f;
    padding: 0 20px;
    transform: skewX(-10deg);
  }
  h1,span{
    @media ${device.tablet} {
      font-size: 3em;
    }
  }
`;
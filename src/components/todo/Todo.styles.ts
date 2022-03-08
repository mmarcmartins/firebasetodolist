import styled from "styled-components";
import { device } from '../../mixins/breakpoint';
import { TodoStyleProps } from './Todo.d';


export const TodoStyled = styled.li<TodoStyleProps>`{
    display: flex;    
    padding-left:20px;
    box-sizing: border-box;
    color: #FFF;
    color: ${({ isComplete }) => (isComplete ? "#CCC" : "#FFF")};    
    text-decoration: ${({ isComplete }) => (isComplete ? "line-through" : "none")};
    font-size: 1.5em;
    span{
        flex-grow:1;
        opacity: ${({ isComplete }) => (isComplete ? ".7" : "1")};
        padding: 10px 0;
    }
    @media ${device.tablet} {
        flex-wrap: wrap;
        padding-left:0;
    }
}`;

export const TodoActions = styled.div<TodoStyleProps>`
    align-self:stretch;
    width: 150px;
    box-shadow: 0px 10px 20px 1px rgb(0 0 0 / 15%);
    button{
     width: 50%;
     height: 100%;
     background-color:transparent;
     border:none;
     font-size:1em;     
        &.remove{
            background-color:#FFF;
            color:#ff234f;                
            &:hover{
                background-color:#ff234f;
                color:#FFF;
            }
        }
        &.complete{       
            background-color:#FFF; 
            opacity: ${({ isComplete }) => (isComplete ? ".7" : "1")};
            color:#36a945;
            &:hover{
                cursor:inherit;
            }
            ${({ isComplete }) => (!isComplete && `
                &:hover{
                    background-color:#36a945;
                    color:#FFF;
                    cursor:pointer;
                }
            `)};
        }    
        &:hover{
            cursor:pointer;
        }
   }
   @media ${device.tablet} {
       width: 100%;
       height: 70px;    
   }
`
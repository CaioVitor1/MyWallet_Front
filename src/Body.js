import { Children } from "react/cjs/react.production.min";
import styled from 'styled-components';
import react from "react";

export default function Body(props) {
    return(
        <Body>
            {props.children}
        </Body>
    )
}
const Body = styled.div`
    padding-top: 159px;
    background-color: #A328D6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border: solid;
    padding-bottom: 170px;

h2{
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
    }
input {
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: black;
    margin-left: 18px;
    margin-bottom: 13px;
}
button {
    width: 326px;
    height: 46px;
    background: #8A2BE2;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    margin-left: 18px;
    margin-bottom: 36px;
}
h3{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;  
    display: flex;
    align-items: center;
    justify-content: center;
}
`
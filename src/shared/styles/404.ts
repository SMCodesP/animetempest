import styled, {keyframes}from 'styled-components'
import {shade} from 'polished'

export const Container = styled.div`
	width: 75%;
	padding: 15px 10px;
	background: ${({theme}) => theme.secundaryBackground};
	box-shadow: 0px 0px 2px 0.5px ${({theme}) => theme.text};
	position: absolute;
	border-radius: 5px;
  left: 12.5%;
  top: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const noise_text = keyframes`
	0% {
		clip-path: inset(40% 0 61% 0);
	}
	20% {
		clip-path: inset(92% 0 1% 0);
	}
	40% {
		clip-path: inset(43% 0 1% 0);
	}
	60% {
		clip-path: inset(25% 0 58% 0);
	}
	80% {
		clip-path: inset(54% 0 7% 0);
	}
	100% {
		clip-path: inset(58% 0 43% 0);
	}
`

export const TextError = styled.div`
	color: ${({theme}) => theme.text};
	font-size: 100px;
	position: relative;
	margin: 0 auto;

	&:after {
		width: 100%;
		content: attr(data-text);
		position: absolute;
		left: 3px;
		text-shadow: -3px 0 ${({theme}) => theme.fifthText};
		top: 0;
		color: ${({theme}) => theme.text};
		background: ${({theme}) => theme.secundaryBackground};
		overflow: hidden;
		animation: ${noise_text} 3s infinite linear alternate-reverse;
	}
  
	&:before {
		width: 100%;
		content: attr(data-text);
		position: absolute;
		left: -3px;
		text-shadow: 3px 0 ${({theme}) => theme.number};
		top: 0;
		color: ${({theme}) => theme.text};
		background: ${({theme}) => theme.secundaryBackground};
		overflow: hidden;
		animation: ${noise_text} 15s infinite linear alternate-reverse;
	}
`

export const BackToHome = styled.button`
	font-size: 14pt;
	font-weight: 400;
	border: 1px solid ${({theme}) => theme.text};
	border-radius: 5px;
	background: ${({theme}) => shade(0.2, theme.secundaryBackground)};
	padding: 10px 20px;
	cursor: pointer;
  color: ${({theme}) => theme.text};
	transition: filter .4s, box-shadow .4s;

	&:hover {
    box-shadow: 0 0 3px ${({theme}) => theme.background};
		filter: brightness(50%);
		text-decoration: underline;
	}
`
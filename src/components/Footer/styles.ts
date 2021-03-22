import styled from 'styled-components';
import { darken } from 'polished';
import { FaDiscord } from 'react-icons/fa';

export const BorderCustom = styled.div`
	background-color: ${({ theme }) => darken(0.2, theme.secundaryBackground)};
	background-image: linear-gradient(to top, ${({ theme }) => darken(0.03, theme.secundaryBackground)}, ${({ theme }) => darken(0.2, theme.secundaryBackground)});
	height: 5px;
  width: 100%;
  margin-top: 50px;
`

export const Container = styled.footer`
	width: 100%;
	height: 75px;
	background: ${({ theme }) => theme.secundaryBackground};
	position: relative;
	left: 0;
	bottom: 0;
	display: flex;
  justify-content: center;
`;

export const Author = styled.p`
  align-self: flex-end;
  margin: 5px 10px;

  & a, & span {
    font-weight: bold;
    color: ${({ theme }) => theme.fifthText};
  }
`

export const FooterContainer = styled.div`
	position: absolute;
	display: flex;
	height: 75px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.text};
	font-size: 14pt;
	@media (max-width: 680px) {
		text-align: center;
		width: 100%;
		position: initial;
		margin: 10px 0 0 0;
		height: auto;
	}
`

export const SocialNetworking = styled.div`
	flex: 1;
	padding: 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	@media (max-width: 680px) {
		padding: 15px 15px 10px 15px;
	}
`

export const ProjectThis = styled(SocialNetworking)`
	justify-content: flex-start;
	position: absolute;
  left: 0;
  padding: 0;
	bottom: 0;
`

export const Discord = styled(FaDiscord).attrs(() => ({
  color: '#7289DA',
  size: 32
}))`
	cursor: pointer;
	transition: filter .2s;
	margin: 0 5px;
	&:hover {
		filter: brightness(60%);
	}
`
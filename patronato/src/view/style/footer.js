import styled from 'styled-components';

export const Box = styled.div`
	padding-top: 15px;
	padding-bottom: 15px;
	padding-right: 15px;
	padding-left: 15px;
	background: rgba(34, 56, 43);
	width: 100%;
	
	@media (min-width: 1000px) {
		padding: 32px 10px;
	}

	@media (max-width: 1000px) {
		padding: 30px 10px;
	}`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;`

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;`;

export const ColumnRigth = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0px;
	padding-right: 10px;
	text-align: left;
	color: white;
	@media (max-width: 840px) {
		display: none;
	}`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: 210px 35px 35px 35px 35px 300px;
	grid-gap: 0;
	align-items: center;`;

export const FooterLink = styled.a`
	color: #fff;
	margin-bottom: 5px;
	font-size: 18px;
	text-decoration: none;
	background-color: #B48F69;
	width: 28px;
	text-align: center;
	border-radius: 20px;

	&:hover {
		color: #B48F69;;
		transition: 200ms ease-in;
		background-color: white;
	}`;

export const Link = styled.a`
	color: #fff;
	text-decoration: none;
	text-align: right;

	&:hover {
		color: #B48F69;;
		transition: 200ms ease-in;
	}`;


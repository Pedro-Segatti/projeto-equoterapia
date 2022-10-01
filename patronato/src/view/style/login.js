import styled from 'styled-components';


export const Container = styled.div`
    display: block;
    position: absolute;
    background: linear-gradient(to right, rgba(34, 56, 43, 0.5607843137) 0%, rgba(34, 56, 43, 0.7098039216) 50%, rgba(34, 56, 43, 0) 60%);
    width: 100vw;
    height: 100vh;
    
    .bgImg{
        width: 100%;
        height: 100vh;
        opacity: 0.7;
    }
    
    @media(max-width: 1000px){
        background: linear-gradient(to right, rgba(34, 56, 43, 0.5607843137) 0%, rgba(34, 56, 43, 0.7098039216) 50%, rgba(34, 56, 43, 0) 50%);

        .bgImg{
            display: none;
        }
    }`;

export const Card = styled.div`
    width: 400px;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 12px;
    
    .logoContent{
        text-align: center;
        padding-top: 15px;
    }

    .logo{
        width: 100px;
    }

    .texto{
        padding-top: 10px;
        width: 150px;
        padding-bottom: 10px;
    }

    @media(max-width: 1000px){
        height: 90vh; 
    }

    @media(max-width: 640px){
        width: 90vw;
    }`;

export const Box = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;

    .inputLogin{
        border: none;
        border-bottom: 1px solid #b1b1b1;  
        border-radius: 0;
    }

    .buttonLogin{
        width: 100%;
        height: 40px;
        margin-top: 20px;
        background: rgba(34, 56, 43, 0.5607843137);
        border: none;
    }

    .esqueciSenha{
        text-align: center;
        margin-top: 10px;

        a{
            color: black !important;
        }
    }

    .form-control:focus{
        border: none;
        border-bottom: 1px solid;
        box-shadow: none;
    }
`;
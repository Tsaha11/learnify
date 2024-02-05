import { useParams } from 'react-router-dom';
import ExamHeader from './ExamHeader';
import ExamResources from './ExamResources';
import styled from '@emotion/styled';
const ExamCorner=()=>{
    const param=useParams();
    return (
        <>
        <Container>
            <ExamHeader/>
        </Container>
        </>
    )
}
const Container = styled.div`
* {sad
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-family: 'Bungee Shade', cursive;
    font-family: 'Cutive', serif;
    font-family: 'Poppins', sans-serif;
  }
  
  .exam-container .linkSyllabus:hover{
    cursor: pointer;
    color: black;
  }
  .exam-container .header-icon{
    width: 30%;
  }
  .exam-container .header div{
    width: 13%;
    height: 60%;
    display: flex;
    transition: all 0.5s;
    border-radius: 50%/125%;
    justify-content: center;
    border: 2px solid black;
  }
  .exam-container .header div:hover{
    background-color: rgb(202, 192, 192);
  }
  .exam-container .header div span{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .exam-container body{
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; */
    min-height: 200vh;
    font-family: 'Fira Sans', sans-serif;
    /* background: linear-gradient(147deg,#2129c1 0%, #9295e0 74%); */
  }
  .exam-container .blog-card{
    width: 70%;
    min-height: 40vh;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    border-radius: 25px;
    background: white;
    box-shadow: 0px 10px 50px rgba(40, 114, 193, 0.3);
  }
  .exam-container .inner-part{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 25px;
    padding-top: 10px;
  }
  .exam-container .inner-part .img{
    height: 80%;
    width: 35%;
    position: static;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid black;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .exam-container .img img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    opacity: 0;
    transition: .6s;
  }
  .exam-container #tap-1:checked ~ .inner-part .img-1,
  #tap-2:checked ~ .inner-part .img-2,
  #tap-3:checked ~ .inner-part .img-3{
    opacity: 1;
    transition-delay: .2s;
  }
  .exam-container .content{
    padding: 0 20px 0 35px;
    width: 530px;
    margin-left: 50px;
    opacity: 0;
    transition: .6s;
  }
  .exam-container .content h3{
    font-weight: 700;
  }
  .exam-container .content .text{
    font-weight: 450;
  }
  .exam-container #tap-1:checked ~ .inner-part .content-1,
  #tap-2:checked ~ .inner-part .content-2,
  #tap-3:checked ~ .inner-part .content-3{
    opacity: 1;
    margin-left: 0px;
    z-index: 100;
    transition-delay: .3s;
  }
  .exam-container .content span{
    display: block;
    color: #7b7992;
    margin-bottom: 15px;
    font-size: 22px;
    font-weight: 500
  }
  .exam-container .content .title{
    font-size: 30px;
    font-weight: 700;
    color: #0d0925;
    text-decoration: underline;
    margin-bottom: 20px;
    font-family: 'Bungee Shade', cursive;
  font-family: 'Cutive', serif;
  font-family: 'Poppins', sans-serif;
  }
  .exam-container .content .text{
    color: #4e4a67;
    font-size: 19px;
    margin-bottom: 6px;
    line-height: 1.5em;
    text-align: justify;
  }
  .exam-container .content button{
    display: inline-flex;
    padding: 15px 20px;
    border: none;
    font-size: 16px;
    text-transform: uppercase;
    color: #fff0e6;
    font-weight: 600;
    letter-spacing: 1px;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    border: 1px solid #fd3535;
    background: linear-gradient(147deg, #fe8a39  0%, #fd3838 74%);
  }
  .exam-container .content button:hover{
    background: linear-gradient(147deg, #fe791b 0%, #fd1c1c 74%);
  }
  .exam-container .toggleSyllabus{
    text-decoration: underline;
    color: #000001;
  }
  .exam-container input[type="radio"],
  .exam-container input[type="checkbox"]{
    display: none;
  }
  .exam-container .resourceContainer{
    width: 70%;
    margin-top: 30px;
    margin: auto;
    transition: all 1s;
    border-radius: 25px;
    padding: 10px;
    background: white;
    box-sizing: border-box;
    box-shadow: 0px 10px 50px rgba(17, 110, 187, 0.3);
    margin-bottom: 30px;
  }
  .exam-container .resourceContainer .info{
    font-weight: 500;
  }
  .exam-container .resourceContainer h2{
    margin: 16px;
    font-family: 'Bungee Shade', cursive;
  font-family: 'Cutive', serif;
  font-family: 'Poppins', sans-serif;
  }
  .exam-container .resourceContainer .resources{
    display: flex;
    flex-wrap: wrap;
  }
  .exam-container .resourceCard{
    margin: 10px;
    /* border: 3px solid black;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px; */
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    padding: 20px 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px rgb(91, 90, 90);
  }
  .exam-container .channel{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    
  }
  
  .exam-container .channel div{
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    padding: 20px 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px rgb(91, 90, 90);
  }
  .exam-container .channel img{
    width: 200px;
    position: static;
    border-radius: 10px;
    height: 150px;
    border: 3px solid black;
  }
  .exam-container .channel .header{
    font-weight: bolder;
    font-size: 1.2rem;
    margin-bottom: 0px;
  }
  .exam-container .channel span{
    width: 100%;
    height: 24px;
  }
  .exam-container .resources{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .exam-container .resources div{
    text-align: center;
  }
  .exam-container .resources img{
    width: 200px;
    border-radius: 10px;
    border: 1px solid black;
    height: 150px;
  }
  .exam-container .resources .header{
    font-weight: bolder;
    font-size: 1.2rem;
    width: 100%;
    height: 24px;
  }
  
  .exam-container .active{
    color: white;
    background-color: black;
  }
  .exam-container .notes-content{
    text-align: left;
  }
  .exam-container .notes-header{
    font-weight: 700;
    text-align: left;
  }
`
export default ExamCorner;
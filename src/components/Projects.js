import {Container, Row, Col, Tab, Nav} from "react-bootstrap";
import {ProjectCard} from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import React, {useState} from 'react';
import TrackVisibility from 'react-on-screen';
import TodoList from './TodoList'
import TodoListTwo from './TodoListTwo'
import {useSubmitMutation} from "../api/api";
import {useSelector} from "react-redux";
import {selectTodoList} from "../slices/todoListSlice";
import {selectTodoListTwo} from "../slices/todoListTwoSlice";
import {questions} from "./Question"


let navs = [["first", "Questionnaire"], ["second", "Portolio Selection"], ["third", "Prediction"]]
let names = [["Weights", "weight"], ["AMZN", "AMZN"], ["ZM", "ZM"], ["AMD", "AMD"]]

export const Projects = () => {

    const [formDetails, setFormDetails] = useState({
        min_position_size: '',
        max_position_size: '',
        tolerance_factor: '',
        max_lookback_years: '',
    })
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [investdate, setInvestdate] = useState('');
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [submit, {isLoading, error, isError}] = useSubmitMutation()
    const todoList = useSelector(selectTodoList)
    const todoListTwo = useSelector(selectTodoListTwo)
    const [projects, setProjects] = useState([])
    const [projectsTwo, setProjectsTwo] = useState([])


    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            let data = (await submit({...formDetails, CodeList: todoList, "data_source": 0,})).data
            let imgs1 = names.map(names => ({title: names[0], description: names[0], imgUrl: data.img[names[1]]}))
            let imgs2 = names.map(names => ({title: names[0], description: names[0], imgUrl: data.img_dl[names[1]]}))
            setProjects([...imgs1, ...imgs2])
        } catch (e) {
            console.log(e)
        }
    };

    const handleSubmitTwo = async e => {
        e.preventDefault();
        try {
            let data = (await submit({"investdate": investdate, weights: todoListTwo})).data
            let imgs1 = names.map(names => ({title: names[0], description: names[0], imgUrl: data.img[names[1]]}))
            setProjectsTwo([...imgs1])
        } catch (e) {
            console.log(e)
        }
    };

    const handleAnswerOptionClick = value => {
        setScore(score + value);
        const nextQuestion = currentQuestion + 1;
        nextQuestion < questions.length ? setCurrentQuestion(nextQuestion) : setShowScore(true)
    };

    return (
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>Portfolio Analysis</h2>
                                    <p>Setp 1:Risk tolenrence <br/> Step 2:Choose your portolio <br/> Step 3:Find your
                                        results. <br/> Enjoy your trip of vestigation.</p>
                                    
                                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
    
                                        <Nav variant="pills"
                                             className="nav-pills mb-5 justify-content-center align-items-center"
                                             id="pills-tab">
                                            {navs.map(item => (
                                                <Nav.Item key={item[0]}>
                                                    <Nav.Link eventKey={item[0]}>{item[1]}</Nav.Link>
                                                </Nav.Item>
                                            ))}
                                        </Nav>
                                        <Tab.Content id="slideInUp"
                                                     className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                                            
                                        {/* FIRST PART BEGIN */}   
                                            <Tab.Pane eventKey="first">

                                                <div className='app'>
                                                    {showScore ? (
                                                        <>
                                                            <div className='score-section'>
                                                                You scored {score} !
                                                                <br/>Your Risk tolenrence Level is : Moderate .
                                                            </div>

                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className='question-section'>
                                                                <div className='question-count'>
                                                                    <span>Question {currentQuestion + 1}</span>/10

                                                                </div>

                                                                <div
                                                                    className='question-text'>{questions[currentQuestion].questionText}</div>
                                                            </div>

                                                            <div className='answer-section'>
                                                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                                                    <button className='qbutton'
                                                                            onClick={() => handleAnswerOptionClick(answerOption.value)}>{answerOption.answerText}</button>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                            </Tab.Pane>
                                        {/* FIRST PART END*/}
                                        
                                        {/* SECOND PART */}
                                            <Tab.Pane eventKey="second">
                                                <div className="shuru">
                                                    <h3 style={{fontWeight:'300',color:'d1c9c9',marginBottom:'30px',}}>Input Your Information</h3>
                                                    <form onSubmit={handleSubmit}>
                                                        <Row className="align-items-center">
                                                            <Col size={12} sm={6} className="px-1">
                                                                <input type="text" value={formDetails.min_position_size}
                                                                       placeholder="Min Position Size"
                                                                       onChange={(e) => onFormUpdate('min_position_size', e.target.value)}/>
                                                            </Col>
                                                            <Col size={12} sm={6} className="px-1">
                                                                <input type="text" value={formDetails.max_position_size}
                                                                       placeholder="Max Position Size"
                                                                       onChange={(e) => onFormUpdate('max_position_size', e.target.value)}/>
                                                            </Col>
                                                            <Col size={12} sm={6} className="px-1">
                                                                <select
                                                                    value={formDetails.tolerance_factor}
                                                                    placeholder="Tolerance Factor"
                                                                    onChange={(e) => onFormUpdate('tolerance_factor', e.target.value)}>
                                                                    <option>Risk Tolerance Result</option>
                                                                    <option value="1">Very Conservative</option>
                                                                    <option value="2">Conservative</option>
                                                                    <option value="3">Moderate</option>
                                                                    <option value="4">Aggressive</option>
                                                                    <option value="5">Very Aggressive</option>
                                                                </select>
                                                            </Col>
                                                            <Col size={12} sm={6} className="px-1">
                                                                <input type="tel" value={formDetails.max_lookback_years}
                                                                       placeholder="Max Lookback Years"
                                                                       onChange={(e) => onFormUpdate('max_lookback_years', e.target.value)}/>
                                                            </Col>


                                                            <h3 style={{fontWeight:'300',color:'d1c9c9',marginTop:'40px',marginBottom:'30px',}}>Choose Your Portfolio With Unique Code</h3>
                                                            <Col size={12} className="px-1">
                                                                <TodoList/>
                                                                <button style={{width:'300px',marginTop:'40px',}} type="submit">
                                                                    <span>{isLoading ? "Sending" : "Send"}</span>
                                                                </button>
                                                            </Col>
                                                            {
                                                                error &&
                                                                <Col>
                                                                    <p className={isError ? "danger" : "success"}>{"Some thing goes wrong!"}</p>
                                                                </Col>
                                                            }

                                                        </Row>
                                                    </form>

                                                    <h3 style={{fontWeight:'300',color:'d1c9c9',marginTop:'40px',marginBottom:'30px',}}>Your Results:</h3>
                                                    <Row>
                                                    {
                                                        projects.map((project, index) => {
                                                            return (
                                                                <ProjectCard
                                                                    key={index}
                                                                    {...project}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </Row>
                                                </div>
                                            </Tab.Pane>
                                            {/* SECOND PART END */}

                                            {/* THIRD PART */}
                                            <Tab.Pane eventKey="third">
                                            <div className="shuru">

                                                <h3 style={{fontWeight:'300',color:'d1c9c9',marginBottom:'30px',}}>Input Your Information</h3>
                                                <form onSubmit={handleSubmitTwo}>
                                                    <Row className="align-items-center">
                                                        
                                                        <Col size={12} className="px-1">
                                                            <input type="text" value={investdate}
                                                                placeholder="Input Investdate eg. 2022-05-30"
                                                                onChange={(e) => setInvestdate(e.target.value)}/>
                                                            <TodoListTwo />
                                                            <button type="submit">
                                                                <span>{isLoading ? "Sending" : "Send"}</span>
                                                            </button>
                                                        </Col>
                                                        {
                                                            error &&
                                                            <Col>
                                                                <p className={isError ? "danger" : "success"}>{"Some thing goes wrong!"}</p>
                                                            </Col>
                                                        }

                                                    </Row>
                                                </form>

                                                <h3 style={{fontWeight:'300',color:'d1c9c9',marginTop:'40px',marginBottom:'30px',}}>Your Results:</h3>
                                                <Row>
                                                {/* {
                                                    projects.map((project, index) => {
                                                        return (
                                                            <ProjectCard
                                                                key={index}
                                                                {...project}
                                                            />
                                                        )
                                                    })
                                                } */}
                                                </Row>
                                                </div>
                                                
                                            </Tab.Pane>
                                            {/* THIRD PART END*/}
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}></img>
        </section>
    )
}

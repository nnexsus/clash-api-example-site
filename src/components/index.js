import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import stux from './stux.png';

const Wrapper = styled.div`

    background-color: #020122;
    font-family: monospace;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    background-image: url(${stux});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .social {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row: 3;
        display: flex;
        margin-left: -10px;
        margin-left: 1px;

        img {
            width: 40px;
            height: 40px;
            background-color: var(--lightPurple);
            padding: 0px;
            border: solid 2px black;
            border-radius: 50%;
            margin: 15px 10px 0 10px;
            box-shadow: 0px 0px 0px 3px white;
            transition: 0.4s ease-in-out;

            :hover {
                background-color: #97DFFC;
                box-shadow: 0px 0px 0px 8px white;
                padding: 5px;
            }
        }
    }

    .response {
        padding: 10px;
        overflow: scroll;
        width: 80%;
        margin: 10px auto;
        background: rgba(249, 250, 220, 0.9);
        border-radius: 3px;
    }

    .categories, .params {
        background-color: rgba(249, 250, 220, 0.9);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 20px;
        margin: 0 auto;
        grid-gap: 10px;
        width: 85%;
        text-align: center;
        border: solid black 2px;
        border-radius: 3px;
    }

    button {
        background-color: #FF521B;
        border: 2px solid black;
        border-radius: 3px;
        cursor: pointer;
        transition: 0.1s ease-in-out;

        :hover {
            background-color: #F9FADC;
        }
    }

    .req {
        background-color: #FC9E4F;
        padding: 5px;
        border: solid black 2px;
        border-radius: 3px;
    }

    .spin {
        background-color: #FC9E4F;
        padding: 5px;
        border: solid black 2px;
        border-radius: 3px;
        position: fixed;
        right: 20px;
        animation: spinner 2s infinite ease-in-out;
        width: 80px;

        @keyframes spinner {
            from {
                transform: rotate(0deg);
            } to {
                transform: rotate(359deg);
            }
        }
    }
`;

const Home = () => {

    const [response, setResponse] = useState('Click a button to make a request');
    const [request, setRequest] = useState('No request made');
    const [loading, setLoading] = useState(false);

    const reqs = ["/api/all", "/api/lists", "/api/troops", "/api/supers", "/api/sieges", "/api/spells", "/api/heroes", "/api/pets"]

    const params = ["/api/troop/barbarian", "/api/super/superarcher", "/api/siege/loglauncher", "/api/spell/poisonspell",
    "/api/hero/grandwarden", "/api/pet/lassi"]

    const call = (classname) => {
        setRequest(classname)
        setLoading(true)
        axios.get(`https://clash-database-api.herokuapp.com${classname}`).then((response) => {
            setResponse(response.data)
            document.getElementById('res').scrollIntoView()
            setLoading(false)
        }).catch((error) => {
            setResponse(error.data)
            setLoading(false)
            console.log(error.data)
        })
    }

    return (
        <Wrapper>
            <div className='floater'>
                {loading ? 
                <img className='spin' alt='loading spinner' src={'/loading.png'} />
                : null}
            </div>
            <div style={{color: "white"}}>
                <h1>Clash API Examples</h1>
                <h4>Make all requests to: <a href='https://clash-database-api.herokuapp.com' style={{color: "blueviolet"}}>https://clash-database-api.herokuapp.com</a></h4>
                <div className='social'>
                    <p style={{alignSelf: "center"}}>Site and API by nnexsus.</p>
                    <a href='https://twitter.com/_nnexsus' target="blank"><img src='/Twitter-Logo-circle.png' alt='twitter link'/></a>
                    <a href='https://youtube.com/c/nnexsus' target="blank"><img src='/Youtube-Logo-circle.png' alt='youtube link'/></a>
                    <a href='https://github.com/nnexsus' target="blank"><img src='/Github-Logo.png' alt='github link'/></a>
                    <a href='https://discord.gg/d8R2tDaBK2' target="blank"><img src='/Discord-Logo.png' alt='discord invite link'/></a>
                    <a href='https://nnexsus.net' target="blank"><img src='/nnlogogifcrop.gif' alt='my homepage link'/></a>
                </div>
            </div>
            <hr style={{width: "100%"}}></hr>
            <div className='categories'>
                <h1>Category Request Examples</h1>
                {reqs.map((category) => (
                    <div className='req' key={`${category}`}>
                        <h3>{category}</h3>
                        <button onClick={(e) => call(e.currentTarget.className)} className={`${category}`}><p>Request</p></button>
                    </div>
                ))}
            </div>
            <hr style={{border: "solid black 1px"}}/>
            <div className='params'>
                <h1>Specific Request Examples</h1>
                {params.map((category) => (
                    <div className='req' key={`${category}`}>
                        <h3>{category}</h3>
                        <button onClick={(e) => call(e.currentTarget.className)} className={`${category}`}><p>Request</p></button>
                    </div>
                ))}
            </div>
            <div id='res' className='response'>
                <h3>{request}</h3>
                <p style={{color: "black", padding: "5px", borderRadius: "4px"}}>{JSON.stringify(response)}</p>
            </div>
        </Wrapper>
    )
}

export default Home;
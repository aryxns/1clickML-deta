import React from "react";
import axios from "axios";
const OpenAI = require('openai-api');

function Home(){
  function getRandomDifferent(arr, last = undefined) {
  if (arr.length === 0) {
    return;
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    let num = 0;
    do {
      num = Math.floor(Math.random() * arr.length);
    } while (arr[num] === last);
    return arr[num];
  }
}

  const soft_questions = ["Describe the process you have for a programming task, from requirements to delivery. (talk about your thought process and tools)", "How do you implement your error handling? (talk about previous experience and methods)", "What is your process to test and find bugs in an application? (explain how your process is efficient)", "Implement Dijkstra’s Shortest Path in the programming language of your choice. (implement and test)", "Tell me about a tough software development problem and how you solved it. (talk about why it was tough and how you thought through it)", "Are you working on a passion project? (talk about your personal goals and career)", "What are your career aspirations? (talk about your future plans and how they fit into this company's mission)"]
  const q1 = String(getRandomDifferent(soft_questions))
  const new_array = soft_questions.filter(e => e !== q1)
  const q2 = String(getRandomDifferent(new_array))
  const prompt1 = "The following are 10 questions for a software developer interview. \n" + "1." + q1 + "\n" + "2." + q2 + "\n" + "3."
  console.log(prompt1);
  const [userp, setuserP] = React.useState("");
  const [response, setResponse] = React.useState("Loading");
  const api_key = "sk-qp451QyLSGPAFknaEWw0OH8opkYRkK4c2QuUgYUT";
  const openai = new OpenAI(api_key);
  const url = 'https://api.openai.com/v1/engines/curie/completions';
  async function getdata(){
    const gptResponse = await openai.complete({
        engine: 'curie',
        prompt: prompt1,
        maxTokens: 50,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        stop: ["\n"]
    });
    setResponse(gptResponse.data['choices'][0].text);
    console.log(gptResponse.data['choices'][0].text);
  }
  return(
    <div className="grid justify-items-start relative top-10 left-10">
    <h1 className="text-2xl">Interview Questions Generator</h1>
    <br/>
    <select className="mt-10 border-2 bg-gray-100 p-3">
    <option>Software Developer</option>
    <option>Marketing Intern</option>
    <option>Product Manager</option>
    </select>
    <button onClick={getdata} className="p-2 mt-10 bg-blue-400 hover:bg-blue-800 text-white">GENERATE QUESTION</button>
    <div className="w-11/12 grid justify-items-start">
    <h1 className="mt-10 text-2xl">{response}</h1>
    <textarea placeholder="I did it because..." className="p-3 w-80 mt-5 bg-gray-100 h-80"></textarea></div>
    </div>
  )
}

export default Home;

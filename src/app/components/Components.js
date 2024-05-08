'use client'
import { useState } from 'react';
import { HashLoader } from 'react-spinners';
import Image from 'next/image';
import axios from 'axios';

export default function Components() {
  const url1 = "http://localhost:5000/resolve"
  const url = "https://proyecto-breyner-fisica-c35ba74a286e.herokuapp.com/"
  const [problem, setProblem] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("/portada fisica.jpg");
  const [imageOff, setImageOff] = useState(true);
  let formattedTextLines = [] = [];
  if(serverResponse){
    formattedTextLines = serverResponse.trim().split("\n");
  }

  const handleProblem = async (e) => {

    setLoading(true); 
    try {

        const formData = new FormData();
        formData.append('problem', problem);
        console.log(problem)
        console.log("Sending problem: ", formData);

      const response = await axios.post(`${url}`, formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        }
    );
      
    console.log('Server response:', response);
     setServerResponse(response.data.resolved);
      setImageOff(false);

    } catch (error) {
      console.error('Error fetching solution:', error);
      
    } finally {
      setLoading(false); // Set loading to false after the async operation
      
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="Flex mx-2 md:w-1/2 w-full">
        <div className="bg-gradient-to-right mt-4 bg-green-700 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl text-white font-semibold mb-4">Escribe tu problema de física</h1>
        </div>
        <div className="bg-black shadow-md rounded-md px-8 mt-4 pt-6 pb-8 mb-4">
          <textarea
            placeholder="Escribe tu problema de física aquí..."
            onChange={(e) => setProblem(e.target.value)}
            className="shadow appearance-none bg-slate-200 text-black border rounded w-full py-2 px-3 mb-2"
            rows={5}
          />
          <button
            onClick={handleProblem}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </div>
      </div>

        <div className="Flex mx-2 md:w-1/2 w-full">
          <div className="bg-gradient-to-right mt-4 bg-green-700 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-white">Aquí aparecerá su respuesta !!!
            </h1>
          </div>
          <div className="bg-black text-white shadow-md rounded-md px-8 mt-4 pt-6 pb-8 mb-4">
            {loading && (
              <div className="flex justify-center items-center py-5 px-3 mb-2 h-32">
                <HashLoader color="#ffffff" size={50} />
                <p className="text-gray-500 ml-2 py-4 px-3 mb-2">Please wait, loading content</p>
              </div>
            )}

           {imageOff && (
            <Image
                        src={image}
                        width={300}
                        height={200}
                        alt="Logo"
                    />
           )} 

            <div>
              {formattedTextLines.map((line, index) => (
                <p key={index} className="text-white font-serif">{line}</p>
              ))}
            </div>
          </div>
        </div>
    </main>
  );
}

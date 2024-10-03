import { useState , useCallback, useEffect , useRef} from 'react'


function App() {
  const [length, setlength]= useState(8)
  const [NumberAllowed , setNumberAllowed] = useState(false);
  const [CharAllowed , setCharAllowed] = useState(false)
  const [Password , setPassword] = useState("")
//useRef hook

const passwordRef = useRef(null)

  const passwordGenrater = useCallback( () => {
    let pass = ""
    let str  = "ABCDEFGHIJKLMNOPGQRSTUVWXYZabcdefghijklmnopqrstuvxyz"
    if(NumberAllowed) str += "0123456789"
    if(CharAllowed) str  += "!@#$%^&*_=+{}()[]"


    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  }  , [length ,NumberAllowed , CharAllowed , setPassword])

const copypasswordToclipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 999) //its copy the 999 characters you can set it..
  window.navigator.clipboard.writeText(Password)
},[Password])



  useEffect(() =>{
    passwordGenrater()
  },[length , NumberAllowed, CharAllowed, passwordGenrater])



  return (
    < >
         


         <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
         <h1 className='text-4xl text-center font-serif text-white my-3'>Password Generater</h1>

         <div className='flex shadow rounded-lg overflow-hidden mb-4 '> <input type="text" value={Password} className='outline-none w-full py-1 px-3  ' placeholder='password '  readOnly  ref={passwordRef}/>
         <button className=' outline-none bg-blue-800 text-white px-3  py-0.5  shrink-0 font-serif rounded-lg' onClick={copypasswordToclipboard} >Copy</button>

         </div>

         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 '>
            <input 
            type ="range"
             min={6}
             value={length}
             className='cursor-pointer '
             onChange={(e) => {setlength (e.target.value)}}  />
             <label > length :  {length} </label>
          </div>
          <div className='flex items-center gap-x-1 ' >
            <input 
            type="checkbox" 
            defaultChecked = {NumberAllowed}
            id='numberInput'
            onChange={ ( ) =>  { setNumberAllowed((prev) => ! prev) }}  />
            <label > number  </label>
           <div className='flex items-center gap-x-1 ' >
           <input 
            type="checkbox" 
            defaultChecked = {NumberAllowed}
            id='numberInput'
            onChange={ ( ) =>  { setNumberAllowed((prev) => ! prev) }}  />

                 <label > characters  </label>
           </div>

          </div>
         </div>
         </div>

         
    </>
  )
}

export default App

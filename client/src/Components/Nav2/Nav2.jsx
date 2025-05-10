import React from 'react'

const Nav2 = () => {
  return (
    <>
        <div className='bg-red-400 w-screen h-12 content-center'>
            <div className='display-flex ml-2 '>
                <img className='object-contain h-6' src="src/assets/icons/back.png" alt="" srcset="" />
            </div>
        </div>

        <div>
            <h2 className='text-[24px] font-bold text-center'  >POST YOUR AD</h2>
        </div>
        <div className='w-[852px] h-800 mx-auto border'>
        <div className='w-[851px]   h-15 mx-auto flex items-center  pt-6 pr-[30px] pb-4 pl-[30px]  border-r border-b-0'>CHOOSE A CATEGORY</div>
        <div className=' h-600 w-[425.5px] flex justify-start border-t border-r border-b border-l-0'>
            <ul className='w-[100%]'>
                <li className='border-b flex items-center text-[#8d9094] hover-fill-[#020812] p-[10px] fill-[#8d9094]'>
                <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-UJ1uk" d="M744.747 124.16l38.4 33.28 36.949 258.731 107.221 107.179 11.349 27.435v193.963l-38.827 38.784h-38.741v116.352h-77.568v-116.352h-543.061v116.352h-77.568v-116.352h-38.741l-38.827-38.827v-193.877l11.349-27.435 107.264-107.221 36.949-258.731 38.4-33.28h465.493zM768.555 474.325h-513.109l-92.544 92.501v139.093h698.197v-139.093l-92.544-92.501zM298.667 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM725.333 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM711.083 201.685h-398.165l-27.904 195.115h453.888l-27.861-195.072z"></path></svg> 

                <p className='flex-grow text-[16px] p-[8px]'>Cars</p>

                <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-UJ1uk" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg>
                </li>
                <li className='border-b flex items-center text-[#8d9094] hover-fill-[#020812] p-[10px] fill-[#8d9094]'><svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-UJ1uk" d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path></svg>
                <p className='flex-grow text-[16px] p-[8px]'>Mobiles</p>

                <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-UJ1uk" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg>
                </li>
                <li  className='border-b flex items-center text-[#8d9094] hover-fill-[#020812] p-[10px] fill-[#8d9094]'>

                <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-UJ1uk" d="M149.76 128l-64.427 62.848v480.853l69.333 67.84h317.781l0.725 75.477h-169.6v80.981h416.128v-80.981h-161.621l-0.683-75.435h315.648l65.621-68.693v-482.389l-75.733-60.501h-713.173zM170.24 638.72v-414.848l15.232-14.848h646.656l21.632 17.28v413.184l-18.176 19.072h-645.12l-20.224-19.84z"></path></svg>

                <p className='flex-grow text-[16px] p-[8px]'>Electronics & Appliances</p>


                <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-UJ1uk" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg>
                </li>
            </ul>
        </div>
        </div>

    </>
  )
}

export default Nav2

import React from 'react'

const Title = () => {
    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

            <div className='text-center mb-6'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
            font-semibold mx-auto leading-[1.2]'>Create Your Amazing <br /> Note Maker</h1>
                <p className="mt-8 max-w-xl mx-auto text-center text-gray-600 text-lg sm:text-xl leading-relaxed">
                    Organize your day, one Note at a time and also maintain displine.
                    Stay productive, stay focused, and make every Note count.
                </p>

                <div className='mt-5'>
                   <a href="/note">
                     <button className='bg-black text-white px-10 py-3 rounded-lg
            hover:scale-102 active:scale-95 transition cursor-pointer'>Creating Note
                        
                    </button>
                   </a>

                </div>
            </div>




        </div>
    )
}

export default Title

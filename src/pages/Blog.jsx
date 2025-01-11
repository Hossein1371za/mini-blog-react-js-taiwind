import React from 'react'

const Blog = () => {
  return (
    <div className="bg-blog bg-no-repeat bg-cover bg-center h-screen text-accent">
     <div className='flex flex-col items-center h-full'>
      <h1 className='text-2xl font-extrabold pb-10 mt-8'>پستت رو بساز!!!</h1>
      <form className='bg-primary p-5 rounded-md flex flex-col gap-y-3'>
        <div className='flex flex-col gap-y-3 relative'>
          <label className='text-sm'>انتخاب عکس</label>
          <input className='input bg-accent opacity-0 z-20' type='file' />
          <input placeholder='فایل خود را انتخاب کنید.' type='text' className='absolute input w-full z-0 bottom-0 text-center'/>
        </div>
        <div className='flex flex-col gap-y-3'>
          <label className='text-sm'>عنوان</label>
          <input className='input' type='text' />
        </div>
        <div className='flex flex-col gap-y-3'>
          <label className='text-sm'>انتخاب عکس</label>
          <textarea className='input'></textarea>
        </div>
        <button className='bg-secondary rounded-md w-full text-primary py-2' type='submit'>افزودن پست</button>
      </form>
     </div>
    </div>
  )
}

export default Blog
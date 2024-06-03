
import Button from './Button'
const Image_with_text = ({order,title,paragraph,buttonName,to,imagseSrc}) => {
  return (
    <div className="container  py-20 flex gap-4 justify-center mx-auto px-24">
      <div className={`flex gap-16 w-2/5 ${order?order:''}  flex-col`}>
<h1 className='text-3xl whitespace-pre-line leading-relaxed tracking-wider break-words uppercase font-normal'>{title}</h1>
<p className='font-normal leading-7 tracking-wide'>{paragraph}</p>
<div className='w-1/2'>
<Button to={to} name={buttonName} bg="bg-transparent"  />
</div>
      </div>
      <div>
            <img
             src={imagseSrc}
             className='h-[700px] rounded-lg w-[450px] object-cover' alt="Products" />
      </div>
    </div>
  )
}

export default Image_with_text

export default function Button({ secondary = false, text, onClick }) {
	return secondary ? (
		<div
			className='max-w-16 cursor-pointer text-center text-blue bg-transparent border-blue border rounded-md py-3.5 px-7.5'
			onClick={onClick}
		>
			{text}
		</div>
	) : (
		<div
			className='max-w-[160px] cursor-pointer text-center text-white bg-blue rounded-md py-3.5 px-7.5'
			onClick={onClick}
		>
			{text}
		</div>
	);
}

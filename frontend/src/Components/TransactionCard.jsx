export default function TractionCard({
  title,
  date,
  category,
  value,
  icon,
  isIncome,
}) {
  return (
    <div className="bg-white shadow-xl rounded-lg h-20 w-4/5 border flex mt-3 justify-between ">
      <div className="m-5 w-1/5 flex">
        {icon}
        <p className="hidden lg:block mt-2 text-[10px] ml-3">{category}</p>
      </div>

      <div className="w-2/5">
        <p className="mt-5 font-poppins text-[13px] font-bold text-green-950">
          {title}
        </p>
        <p className="text-[10px]">{date}</p>
      </div>

      <div className="mr-10 text-center mt-5 flex">
        {isIncome ? (
          <img
            src="increase.png"
            alt="Decrease"
            className="max-w-15 max-h-15   h-4 w-4 mr-4"
          />
        ) : (
          <img
            src="decrease.png"
            alt="Decrease"
            className="max-w-15 max-h-15  h-4 w-4 mr-4"
          />
        )}

        {
        isIncome ? (
          <p className="font-poppins font-bold text-sm text-green-700 ">
            £ {value}.00
          </p>
        ) : (
          <p className="font-poppins font-bold text-sm text-red-600">
            £ {value}.00
          </p>
        )}
         
         <div className="ml-10 ">
            <img src={'/editing.png'}  height={20} width={20}/>
         </div>
      </div>
    </div>
  );
}

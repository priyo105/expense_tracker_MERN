const CategoryList = (props) => {
  return (
    <div className="flex justify-between">
      <div className="flex mt-5">
        <p className="mr-5  text-sm">{props.index + 1}.</p>

        <div
          className={`bg-[${props.item.colorCode}] w-4 h-4 rounded-full mr-5`}
        ></div>
        <h1 className="font-poppins font-semibold text-neutral-600 text-[11px] md:text-[14px] w-24">
          {props.item.name}
        </h1>
      </div>

      <div className="flex">
        <h1 className="mr-10 mt-5 w-5 text-[11px]  md:text-[14px]">
          {props.item.status}
        </h1>

        {props.item.status == "Active" ? (
          <div className={`bg-green-500 w-3 h-3 rounded-full mr-5 mt-6`}></div>
        ) : (
          <div className={`bg-red-500 w-3 h-3 rounded-full mr-5 mt-6`}></div>
        )}
      </div>

      <div className="flex">
        <img
          src={`/${props.item.icon}`}
          width={25}
          height={25}
          alt=""
          className="mr-5 mt-5"
        />
      </div>
    </div>
  );
};

export default CategoryList;

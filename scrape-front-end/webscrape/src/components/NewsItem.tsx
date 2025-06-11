function NewsItem(props: any){
    const item = props.item;
  return (
    <div className="border rounded-full m-1">
        <div className="bg-white p-4 rounded shadow text-center">
      <a href={item.url} rel="noopener noreferrer" className="text-xl font-semibold text-blue-700 hover:underline">
        {item.headline}
      </a>
      <p className="text-sm text-gray-600">{item.date}</p>
    </div>
    </div>
  );
};

export default NewsItem;



// function NewsItem(props: any) {
//   const item = props.item;

//   return (
//     <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-white z-50">
//       <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow text-center">
//         <a
//           href={item.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-xl font-semibold text-blue-700 hover:underline block"
//         >
//           {item.headline}
//         </a>
//         <p className="text-sm text-gray-600 mt-2">{item.date}</p>
//       </div>
//     </div>
//   );
// }

// export default NewsItem;

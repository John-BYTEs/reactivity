function NewsItem(props: any){
    const item = props.item;
  return (
    <div className="border rounded-full m-1 mb-5">
        <div className="bg-white p-4 rounded shadow text-center scrollbar-hide">
          <div className="grid grid-flow-col">
            <a href={item.url} rel="noopener noreferrer" className="text-xl text-black font-semibold hover:underline">
            {item.headline}
            </a>
          </div>
          <div className="grid grid-flow-col grid-rows">
            <div className="text-blue-950">
              <p>
                Published: {item.pubDate}
              </p>
            </div>
            <div className="text-cyan-800">
              <p>
                Author: {item.author}
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default NewsItem;



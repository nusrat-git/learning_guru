import { Link } from "react-router-dom";

export default function Carousel() {
  function prev() {
    document.getElementById("slider-container").scrollLeft -= 270;
  }

  function next() {
    document.getElementById("slider-container").scrollLeft += 270;
  }

  return (
    <div>
      <h3 className="font-bold text-center text-2xl py-5">
        Our top 10 courses of the week
      </h3>
      <div id="slider-container" className="slider mx-20">
        {[
          {
            src: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=20",
            title: "Course 1",
          },
          {
            src: "https://images.unsplash.com/photo-1574451311232-cb647e9d71f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=20",
            title: "Course 2",
          },
          {
            src: "https://images.unsplash.com/photo-1574449423472-4bc6a3d2473d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=20",
            title: "Course 3",
          },
          {
            src: "https://images.unsplash.com/photo-1574459472673-09bbda49102a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=928&q=20",
            title: "Course 4",
          },
          {
            src: "https://images.unsplash.com/photo-1479981280584-037818c1297d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=20",
            title: "Course 5",
          },
          {
            src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=20",
            title: "Course 6",
          },
          {
            src: "https://images.unsplash.com/photo-1560259324-12a044e67c34?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=20",
            title: "Course 7",
          },
          {
            src: "https://images.unsplash.com/photo-1532787799187-93655e51d472?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=20",
            title: "Course 8",
          },
        ].map((item, index) => (
          <div className="slide relative" key={index}>
            <img src={item.src} alt="" className="w-full h-auto" />
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full">
              <div className="absolute bottom-14 right-4 text-white text-lg font-bold px-4 py-2 bg-black opacity-55 rounded-md">
                {item.title}
              </div>

              <Link to="/details">
                <button className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-md font-bold text-sm">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
        <div onClick={prev} className="control-prev-btn">
          <i className="fas fa-arrow-left"></i>
        </div>
        <div onClick={next} className="control-next-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

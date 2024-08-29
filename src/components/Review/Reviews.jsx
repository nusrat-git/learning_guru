import Review from "./Review";

export default function Reviews() {
  return (
    <div className="my-10 mx-20">
      <h3 className="font-bold text-center text-2xl py-5">Reviews</h3>
      <div className="grid grid-cols-3 gap-6">
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
      <button className="font-bold flex mx-auto my-5">Load more...</button>
    </div>
  );
}

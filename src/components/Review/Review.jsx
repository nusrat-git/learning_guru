export default function Review() {
  return (
    <div className="flex flex-col gap-4 bg-black rounded-lg p-5">
      <div className="flex items-center gap-2">
        <img
          src="https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=20"
          height={30}
          width={30}
          alt=""
          className="rounded-full"
        />
        <h5 className="font-semibold font-mono text-white">Username</h5>
      </div>
      <div className="flex gap-5">
        <img
          src="https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=20"
          height={200}
          width={200}
          alt=""
          className="rounded-md"
        />
        <div>
          <h4 className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </h4>
          <h5 className="text-white">Rating: 4/5</h5>
          <h5 className="text-white">Complexity: Easy</h5>
        </div>
      </div>
      <p className="text-white">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas
        ullam consequuntur blanditiis iste quaerat asperiores sed repudiandae ad
        autem, corrupti non eveniet facere accusantium sit aliquam maiores,
        sapiente praesentium!
      </p>
    </div>
  );
}

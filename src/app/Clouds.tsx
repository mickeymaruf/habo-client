export default function Clouds({
  sizes = [10, 15, 20, 25, 18, 12, 22, 17, 14, 23], // controlled cloud widths
  colors = ["#ffffff"], // array of colors for clouds
  justify = "start", // start, center, end, between, around
}) {
  return (
    <div className="w-full overflow-hidden">
      <div className={`-ml-[20%] flex items-end justify-${justify}`}>
        {sizes.map((s, i) => (
          <div
            key={i}
            className="aspect-square shrink-0 rounded-full"
            style={{
              width: `${s}%`,
              marginRight: i !== sizes.length - 1 ? `-${s * 0.4}%` : "0",
              backgroundColor: colors[i % colors.length], // cycle through colors if fewer than clouds
            }}
          />
        ))}
      </div>
    </div>
  );
}

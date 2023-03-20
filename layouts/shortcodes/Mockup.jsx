import Image from "next/image";

const Mockup = ({ src, alt, height, width }) => {
  return (
    <div className="browser-mockup">
      <Image
        className="w-full object-cover"
        src={src}
        alt={alt}
        height={height ? height : "600"}
        width={width ? width : "900"}
        priority
      />
    </div>
  );
};

export default Mockup;

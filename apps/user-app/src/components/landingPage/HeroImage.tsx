import Image from "next/image";

export function HeroImage() {
  return (
    <div className=" ">
      <Image
        src={
          "https://shadcn-ui-sidebar.salimi.my/_next/image?url=%2Fdemo-dark-min.png&w=1080&q=75"
        }
        width={1080}
        height={608}
        alt="demo"
        className="border-solid border-white border-[0.5px] rounded-xl shadow-sm dark:block"
      />
    </div>
  );
}

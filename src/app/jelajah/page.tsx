import Viewer360 from "@/components/Viewer360";

export default function JelajahPage() {
  const imageUrlFromCloudinary =
    "https://res.cloudinary.com/demo/image/upload/spherical/panorama.jpg";
  return (
    <div className="w-full h-[calc(100vh-4rem-var(--footer-height,3rem))]">
      <Viewer360 imageUrl={imageUrlFromCloudinary} />
    </div>
  );
}
